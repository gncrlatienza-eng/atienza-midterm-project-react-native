import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, useWindowDimensions, RefreshControl, Alert, Keyboard, Animated, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
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

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: isSearchFocused ? 1 : 0,
      duration: 200,
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

  const featuredJobs = displayedJobs.slice(0, 3);
  const regularJobs = displayedJobs.slice(3);

  const renderMainContent = () => {
    if (loading) {
      return <LoadingState message="Loading jobs..." />;
    }

    if (error) {
      return <EmptyState message={`${error}\n\nPull down to retry`} />;
    }

    if (displayedJobs.length === 0) {
      return <EmptyState message="No jobs found.\nPull down to refresh!" />;
    }

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Featured Jobs - Big Cards */}
        {!isSearchFocused && !searchQuery && featuredJobs.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            {featuredJobs.map((job) => (
              <FeaturedJobCard
                key={job.id}
                job={job}
                onPress={handleJobPress}
              />
            ))}
          </View>
        )}

        {/* Regular Jobs */}
        <View style={styles.jobsSection}>
          {(isSearchFocused || searchQuery) && (
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Results for "${searchQuery}"` : 'All Jobs'}
            </Text>
          )}
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
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header - Hide when searching */}
        {!isSearchFocused && (
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.title}>Find Jobs</Text>
              <ThemeToggle />
            </View>
          </View>
        )}

        {/* Search Overlay - Full screen when active */}
        {isSearchFocused && (
          <Animated.View 
            style={[styles.searchOverlay, { opacity: overlayOpacity }]}
          >
            <View style={styles.searchHeader}>
              <Text style={styles.searchTitle}>Search Jobs</Text>
            </View>
            {renderMainContent()}
          </Animated.View>
        )}

        {/* Main Content - Hide when searching */}
        {!isSearchFocused && (
          <View style={styles.contentContainer}>
            {renderMainContent()}
          </View>
        )}

        {/* Search Bar - Fixed at bottom, transparent overlay */}
        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search jobs..."
            onFocus={handleSearchFocus}
            isFocused={isSearchFocused}
            onCancel={handleSearchCancel}
            showCancel={isSearchFocused}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};