import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { createHomeStyles } from '../styles/HomeScreen';
import { StyleSheet } from 'react-native';

interface JobCardProps {
  job: Job;
  onSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onPress: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSave, onApply, onPress }) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const baseStyles = createHomeStyles(colors, width, height);

  // Generate company logo from first letter
  const getCompanyInitial = (company: string) => {
    return company.charAt(0).toUpperCase();
  };

  // Generate a color based on company name
  const getLogoColor = (company: string) => {
    const logoColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    const index = company.charCodeAt(0) % logoColors.length;
    return logoColors[index];
  };

  const styles = StyleSheet.create({
    logo: {
      width: 48,
      height: 48,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    logoText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    headerContent: {
      flex: 1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 4,
    },
    infoText: {
      fontSize: 13,
      color: colors.textTertiary,
    },
    separator: {
      fontSize: 13,
      color: colors.textTertiary,
    },
  });

  return (
    <TouchableOpacity
      style={baseStyles.jobCard}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View style={baseStyles.jobHeader}>
        <View style={[styles.logo, { backgroundColor: getLogoColor(job.company) }]}>
          <Text style={styles.logoText}>{getCompanyInitial(job.company)}</Text>
        </View>

        <View style={styles.headerContent}>
          <Text style={baseStyles.jobTitle} numberOfLines={1}>{job.title}</Text>
          <Text style={baseStyles.company} numberOfLines={1}>{job.company}</Text>
          
          <View style={styles.infoRow}>
            {job.location && (
              <>
                <Text style={styles.infoText}>{job.location}</Text>
                {job.type && <Text style={styles.separator}>•</Text>}
              </>
            )}
            {job.type && (
              <Text style={styles.infoText}>{job.type}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={baseStyles.actionButtons}>
        <TouchableOpacity
          style={[baseStyles.saveButton, job.isSaved && baseStyles.savedButton]}
          onPress={(e) => {
            e.stopPropagation();
            onSave(job.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={[baseStyles.buttonText, job.isSaved && { color: '#FFFFFF' }]}>
            {job.isSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={baseStyles.applyButton}
          onPress={(e) => {
            e.stopPropagation();
            onApply(job.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={[baseStyles.buttonText, baseStyles.applyButtonText]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};