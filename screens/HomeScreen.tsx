import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, useWindowDimensions, RefreshControl, Alert, Keyboard, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { SearchBar } from '../components/SearchBar';
import { ThemeToggle } from '../components/ThemeToggle';
import { JobCard } from '../components/JobCard';
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
  
  // Search overlay state
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (allJobs.length > 0) {
      const filtered = searchJobs(allJobs, searchQuery);
      setDisplayedJobs(filtered);
    }
  }, [searchQuery, allJobs]);

  // Animate overlay
  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: isSearchFocused ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isSearchFocused]);

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
    if (isSearchFocused) {
      handleSearchCancel();
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
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
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {displayedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSave={handleSaveJob}
            onApply={handleApply}
            onPress={handleJobPress}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header - Hide when search is focused */}
        {!isSearchFocused && (
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.title}>Find Jobs</Text>
              <ThemeToggle />
            </View>
          </View>
        )}

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {!isSearchFocused && renderContent()}
        </View>

        {/* Search Bar - Fixed at bottom */}
        <View style={styles.searchBarFixed}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search jobs..."
            onFocus={handleSearchFocus}
            isFocused={isSearchFocused}
            onCancel={handleSearchCancel}
            showCancel={true}
          />
        </View>

        {/* Search Overlay - Full screen when searching */}
        {isSearchFocused && (
          <Animated.View 
            style={[styles.searchOverlay, { opacity: overlayOpacity }]}
            pointerEvents={isSearchFocused ? 'auto' : 'none'}
          >
            <View style={styles.searchHeader}>
              <Text style={styles.searchTitle}>Search Jobs</Text>
            </View>
            
            {renderContent()}
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};