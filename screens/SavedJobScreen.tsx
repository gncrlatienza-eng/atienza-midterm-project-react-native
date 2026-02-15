import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, useWindowDimensions, RefreshControl, Alert, } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemedContext';
import { createSavedJobsStyles } from '../styles/SavedJobScreen';
import { ThemeToggle } from '../components/ThemeToggle';
import { JobCard } from '../components/JobCard';
import { EmptyState } from '../components/EmptyState';
import { ApplicationFormScreen } from './ApplicationFormScreen';
import {  showRemoveJobModal, showSuccessAlert, showErrorAlert } from '../components/ConfirmationModal';
import { Job } from '../types/Job';
import { RootStackParamList } from '../types/Navigation';
import { getAppliedJobIds } from '../utils/applicationUtils';

const SAVED_JOBS_KEY = '@saved_jobs';

export const SavedJobsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createSavedJobsStyles(colors, width, height);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set()); // NEW

  // Load saved jobs from AsyncStorage
  const loadSavedJobs = async () => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      const appliedIds = await getAppliedJobIds(); // NEW
      setAppliedJobIds(appliedIds); // NEW
      
      if (savedJobsJson) {
        const jobs: Job[] = JSON.parse(savedJobsJson);
        // UPDATED: Filter out jobs that have been applied to
        const unappliedJobs = jobs.filter(job => !appliedIds.has(job.id));
        setSavedJobs(unappliedJobs);
      } else {
        setSavedJobs([]);
      }
    } catch (error) {
      console.error('Error loading saved jobs:', error);
      showErrorAlert('Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  // Refresh saved jobs when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedJobs();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSavedJobs();
    setRefreshing(false);
  };

  const handleUnsaveJob = async (jobId: string) => {
    try {
      const job = savedJobs.find(j => j.id === jobId);
      if (!job) return;

      showRemoveJobModal(job.title, async () => {
        const updatedJobs = savedJobs.filter(j => j.id !== jobId);
        setSavedJobs(updatedJobs);
        
        // Also remove from AsyncStorage
        const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
        if (savedJobsJson) {
          let allSavedJobs: Job[] = JSON.parse(savedJobsJson);
          allSavedJobs = allSavedJobs.filter(j => j.id !== jobId);
          await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(allSavedJobs));
        }
        
        showSuccessAlert('Removed', 'Job removed from saved jobs');
      });
    } catch (error) {
      console.error('Error removing job:', error);
      showErrorAlert('Failed to remove job');
    }
  };

  // UPDATED: Show confirmation before opening form
  const handleApply = (jobId: string) => {
    const job = savedJobs.find(j => j.id === jobId);
    if (job) {
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
              setSelectedJob(job);
              setShowApplicationForm(true);
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleApplicationSuccess = async () => {
    setShowApplicationForm(false);
    
    // Remove the applied job from saved jobs list
    if (selectedJob) {
      setSavedJobs(prev => prev.filter(j => j.id !== selectedJob.id));
      setAppliedJobIds(prev => new Set(prev).add(selectedJob.id));
    }
    
    setSelectedJob(null);
    
    // Navigate to FindJobs tab
    navigation.navigate('MainTabs');
  };

  const handleJobPress = (job: Job) => {
    navigation.navigate('JobDetails', { 
      job,
      fromSaved: true 
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Saved Jobs</Text>
            <ThemeToggle />
          </View>
          
          {savedJobs.length > 0 && (
            <Text style={styles.subtitle}>
              {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
            </Text>
          )}
        </View>

        {/* Content */}
        {loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Loading saved jobs...</Text>
          </View>
        ) : savedJobs.length === 0 ? (
          <EmptyState 
            message="No saved jobs yet" 
          />
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={colors.primary}
              />
            }
          >
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={handleUnsaveJob}
                onApply={handleApply}
                onPress={handleJobPress}
                showRemove={true}
              />
            ))}
            
            {/* Bottom spacing for tab bar */}
            <View style={{ height: 100 }} />
          </ScrollView>
        )}

        {/* Application Form Modal */}
        {selectedJob && (
          <ApplicationFormScreen
            visible={showApplicationForm}
            job={selectedJob}
            fromSaved={true}
            onClose={() => {
              setShowApplicationForm(false);
              setSelectedJob(null);
            }}
            onSuccess={handleApplicationSuccess}
          />
        )}
      </View>
    </SafeAreaView>
  );
};