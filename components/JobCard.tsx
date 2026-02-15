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
  onCancelApplication?: (jobId: string) => void;
  showRemove?: boolean;
  isApplied?: boolean;
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

// Money Icon
const MoneyIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M12 6V18M9 9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9C15 10.1046 14.1046 11 13 11H11C9.89543 11 9 11.8954 9 13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Check Icon for "Saved" and "Applied" buttons
const CheckIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M20 6L9 17L4 12" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onSave, 
  onApply, 
  onPress, 
  onCancelApplication,
  showRemove = false,
  isApplied = false,
}) => {
  const { colors } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const isSaved = job.isSaved || false;

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
    // FIXED: Actions container - always same layout
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    // FIXED: Both buttons always have flex: 1 (equal width)
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
    },
    // Default styles
    saveButton: {
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    savedButton: {
      backgroundColor: '#34C759',
      borderColor: '#34C759',
      borderWidth: 1,
    },
    removeButton: {
      backgroundColor: '#FF3B30',
      borderColor: '#FF3B30',
      borderWidth: 1,
    },
    applyButton: {
      backgroundColor: colors.primary,
    },
    appliedButton: {
      backgroundColor: '#34C759',
      borderColor: '#34C759',
      borderWidth: 1,
    },
    cancelButton: {
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    // Text styles
    buttonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    whiteButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });

  const [logoError, setLogoError] = React.useState(false);
  const logoUrl = job.companyLogo || job.logo;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(job)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
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
        {job.salary && (
          <View style={styles.detailItem}>
            <MoneyIcon color={colors.textTertiary} />
            <Text style={styles.detailText}>{job.salary}</Text>
          </View>
        )}
      </View>

      {/* FIXED: Same container structure for both states */}
      <View style={styles.actions}>
        {isApplied ? (
          // When Applied: Cancel (left) | Applied (right)
          <>
            {onCancelApplication && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={(e) => {
                  e.stopPropagation();
                  onCancelApplication(job.id);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.appliedButton]}
              disabled={true}
              activeOpacity={1}
            >
              <CheckIcon color="#FFFFFF" />
              <Text style={styles.whiteButtonText}>Applied</Text>
            </TouchableOpacity>
          </>
        ) : (
          // When Not Applied: Save (left) | Apply (right)
          <>
            <TouchableOpacity
              style={[
                styles.button,
                showRemove 
                  ? styles.removeButton 
                  : (isSaved ? styles.savedButton : styles.saveButton)
              ]}
              onPress={(e) => {
                e.stopPropagation();
                onSave(job.id);
              }}
              activeOpacity={0.7}
            >
              {isSaved && !showRemove && (
                <CheckIcon color="#FFFFFF" />
              )}
              <Text style={
                showRemove || isSaved ? styles.whiteButtonText : styles.buttonText
              }>
                {showRemove ? 'Remove' : (isSaved ? 'Saved' : 'Save')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={(e) => {
                e.stopPropagation();
                onApply(job.id);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.whiteButtonText}>Apply</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};