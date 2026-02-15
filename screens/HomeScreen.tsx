import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, useWindowDimensions, RefreshControl, Alert, Keyboard, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { SearchBar } from '../components/SearchBar';
import { ThemeToggle } from '../components/ThemeToggle';
import { JobCard } from '../components/JobCard';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { fetchJobs, searchJobs } from '../api/Api';
import { Job } from '../types/Job';
import { RootStackParamList } from '../types/Navigation';

const SAVED_JOBS_KEY = '@saved_jobs';

export const HomeScreen = () => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createHomeStyles(colors, width, height);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState('');
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  // Debug logging
  useEffect(() => {
    console.log('🔍 Search Query Changed:', searchQuery);
    console.log('📊 Should show Featured?', !searchQuery && allJobs.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    loadJobs();
    loadSavedJobIds();
  }, []);

  useEffect(() => {
    if (allJobs.length > 0) {
      const filtered = searchJobs(allJobs, searchQuery);
      console.log('📝 Filtered jobs:', filtered.length);
      setDisplayedJobs(filtered);
    }
  }, [searchQuery, allJobs]);

  // Load saved job IDs from AsyncStorage
  const loadSavedJobIds = async () => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (savedJobsJson) {
        const savedJobs: Job[] = JSON.parse(savedJobsJson);
        const ids = new Set(savedJobs.map(job => job.id));
        setSavedJobIds(ids);
      }
    } catch (error) {
      console.error('Error loading saved job IDs:', error);
    }
  };

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobs = await fetchJobs();
      console.log('Loaded jobs:', jobs.length);
      if (jobs.length > 0) {
        console.log('First job logo:', jobs[0].companyLogo || jobs[0].logo);
      }
      setAllJobs(jobs);
      setDisplayedJobs(jobs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load jobs';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const jobs = await fetchJobs();
      setAllJobs(jobs);
      setDisplayedJobs(jobs);
      await loadSavedJobIds(); // Refresh saved status
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh jobs';
      Alert.alert('Error', errorMessage);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSaveJob = async (jobId: string) => {
    try {
      // Get current saved jobs
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      let savedJobs: Job[] = savedJobsJson ? JSON.parse(savedJobsJson) : [];

      // Find the job
      const job = allJobs.find(j => j.id === jobId);
      if (!job) return;

      // Check if already saved
      const existingIndex = savedJobs.findIndex(j => j.id === jobId);
      
      if (existingIndex >= 0) {
        // Show confirmation for removing
        Alert.alert(
          'Remove from saved?',
          `Remove ${job.title} from your saved jobs?`,
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Remove',
              style: 'destructive',
              onPress: async () => {
                // Remove from saved
                savedJobs.splice(existingIndex, 1);
                setSavedJobIds(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(jobId);
                  return newSet;
                });
                await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
                Alert.alert('Removed', 'Job removed from saved jobs');
              }
            }
          ]
        );
      } else {
        // Show confirmation for saving
        Alert.alert(
          'Save this job?',
          `Save ${job.title} to your saved jobs?`,
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Save',
              onPress: async () => {
                // Add to saved
                savedJobs.push({ ...job, isSaved: true, savedAt: new Date().toISOString() });
                setSavedJobIds(prev => new Set(prev).add(jobId));
                await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
                Alert.alert('Saved!', 'Job added to your saved jobs');
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error saving job:', error);
      Alert.alert('Error', 'Failed to save job');
    }
  };

  const handleApply = (jobId: string) => {
    console.log('Apply for job:', jobId);
    Alert.alert('Coming Soon', 'Application form will be available soon!');
  };

  const handleJobPress = (job: Job) => {
    navigation.navigate('JobDetails', { job });
  };

  const handleSearchFocus = () => {
    console.log('🎯 Search focused');
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    console.log('🎯 Search blurred, query:', searchQuery);
    if (!searchQuery) {
      setIsSearchFocused(false);
    }
  };

  const handleSearchCancel = () => {
    console.log('❌ Search cancelled');
    setIsSearchFocused(false);
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const handleSearchChange = (text: string) => {
    console.log('✏️ Search text changed to:', text);
    setSearchQuery(text);
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Loading jobs..." />;
    }

    if (error) {
      return <EmptyState message={`${error}\n\nPull down to retry`} />;
    }

    if (displayedJobs.length === 0) {
      const message = searchQuery 
        ? 'No jobs match your search.' 
        : 'No jobs found.\nPull down to refresh!';
      return <EmptyState message={message} />;
    }

    const showFeatured = !searchQuery && allJobs.length > 0;
    console.log('🎨 Rendering - Show Featured:', showFeatured, 'Query:', searchQuery);

    return (
      <ScrollView
        style={styles.jobList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Featured Section - Only show when NOT searching */}
        {showFeatured && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <FeaturedCarousel
              jobs={allJobs.slice(0, 5)}
              onJobPress={handleJobPress}
            />
          </View>
        )}

        {/* All Jobs */}
        <View style={styles.allJobsSection}>
          {!searchQuery && <Text style={styles.sectionTitle}>All Jobs</Text>}
          {displayedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={{ ...job, isSaved: savedJobIds.has(job.id) }}
              onSave={handleSaveJob}
              onApply={handleApply}
              onPress={handleJobPress}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header - Always visible */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Find Jobs</Text>
            <ThemeToggle />
          </View>

          {/* Search Bar - iOS style */}
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              isFocused={isSearchFocused}
              onCancel={handleSearchCancel}
              showCancel={isSearchFocused}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};