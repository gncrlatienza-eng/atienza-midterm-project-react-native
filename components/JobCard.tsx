import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface JobCardProps {
  job: Job;
  onSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onPress: (job: Job) => void;
}

// Location Pin Icon
const LocationIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Clock Icon
const ClockIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const JobCard: React.FC<JobCardProps> = ({ job, onSave, onApply, onPress }) => {
  const { colors } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    header: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    logoContainer: {
      width: 48,
      height: 48,
      borderRadius: 10,
      backgroundColor: colors.backgroundSecondary,
      marginRight: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    logoFallback: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgroundSecondary,
    },
    logoText: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    headerContent: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    company: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    detailText: {
      fontSize: 13,
      color: colors.textTertiary,
      fontWeight: '400',
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    saveButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    saveButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    applyButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    applyButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });

  const [logoError, setLogoError] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {job.logo && !logoError ? (
            <Image
              source={{ uri: job.logo }}
              style={styles.logo}
              onError={() => setLogoError(true)}
            />
          ) : (
            <View style={styles.logoFallback}>
              <Text style={styles.logoText}>
                {job.company.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.title} numberOfLines={1}>
            {job.title}
          </Text>
          <Text style={styles.company} numberOfLines={1}>
            {job.company}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        {job.location && (
          <View style={styles.detailItem}>
            <LocationIcon color={colors.textTertiary} />
            <Text style={styles.detailText}>{job.location}</Text>
          </View>
        )}
        {job.type && (
          <View style={styles.detailItem}>
            <ClockIcon color={colors.textTertiary} />
            <Text style={styles.detailText}>{job.type}</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={(e) => {
            e.stopPropagation();
            onSave(job.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={(e) => {
            e.stopPropagation();
            onApply(job.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};