import React, { useState, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, useWindowDimensions, Share, Platform } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJobDetailsStyles } from '../styles/JobDetailsScreen';
import { JobDetailsHeader } from '../components/JobDetailsHeader';
import { JobHeroSection } from '../components/JobHeroSection';
import { JobContentSection } from '../components/JobContentSection';
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
          />

          <View style={{ height: 32 }} />

          <JobContentSection
            title="About the Role"
            content={job.description}
            styles={styles}
            colors={colors}
          />

          <JobContentSection
            title="Requirements"
            listItems={job.requirements}
            styles={styles}
            colors={colors}
          />

          <JobContentSection
            title="Benefits & Perks"
            listItems={job.benefits}
            styles={styles}
            colors={colors}
          />

          <View style={{ height: 20 }} />
        </ScrollView>

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