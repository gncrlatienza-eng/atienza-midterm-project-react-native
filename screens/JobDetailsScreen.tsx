import React, { useState, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, useWindowDimensions, Share, Platform, TouchableOpacity, Text, DeviceEventEmitter } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJobDetailsStyles } from '../styles/JobDetailsScreen';
import { JobDetailsHeader } from '../components/JobDetailsHeader';
import { JobHeroSection } from '../components/JobHeroSection';
import { JobContentSection } from '../components/JobContentSection';
import { BookmarkIcon } from '../components/JobDetailIcons';
import { ApplicationFormScreen } from './ApplicationFormScreen';
import { showSaveJobModal, showRemoveJobModal, showApplyJobModal, showCancelApplicationModal, showSuccessAlert, showErrorAlert } from '../components/ConfirmationModal';
import { JobDetailsScreenProps } from '../types/Navigation';
import { Job } from '../types/Job';
import { hasAppliedForJob, cancelApplication } from '../utils/applicationUtils';

const SAVED_JOBS_KEY = '@saved_jobs';

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route, navigation }) => {
  const { job, fromSaved } = route.params;
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createJobDetailsStyles(colors, width, height);

  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [activeSection, setActiveSection] = useState<'description' | 'requirements' | 'benefits'>('description');

  useFocusEffect(
    useCallback(() => {
      const checkStatus = async () => {
        try {
          const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
          if (savedJobsJson) {
            const savedJobs: Job[] = JSON.parse(savedJobsJson);
            const isJobSaved = savedJobs.some(savedJob => savedJob.id === job.id);
            setIsSaved(isJobSaved);
          } else {
            setIsSaved(false);
          }

          const applied = await hasAppliedForJob(job.id);
          setIsApplied(applied);
        } catch (error) {
          console.error('Error checking job status:', error);
        }
      };

      checkStatus();
    }, [job.id])
  );

  const handleApply = () => {
    if (isApplied) {
      showErrorAlert('You have already applied for this job');
      return;
    }

    showApplyJobModal(job.title, job.company, () => {
      setShowApplicationForm(true);
    });
  };

  const handleApplicationSuccess = async () => {
    setShowApplicationForm(false);
    setIsApplied(true);

    setIsSaved(false);
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (savedJobsJson) {
        let savedJobs: Job[] = JSON.parse(savedJobsJson);
        savedJobs = savedJobs.filter(savedJob => savedJob.id !== job.id);
        await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
      }
    } catch (error) {
      console.error('Error removing from saved jobs:', error);
    }
    DeviceEventEmitter.emit('savedJobsUpdated');

    if (fromSaved) {
      navigation.navigate('MainTabs', { screen: 'FindJobs' });
    }
  };

  const handleCancelApplication = () => {
    showCancelApplicationModal(job.title, async () => {
      const success = await cancelApplication(job.id);
      if (success) {
        setIsApplied(false);
        showSuccessAlert('Cancelled', 'Your application has been cancelled');
      } else {
        showErrorAlert('Failed to cancel application');
      }
    });
  };

  const handleSave = () => {
    if (isSaved) {
      showRemoveJobModal(job.title, async () => {
        await removeJob();
      });
    } else {
      showSaveJobModal(job.title, async () => {
        await saveJob();
      });
    }
  };

  const saveJob = async () => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      let savedJobs: Job[] = savedJobsJson ? JSON.parse(savedJobsJson) : [];

      savedJobs.push({
        ...job,
        isSaved: true,
        savedAt: new Date().toISOString()
      });

      await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
      setIsSaved(true);
      DeviceEventEmitter.emit('savedJobsUpdated');
      showSuccessAlert('Saved!', 'Job added to your saved jobs');
    } catch (error) {
      console.error('Error saving job:', error);
      showErrorAlert('Failed to save job');
    }
  };

  const removeJob = async () => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (savedJobsJson) {
        let savedJobs: Job[] = JSON.parse(savedJobsJson);
        savedJobs = savedJobs.filter(savedJob => savedJob.id !== job.id);

        await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
        setIsSaved(false);
        DeviceEventEmitter.emit('savedJobsUpdated');
        showSuccessAlert('Removed', 'Job removed from saved jobs');
      }
    } catch (error) {
      console.error('Error removing job:', error);
      showErrorAlert('Failed to remove job');
    }
  };

  const handleShare = async () => {
    try {
      const shareMessage = `
Check out this job opportunity!

${job.title}
${job.company}
${job.location ? `Location: ${job.location}` : ''}
${job.salary ? `Salary: ${job.salary}` : ''}
${job.type ? `Type: ${job.type}` : ''}

${job.description ? job.description.substring(0, 200).replace(/<[^>]*>/g, '') + '...' : ''}
      `.trim();

      const shareOptions = Platform.select({
        ios: {
          message: shareMessage,
          url: `https://empllo.com/jobs/${job.id}`,
          title: `${job.title} at ${job.company}`,
        },
        android: {
          message: shareMessage,
          title: `${job.title} at ${job.company}`,
        },
        default: {
          message: shareMessage,
        },
      });

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared via:', result.activityType);
        } else {
          console.log('Job shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showErrorAlert('Failed to share job. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <JobDetailsHeader
          styles={styles}
          colors={colors}
          onBack={handleBack}
          onShare={handleShare}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 120 }
          ]}
        >
          <JobHeroSection
            job={job}
            styles={styles}
            colors={colors}
            isSaved={isSaved}
            isApplied={isApplied}
            onApply={handleApply}
            onSave={handleSave}
            onCancelApplication={handleCancelApplication}
            showActionsInline={false}
          />

          <View style={{ height: 32 }} />

          {/* Segmented toggle for Description / Requirements / Benefits */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeSection === 'description' && styles.tabButtonActive,
              ]}
              onPress={() => setActiveSection('description')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeSection === 'description' && styles.tabLabelActive,
                ]}
              >
                Description
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeSection === 'requirements' && styles.tabButtonActive,
              ]}
              onPress={() => setActiveSection('requirements')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeSection === 'requirements' && styles.tabLabelActive,
                ]}
              >
                Requirements
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeSection === 'benefits' && styles.tabButtonActive,
              ]}
              onPress={() => setActiveSection('benefits')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeSection === 'benefits' && styles.tabLabelActive,
                ]}
              >
                Benefits
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }} />

          {activeSection === 'description' && (
            <JobContentSection
              title="About the Role"
              content={job.description}
            />
          )}

          {activeSection === 'requirements' && (
            <JobContentSection
              title="Requirements"
              listItems={job.requirements}
            />
          )}

          {activeSection === 'benefits' && (
            <JobContentSection
              title="Benefits & Perks"
              listItems={job.benefits}
            />
          )}

          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.bottomBar}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
              disabled={isApplied}
              activeOpacity={isApplied ? 1 : 0.8}
            >
              <View style={styles.applyButtonInner}>
                <Text style={styles.applyButtonText}>
                  {isApplied ? 'Applied' : 'Apply Now'}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                isSaved && styles.saveButtonActive,
                isApplied && { opacity: 0.3 },
              ]}
              onPress={isApplied ? undefined : handleSave}
              disabled={isApplied}
              activeOpacity={0.8}
            >
              <BookmarkIcon color={isSaved ? '#FFFFFF' : colors.primary} filled={isSaved} />
            </TouchableOpacity>
          </View>

          {isApplied && (
            <TouchableOpacity onPress={handleCancelApplication} activeOpacity={0.7}>
              <Text style={styles.cancelText}>
                Cancel Application
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <ApplicationFormScreen
          visible={showApplicationForm}
          job={job}
          fromSaved={fromSaved}
          onClose={() => setShowApplicationForm(false)}
          onSuccess={handleApplicationSuccess}
        />
      </View>
    </SafeAreaView>
  );
};