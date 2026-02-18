import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { createFeaturedJobCardStyles } from '../styles/FeaturedJobCard';
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
  const isDarkMode = theme === 'dark';
  const styles = createFeaturedJobCardStyles({ colors, isDarkMode });

  const [logoError, setLogoError] = React.useState(false);
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
            {(job.type || job.salary) && <Text style={styles.separator}>•</Text>}
          </>
        )}
        {job.type && (
          <>
            <Text style={styles.detail}>{job.type}</Text>
            {job.salary && <Text style={styles.separator}>•</Text>}
          </>
        )}
        {job.salary && (
          <Text style={styles.detail}>{job.salary}</Text>
        )}
      </View>

      <View style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </View>
    </TouchableOpacity>
  );
};