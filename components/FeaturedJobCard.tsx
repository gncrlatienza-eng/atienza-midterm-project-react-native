import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
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
  const styles = createStyles(colors, width);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(job)}
      activeOpacity={0.8}
    >
      {/* Background Gradient Effect */}
      <View style={styles.gradientBackground} />
      
      {/* Company Logo - Large */}
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

      {/* Job Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.jobTitle} numberOfLines={2}>
          {job.title}
        </Text>
        <Text style={styles.company} numberOfLines={1}>
          {job.company}
        </Text>
        
        {/* Quick Info */}
        <View style={styles.quickInfo}>
          {job.location && (
            <Text style={styles.infoText} numberOfLines={1}>
              {job.location}
            </Text>
          )}
          {job.type && (
            <Text style={styles.infoDot}>•</Text>
          )}
          {job.type && (
            <Text style={styles.infoText} numberOfLines={1}>
              {job.type}
            </Text>
          )}
        </View>
      </View>

      {/* "Open" button like App Store */}
      <View style={styles.openButton}>
        <Text style={styles.openButtonText}>View</Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any, width: number) => StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: colors.card,
    borderRadius: 20,
    marginBottom: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary + '08', // 3% opacity
  },
  logoContainer: {
    marginBottom: 12,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  logoPlaceholderText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
  },
  infoContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  company: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  quickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  infoDot: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  openButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  openButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
});