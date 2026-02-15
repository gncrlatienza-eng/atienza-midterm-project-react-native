import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, useWindowDimensions, } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createJobDetailsStyles } from '../styles/JobDetailsScreen';
import { Job } from '../types/Job';
import Svg, { Path, Circle } from 'react-native-svg';

// Back Arrow Icon
const BackIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Location Pin Icon
const LocationIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Money/Dollar Icon
const SalaryIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Briefcase Icon
const TypeIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Calendar Icon
const CalendarIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

interface JobDetailsScreenProps {
  route: {
    params: {
      job: Job;
    };
  };
  navigation: any;
}

// Helper function to clean HTML tags and format text
const cleanHTMLText = (text: string): string => {
  if (!text) return '';
  
  // Remove HTML tags but keep line breaks
  return text
    .replace(/<h3>/gi, '\n')
    .replace(/<\/h3>/gi, '\n')
    .replace(/<ul>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<strong>/gi, '')
    .replace(/<\/strong>/gi, '')
    .replace(/<em>/gi, '')
    .replace(/<\/em>/gi, '')
    .replace(/<[^>]*>/g, '')
    // Remove emoji characters (including all unicode emojis)
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    // Clean up multiple newlines
    .replace(/\n\n+/g, '\n\n')
    .trim();
};

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route, navigation }) => {
  const { job } = route.params;
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createJobDetailsStyles(colors, width, height);

  const handleApply = () => {
    // TODO: Navigate to application form
    console.log('Apply for job:', job.id);
  };

  // Clean the description text
  const cleanDescription = job.description ? cleanHTMLText(job.description) : '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <BackIcon color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Job Title & Company */}
          <View style={styles.titleSection}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>
          </View>

          {/* Job Details Badges */}
          <View style={styles.badgesContainer}>
            {job.location && job.location.trim() !== '' && (
              <View style={styles.badge}>
                <View style={styles.badgeContent}>
                  <LocationIcon color={colors.textSecondary} size={14} />
                  <Text style={styles.badgeText}>{job.location}</Text>
                </View>
              </View>
            )}
            {job.salary && job.salary.trim() !== '' && (
              <View style={styles.badge}>
                <View style={styles.badgeContent}>
                  <SalaryIcon color={colors.textSecondary} size={14} />
                  <Text style={styles.badgeText}>{job.salary}</Text>
                </View>
              </View>
            )}
            {job.type && job.type.trim() !== '' && (
              <View style={styles.badge}>
                <View style={styles.badgeContent}>
                  <TypeIcon color={colors.textSecondary} size={14} />
                  <Text style={styles.badgeText}>{job.type}</Text>
                </View>
              </View>
            )}
            {job.posted && job.posted.trim() !== '' && (
              <View style={styles.badge}>
                <View style={styles.badgeContent}>
                  <CalendarIcon color={colors.textSecondary} size={14} />
                  <Text style={styles.badgeText}>{job.posted}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Description */}
          {cleanDescription && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.sectionText}>{cleanDescription}</Text>
            </View>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {job.requirements.map((req, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.sectionText}>{cleanHTMLText(req)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benefits</Text>
              {job.benefits.map((benefit, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.sectionText}>{cleanHTMLText(benefit)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Spacing at bottom */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Apply Button - Fixed at bottom */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.7}
          >
            <Text style={styles.applyButtonText}>Apply for this job</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};