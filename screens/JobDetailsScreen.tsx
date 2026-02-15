import React, { useState, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, useWindowDimensions, Share, Platform, Alert } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJobDetailsStyles } from '../styles/JobDetailsScreen';
import { JobDetailsHeader } from '../components/JobDetailsHeader';
import { JobHeroSection } from '../components/JobHeroSection';
import { JobContentSection } from '../components/JobContentSection';
import { ApplicationFormScreen } from './ApplicationFormScreen';
import {  showSaveJobModal,  showRemoveJobModal, showSuccessAlert, showErrorAlert } from '../components/ConfirmationModal';
import { JobDetailsScreenProps } from '../types/Navigation';
import { Job } from '../types/Job';

const SAVED_JOBS_KEY = '@saved_jobs';

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route, navigation }) => {
  const { job, fromSaved } = route.params;
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createJobDetailsStyles(colors, width, height);

  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Load saved status when screen focuses
  useFocusEffect(
    useCallback(() => {
      const checkIfSaved = async () => {
        try {
          const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
          if (savedJobsJson) {
            const savedJobs: Job[] = JSON.parse(savedJobsJson);
            const isJobSaved = savedJobs.some(savedJob => savedJob.id === job.id);
            setIsSaved(isJobSaved);
          } else {
            setIsSaved(false);
          }
        } catch (error) {
          console.error('Error checking if job is saved:', error);
        }
      };

      checkIfSaved();
    }, [job.id])
  );

  // UPDATED: Show confirmation before opening form
  const handleApply = () => {
    Alert.alert(
      'Apply for Job',
      `Are you sure you want to apply for ${job.title} at ${job.company}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Apply',
          style: 'default',
          onPress: () => {
            setShowApplicationForm(true);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleApplicationSuccess = () => {
    setShowApplicationForm(false);
    
    // If coming from saved jobs, navigate back to FindJobs screen
    if (fromSaved) {
      navigation.navigate('MainTabs', { screen: 'FindJobs' });
    }
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
        {/* Header */}
        <JobDetailsHeader
          styles={styles}
          colors={colors}
          onBack={handleBack}
          onShare={handleShare}
        />

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 120 }
          ]}
        >
          {/* Hero Section */}
          <JobHeroSection
            job={job}
            styles={styles}
            colors={colors}
            isSaved={isSaved}
            onApply={handleApply}
            onSave={handleSave}
          />

          {/* Spacer */}
          <View style={{ height: 32 }} />

          {/* About the Role */}
          <JobContentSection
            title="About the Role"
            content={job.description}
            styles={styles}
            colors={colors}
          />

          {/* Requirements */}
          <JobContentSection
            title="Requirements"
            listItems={job.requirements}
            styles={styles}
            colors={colors}
          />

          {/* Benefits & Perks */}
          <JobContentSection
            title="Benefits & Perks"
            listItems={job.benefits}
            styles={styles}
            colors={colors}
          />

          {/* Bottom Spacing */}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Application Form Modal */}
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