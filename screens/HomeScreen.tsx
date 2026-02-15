import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  RefreshControl,
  Alert,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { SearchBar } from '../components/SearchBar';
import { ThemeToggle } from '../components/ThemeToggle';
import { JobCard } from '../components/JobCard';
import { FeaturedJobCard } from '../components/FeaturedJobCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { fetchJobs, searchJobs } from '../api/Api';
import { Job } from '../types/Job';
import { RootStackParamList } from '../types/Navigation';

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

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (allJobs.length > 0) {
      const filtered = searchJobs(allJobs, searchQuery);
      setDisplayedJobs(filtered);
    }
  }, [searchQuery, allJobs]);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
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
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
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

  const handleSaveJob = (jobId: string) => {
    setAllJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );
    setDisplayedJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );
  };

  const handleApply = (jobId: string) => {
    console.log('Apply for job:', jobId);
    Alert.alert('Coming Soon', 'Application form will be available soon!');
  };

  const handleJobPress = (job: Job) => {
    navigation.navigate('JobDetails', { job });
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setIsSearchFocused(false);
    }
  };

  const handleSearchCancel = () => {
    setIsSearchFocused(false);
    setSearchQuery('');
    Keyboard.dismiss();
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

    return (
      <ScrollView
        style={styles.jobList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Featured Section - Only show when NOT searching */}
        {!searchQuery && allJobs.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            {allJobs.slice(0, 3).map((job) => (
              <FeaturedJobCard
                key={job.id}
                job={job}
                onPress={handleJobPress}
              />
            ))}
          </View>
        )}

        {/* All Jobs */}
        <View style={styles.allJobsSection}>
          {!searchQuery && <Text style={styles.sectionTitle}>All Jobs</Text>}
          {displayedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
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
              onChangeText={setSearchQuery}
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