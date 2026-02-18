import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { Job } from '../types/Job';
import { createJobCardStyles } from '../styles/JobCard';
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
  const styles = createJobCardStyles(colors);

  const isSaved = job.isSaved || false;
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

      <View style={styles.actions}>
        {isApplied ? (
          // When Applied: Cancel (left) | Applied (right) - both buttons always shown when applied
          <>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={(e) => {
                e.stopPropagation();
                if (onCancelApplication) {
                  onCancelApplication(job.id);
                }
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

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