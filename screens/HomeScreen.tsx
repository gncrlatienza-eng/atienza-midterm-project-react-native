import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { SearchBar } from '../components/SearchBar';
import Svg, { Circle, Path } from 'react-native-svg';

// Minimalistic Sun Icon (Light Mode)
const SunIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
    <Path d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Minimalistic Moon Icon (Dark Mode)
const MoonIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

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
            
            {/* Theme Toggle with Minimalistic Icons */}
            <TouchableOpacity
              style={styles.themeToggle}
              onPress={toggleTheme}
              activeOpacity={0.7}
            >
              {isDark ? (
                <SunIcon color={colors.text} />
              ) : (
                <MoonIcon color={colors.text} />
              )}
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