import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, useWindowDimensions, Image, } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createJobDetailsStyles } from '../styles/JobDetailsScreen';
import { Job } from '../types/Job';
import Svg, { Path, Circle } from 'react-native-svg';

// Back Arrow Icon
const BackIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 19L5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Share Icon (iOS style)
const ShareIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

// Bookmark Icon
const BookmarkIcon: React.FC<{ color: string; filled?: boolean }> = ({ color, filled = false }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={filled ? color : 'none'}
    />
  </Svg>
);

// Location Pin Icon
const LocationIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
      fill={color}
      opacity={0.7}
    />
  </Svg>
);

// Clock Icon
const ClockIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" opacity={0.7} />
    <Path d="M12 7v5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.7} />
  </Svg>
);

// Money Icon
const MoneyIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      opacity={0.7}
    />
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
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/\n\n+/g, '\n\n')
    .trim();
};

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route, navigation }) => {
  const { job } = route.params;
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createJobDetailsStyles(colors, width, height);

  const [isSaved, setIsSaved] = React.useState(job.isSaved || false);

  const handleApply = () => {
    console.log('Apply for job:', job.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    console.log('Share job:', job.id);
  };

  const cleanDescription = job.description ? cleanHTMLText(job.description) : '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header - iOS style */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
          >
            <BackIcon color={colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleShare}
              activeOpacity={0.6}
            >
              <ShareIcon color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Section - App Store inspired */}
          <View style={styles.heroSection}>
            {/* Company Logo */}
            <View style={styles.logoContainer}>
              {job.logo ? (
                <Image
                  source={{ uri: job.logo }}
                  style={styles.companyLogo}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Text style={styles.logoPlaceholderText}>
                    {job.company.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            {/* Job Title & Company */}
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>

            {/* Quick Info Tags */}
            <View style={styles.quickInfo}>
              {job.location && (
                <View style={styles.infoTag}>
                  <LocationIcon color={colors.textSecondary} size={14} />
                  <Text style={styles.infoTagText}>{job.location}</Text>
                </View>
              )}
              {job.type && (
                <View style={styles.infoTag}>
                  <ClockIcon color={colors.textSecondary} size={14} />
                  <Text style={styles.infoTagText}>{job.type}</Text>
                </View>
              )}
              {job.salary && (
                <View style={styles.infoTag}>
                  <MoneyIcon color={colors.textSecondary} size={14} />
                  <Text style={styles.infoTagText}>{job.salary}</Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
                activeOpacity={0.8}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.saveButton, isSaved && styles.saveButtonActive]}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <BookmarkIcon color={isSaved ? '#FFFFFF' : colors.primary} filled={isSaved} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description Section */}
          {cleanDescription && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About the Role</Text>
              <Text style={styles.descriptionText}>{cleanDescription}</Text>
            </View>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              <View style={styles.listContainer}>
                {job.requirements.map((req, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.listText}>{cleanHTMLText(req)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benefits & Perks</Text>
              <View style={styles.listContainer}>
                {job.benefits.map((benefit, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.listText}>{cleanHTMLText(benefit)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Bottom Spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};