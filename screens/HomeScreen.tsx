import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, useWindowDimensions, RefreshControl, Keyboard, DeviceEventEmitter, TouchableOpacity } from 'react-native';
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
import { ApplicationFormScreen } from './ApplicationFormScreen';
import { showSaveJobModal, showRemoveJobModal, showApplyJobModal, showCancelApplicationModal, showSuccessAlert, showErrorAlert } from '../components/ConfirmationModal';
import { fetchJobs, searchJobs } from '../api/Api';
import { Job } from '../types/Job';
import { RootStackParamList } from '../types/Navigation';
import { getAppliedJobIds, cancelApplication } from '../utils/applicationUtils';

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
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [sortOption, setSortOption] = useState<'recent' | 'oldest' | 'title' | 'income' | 'tags'>('recent');

  const sortJobs = useCallback(
    (jobs: Job[]): Job[] => {
      const jobsCopy = [...jobs];

      if (sortOption === 'income') {
        const getSalaryValue = (salary?: string): number => {
          if (!salary) return 0;
          const cleaned = salary.replace(/,/g, '');
          const match = cleaned.match(/(\d+(\.\d+)?)/);
          if (!match) return 0;
          let value = parseFloat(match[1]);
          if (/k/i.test(cleaned)) {
            value = value * 1000;
          }
          return isNaN(value) ? 0 : value;
        };

        return jobsCopy.sort((a, b) => {
          const aVal = getSalaryValue(a.salary);
          const bVal = getSalaryValue(b.salary);
          return bVal - aVal; // highest income first
        });
      }

      if (sortOption === 'title') {
        return jobsCopy.sort((a, b) => a.title.localeCompare(b.title));
      }

      if (sortOption === 'tags') {
        const getPrimaryTag = (job: Job): string =>
          (job.tags && job.tags.length > 0 ? job.tags[0] : '').toLowerCase();

        return jobsCopy.sort((a, b) =>
          getPrimaryTag(a).localeCompare(getPrimaryTag(b))
        );
      }

      const parseDate = (value?: string) => (value ? Date.parse(value) || 0 : 0);

      return jobsCopy.sort((a, b) => {
        const aDate = parseDate(a.posted);
        const bDate = parseDate(b.posted);
        if (sortOption === 'recent') {
          return bDate - aDate;
        }
        // oldest
        return aDate - bDate;
      });
    },
    [sortOption]
  );

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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

  const loadAppliedJobIds = useCallback(async () => {
    const appliedIds = await getAppliedJobIds();
    setAppliedJobIds(appliedIds);
  }, []);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadSavedJobIds();
      await loadAppliedJobIds();
      const jobs = await fetchJobs();
      setAllJobs(jobs);
      const filtered = searchJobs(jobs, searchQuery);
      setDisplayedJobs(sortJobs(filtered));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load jobs';
      setError(errorMessage);
      showErrorAlert(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadSavedJobIds, loadAppliedJobIds, searchQuery, sortJobs]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    if (allJobs.length > 0) {
      const filtered = searchJobs(allJobs, searchQuery);
      setDisplayedJobs(sortJobs(filtered));
    }
  }, [searchQuery, allJobs, sortJobs]);

  useFocusEffect(
    useCallback(() => {
      loadSavedJobIds();
      loadAppliedJobIds();
    }, [loadSavedJobIds, loadAppliedJobIds])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      await loadSavedJobIds();
      await loadAppliedJobIds();
      const jobs = await fetchJobs();
      setAllJobs(jobs);
      const filtered = searchJobs(jobs, searchQuery);
      setDisplayedJobs(sortJobs(filtered));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh jobs';
      showErrorAlert(errorMessage);
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
        showRemoveJobModal(job.title, async () => {
          savedJobs.splice(existingIndex, 1);
          await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));

          setSavedJobIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(jobId);
            return newSet;
          });
          DeviceEventEmitter.emit('savedJobsUpdated');

          showSuccessAlert('Removed', 'Job removed from saved jobs');
        });
      } else {
        showSaveJobModal(job.title, async () => {
          savedJobs.push({ ...job, isSaved: true, savedAt: new Date().toISOString() });
          await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));

          setSavedJobIds(prev => new Set(prev).add(jobId));
          DeviceEventEmitter.emit('savedJobsUpdated');

          showSuccessAlert('Saved!', 'Job added to your saved jobs');
        });
      }
    } catch (error) {
      console.error('Error saving job:', error);
      showErrorAlert('Failed to save job');
    }
  };

  const handleApply = (jobId: string) => {
    const job = allJobs.find(j => j.id === jobId);
    if (job) {
      showApplyJobModal(job.title, job.company, () => {
        setSelectedJob(job);
        setShowApplicationForm(true);
      });
    }
  };

  const handleCancelApplication = (jobId: string) => {
    const job = allJobs.find(j => j.id === jobId);
    if (!job) return;

    showCancelApplicationModal(job.title, async () => {
      const success = await cancelApplication(jobId);
      if (success) {
        setAppliedJobIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
        showSuccessAlert('Cancelled', 'Your application has been cancelled');
      } else {
        showErrorAlert('Failed to cancel application');
      }
    });
  };

  const handleApplicationSuccess = async () => {
    setShowApplicationForm(false);
    if (selectedJob) {
      setAppliedJobIds(prev => new Set(prev).add(selectedJob.id));

      setSavedJobIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedJob.id);
        return newSet;
      });

      try {
        const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
        if (savedJobsJson) {
          let savedJobs: Job[] = JSON.parse(savedJobsJson);
          savedJobs = savedJobs.filter(j => j.id !== selectedJob.id);
          await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
        }
      } catch (error) {
        console.error('Error removing from saved jobs:', error);
      }
      DeviceEventEmitter.emit('savedJobsUpdated');
    }
    setSelectedJob(null);
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
            <Text style={styles.featuredSectionTitle}>Featured</Text>
            <FeaturedCarousel
              jobs={allJobs.slice(0, 5)}
              onJobPress={handleJobPress}
            />
          </View>
        )}

        <View style={styles.allJobsSection}>
          {!searchQuery && <Text style={styles.sectionTitle}>All Jobs</Text>}

          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>Sort by</Text>
            <View style={styles.sortButtons}>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'recent' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('recent')}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOption === 'recent' && styles.sortButtonTextActive,
                  ]}
                >
                  Recent
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'oldest' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('oldest')}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOption === 'oldest' && styles.sortButtonTextActive,
                  ]}
                >
                  Oldest
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'title' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('title')}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOption === 'title' && styles.sortButtonTextActive,
                  ]}
                >
                  A–Z
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'income' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('income')}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOption === 'income' && styles.sortButtonTextActive,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'tags' && styles.sortButtonActive,
                ]}
                onPress={() => setSortOption('tags')}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOption === 'tags' && styles.sortButtonTextActive,
                  ]}
                >
                  Tags
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {displayedJobs.map((job) => {
            const isJobSaved = savedJobIds.has(job.id);
            const isJobApplied = appliedJobIds.has(job.id);
            return (
              <JobCard
                key={job.id}
                job={{ ...job, isSaved: isJobSaved }}
                onSave={handleSaveJob}
                onApply={handleApply}
                onPress={handleJobPress}
                onCancelApplication={handleCancelApplication}
                isApplied={isJobApplied}
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
            <Text style={styles.title}>Hire N Go</Text>
            <View style={styles.appliedToggleRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AppliedJobs' as never)}
                activeOpacity={0.7}
                style={styles.appliedBadge}
              >
                <Text style={styles.appliedBadgeText}>Applied</Text>
              </TouchableOpacity>
              <ThemeToggle />
            </View>
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

        {selectedJob && (
          <ApplicationFormScreen
            visible={showApplicationForm}
            job={selectedJob}
            fromSaved={false}
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