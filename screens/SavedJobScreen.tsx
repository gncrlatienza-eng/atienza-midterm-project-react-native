import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, useWindowDimensions, RefreshControl, } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemedContext';
import { createSavedJobsStyles } from '../styles/SavedJobScreen';
import { ThemeToggle } from '../components/ThemeToggle';
import { JobCard } from '../components/JobCard';
import { EmptyState } from '../components/EmptyState';
import {  showRemoveJobModal,  showComingSoonAlert, showSuccessAlert, showErrorAlert } from '../components/ConfirmationModal';
import { Job } from '../types/Job';
import { RootStackParamList } from '../types/Navigation';

const SAVED_JOBS_KEY = '@saved_jobs';

export const SavedJobsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createSavedJobsStyles(colors, width, height);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load saved jobs from AsyncStorage
  const loadSavedJobs = async () => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (savedJobsJson) {
        const jobs = JSON.parse(savedJobsJson);
        setSavedJobs(jobs);
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
        await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedJobs));
        showSuccessAlert('Removed', 'Job removed from saved jobs');
      });
    } catch (error) {
      console.error('Error removing job:', error);
      showErrorAlert('Failed to remove job');
    }
  };

  const handleApply = (jobId: string) => {
    showComingSoonAlert();
  };

  // UPDATED: Added fromSaved: true parameter
  const handleJobPress = (job: Job) => {
    navigation.navigate('JobDetails', { 
      job,
      fromSaved: true  // ← This is the important addition!
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
      </View>
    </SafeAreaView>
  );
};