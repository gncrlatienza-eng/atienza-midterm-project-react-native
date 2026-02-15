import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { createHomeStyles } from '../styles/HomeScreen';

interface JobCardProps {
  job: Job;
  onSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onPress: (job: Job) => void;
}

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
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        {job.location && (
          <View style={styles.detailBadge}>
            <Text style={styles.detailText}>📍 {job.location}</Text>
          </View>
        )}
        {job.salary && (
          <View style={styles.detailBadge}>
            <Text style={styles.detailText}>💰 {job.salary}</Text>
          </View>
        )}
        {job.type && (
          <View style={styles.detailBadge}>
            <Text style={styles.detailText}>⏰ {job.type}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.saveButton, job.isSaved && styles.savedButton]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent card tap when clicking save
            onSave(job.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, job.isSaved && { color: '#FFFFFF' }]}>
            {job.isSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={(e) => {
            e.stopPropagation(); // Prevent card tap when clicking apply
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