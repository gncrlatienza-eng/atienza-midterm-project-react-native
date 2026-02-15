import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { createHomeStyles } from '../styles/HomeScreen';

interface JobCardProps {
  job: Job;
  onSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onPress: (job: Job) => void;
}

// Minimalistic Location Pin Icon
const LocationIcon = ({ color, size = 14 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill={color}
      opacity={0.6}
    />
  </Svg>
);

// Minimalistic Clock Icon
const ClockIcon = ({ color, size = 14 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" opacity={0.6} />
    <Path
      d="M12 7v5l3 3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);

export const JobCard: React.FC<JobCardProps> = ({ job, onSave, onApply, onPress }) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createHomeStyles(colors, width, height);

  return (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View style={styles.jobHeader}>
        {/* Company Logo */}
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

        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={styles.company} numberOfLines={1}>
            {job.company}
          </Text>
        </View>
      </View>

      {/* Job Details - Only Location and Type */}
      <View style={styles.jobDetails}>
        {job.location && (
          <View style={styles.detailBadge}>
            <LocationIcon color={colors.textSecondary} size={14} />
            <Text style={styles.detailText}>{job.location}</Text>
          </View>
        )}
        {job.type && (
          <View style={styles.detailBadge}>
            <ClockIcon color={colors.textSecondary} size={14} />
            <Text style={styles.detailText}>{job.type}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.saveButton, job.isSaved && styles.savedButton]}
          onPress={(e) => {
            e.stopPropagation();
            onSave(job.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, job.isSaved && styles.savedButtonText]}>
            {job.isSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={(e) => {
            e.stopPropagation();
            onApply(job.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, styles.applyButtonText]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};