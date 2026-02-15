import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { StyleSheet } from 'react-native';

interface FeaturedJobCardProps {
  job: Job;
  onPress: (job: Job) => void;
}

export const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({ job, onPress }) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    logo: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.backgroundSecondary,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    logoText: {
      fontSize: 24,
      fontWeight: '700',
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    company: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 6,
    },
    details: {
      flexDirection: 'row',
      gap: 8,
    },
    detail: {
      fontSize: 13,
      color: colors.textTertiary,
    },
    separator: {
      color: colors.textTertiary,
    },
    viewButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    viewButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
  });

  // Generate company logo from first letter
  const getCompanyInitial = (company: string) => {
    return company.charAt(0).toUpperCase();
  };

  // Generate a color based on company name
  const getLogoColor = (company: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    const index = company.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View style={[styles.logo, { backgroundColor: getLogoColor(job.company) }]}>
        <Text style={styles.logoText}>{getCompanyInitial(job.company)}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {job.title}
        </Text>
        <Text style={styles.company} numberOfLines={1}>
          {job.company}
        </Text>
        <View style={styles.details}>
          {job.location && (
            <>
              <Text style={styles.detail}>{job.location}</Text>
              {job.type && <Text style={styles.separator}>•</Text>}
            </>
          )}
          {job.type && (
            <Text style={styles.detail}>{job.type}</Text>
          )}
        </View>
      </View>

      <View style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </View>
    </TouchableOpacity>
  );
};