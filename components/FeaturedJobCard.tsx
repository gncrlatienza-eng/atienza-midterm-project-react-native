import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface FeaturedJobCardProps {
  job: Job;
  onPress: (job: Job) => void;
}

// Star icon for featured badge
const StarIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill={color}
    />
  </Svg>
);

export const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({ job, onPress }) => {
  const { colors, theme } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const isDarkMode = theme === 'dark';

  const styles = StyleSheet.create({
    card: {
      // Distinctive background color for featured cards
      backgroundColor: isDarkMode 
        ? 'rgba(0, 122, 255, 0.1)' // Blue tint in dark mode
        : 'rgba(0, 122, 255, 0.05)', // Subtle blue tint in light mode
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      marginHorizontal: 20,
      borderWidth: 1.5,
      borderColor: colors.primary, // Blue border to highlight featured status
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    featuredBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      zIndex: 1,
    },
    featuredText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    logoContainer: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.card,
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
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    viewButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '600',
    },
  });

  const [logoError, setLogoError] = React.useState(false);

  // Use companyLogo from API, fallback to logo for backwards compatibility
  const logoUrl = job.companyLogo || job.logo;

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      {/* Featured Badge */}
      <View style={styles.featuredBadge}>
        <StarIcon color="#FFFFFF" />
        <Text style={styles.featuredText}>FEATURED</Text>
      </View>

      <View style={styles.logoContainer}>
        {logoUrl && !logoError ? (
          <Image
            source={{ uri: logoUrl }}
            style={styles.logo}
            onError={() => {
              console.log('Failed to load logo:', logoUrl);
              setLogoError(true);
            }}
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