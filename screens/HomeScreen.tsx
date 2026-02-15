import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, useWindowDimensions, ActivityIndicator,} from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { SearchBar } from '../components/SearchBar';

export const HomeScreen: React.FC = () => {
  const { colors, toggleTheme, isDark } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createHomeStyles(colors, width, height);

  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<any[]>([]); // Will be replaced with actual Job type
  const [loading, setLoading] = useState(false);

  // Placeholder function - will be replaced with actual API call
  const fetchJobs = async () => {
    setLoading(true);
    // TODO: Implement API call to https://empllo.com/api/v1
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSaveJob = (jobId: string) => {
    // TODO: Implement save job functionality
    console.log('Save job:', jobId);
  };

  const handleApply = (jobId: string) => {
    // TODO: Navigate to application form
    console.log('Apply for job:', jobId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Find Jobs</Text>
            
            {/* Theme Toggle */}
            <TouchableOpacity
              style={styles.themeToggle}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              <Text style={styles.themeToggleText}>
                {isDark ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search jobs..."
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : jobs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No jobs found.{'\n'}Pull down to refresh!
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.jobList}
              showsVerticalScrollIndicator={false}
            >
              {/* Job cards will be rendered here */}
              {jobs.map((job, index) => (
                <View key={index} style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <View style={styles.jobInfo}>
                      <Text style={styles.jobTitle}>Sample Job Title</Text>
                      <Text style={styles.company}>Company Name</Text>
                    </View>
                  </View>

                  <View style={styles.jobDetails}>
                    <View style={styles.detailBadge}>
                      <Text style={styles.detailText}>Location</Text>
                    </View>
                    <View style={styles.detailBadge}>
                      <Text style={styles.detailText}>Salary</Text>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleSaveJob(job.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.applyButton}
                      onPress={() => handleApply(job.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.buttonText, styles.applyButtonText]}>
                        Apply
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};