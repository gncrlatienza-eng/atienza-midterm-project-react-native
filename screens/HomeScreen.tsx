import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, useWindowDimensions, RefreshControl, Alert, Keyboard, } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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

  // Load saved job IDs from AsyncStorage
  const loadSavedJobIds = useCallback(async (): Promise<Set<string>> => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      
      if (savedJobsJson) {
        const savedJobs: Job[] = JSON.parse(savedJobsJson);
        const ids = new Set(savedJobs.map(job => job.id));
        setSavedJobIds(ids);
        return ids;
      } else {
        const emptySet = new Set<string>();
        setSavedJobIds(emptySet);
        return emptySet;
      }
    } catch (error) {
      console.error('Error loading saved job IDs:', error);
      const emptySet = new Set<string>();
      setSavedJobIds(emptySet);
      return emptySet;
    }
  }, []);

  // Load jobs from API
  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Load saved IDs first
      const savedIds = await loadSavedJobIds();

      // Then load jobs
      const jobs = await fetchJobs();
      setAllJobs(jobs);
      setDisplayedJobs(jobs);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load jobs';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadSavedJobIds]);

  // Initial load
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Filter jobs when search query changes
  useEffect(() => {
    if (allJobs.length > 0) {
      const filtered = searchJobs(allJobs, searchQuery);
      setDisplayedJobs(filtered);
    }
  }, [searchQuery, allJobs]);

  // Refresh saved job IDs when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedJobIds();
    }, [loadSavedJobIds])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      await loadSavedJobIds();
      const jobs = await fetchJobs();
      setAllJobs(jobs);
      setDisplayedJobs(jobs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh jobs';
      Alert.alert('Error', errorMessage);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSaveJob = async (jobId: string) => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      let savedJobs: Job[] = savedJobsJson ? JSON.parse(savedJobsJson) : [];

      const job = allJobs.find(j => j.id === jobId);
      if (!job) return;

      const existingIndex = savedJobs.findIndex(j => j.id === jobId);
      
      if (existingIndex >= 0) {
        // Show confirmation for removing
        Alert.alert(
          'Remove from saved?',
          `Remove ${job.title} from your saved jobs?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Remove',
              style: 'destructive',
              onPress: async () => {
                savedJobs.splice(existingIndex, 1);
                await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
                
                setSavedJobIds(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(jobId);
                  return newSet;
                });
                
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
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Save',
              onPress: async () => {
                savedJobs.push({ ...job, isSaved: true, savedAt: new Date().toISOString() });
                await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
                
                setSavedJobIds(prev => new Set(prev).add(jobId));
                
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
    Alert.alert('Coming Soon', 'Application form will be available soon!');
  };

  const handleJobPress = (job: Job) => {
    navigation.navigate('JobDetails', { job });
  };

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => !searchQuery && setIsSearchFocused(false);
  const handleSearchCancel = () => {
    setIsSearchFocused(false);
    setSearchQuery('');
    Keyboard.dismiss();
  };
  const handleSearchChange = (text: string) => setSearchQuery(text);

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
        {showFeatured && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <FeaturedCarousel
              jobs={allJobs.slice(0, 5)}
              onJobPress={handleJobPress}
            />
          </View>
        )}

        <View style={styles.allJobsSection}>
          {!searchQuery && <Text style={styles.sectionTitle}>All Jobs</Text>}
          {displayedJobs.map((job) => {
            const isJobSaved = savedJobIds.has(job.id);
            return (
              <JobCard
                key={job.id}
                job={{ ...job, isSaved: isJobSaved }}
                onSave={handleSaveJob}
                onApply={handleApply}
                onPress={handleJobPress}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Find Jobs</Text>
            <ThemeToggle />
          </View>

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

        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};