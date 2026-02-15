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
  const { width: screenWidth } = useWindowDimensions();

  const cardWidth = screenWidth - 64; // Full width minus margins

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.borderLight,
      width: cardWidth,
    },
    logoContainer: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.backgroundSecondary,
      marginBottom: 12,
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
      fontSize: 24,
      fontWeight: '700',
      color: colors.textSecondary,
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
      marginBottom: 8,
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    detail: {
      fontSize: 13,
      color: colors.textTertiary,
      fontWeight: '400',
    },
    separator: {
      marginHorizontal: 6,
      fontSize: 13,
      color: colors.textTertiary,
    },
    viewButton: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 20,
      alignSelf: 'flex-end',
    },
    viewButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '600',
    },
  });

  const [logoError, setLogoError] = React.useState(false);

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
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

      <Text style={styles.title} numberOfLines={2}>
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

      <View style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </View>
    </TouchableOpacity>
  );
};