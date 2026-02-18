import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LocationIcon, ClockIcon, MoneyIcon, BookmarkIcon } from './JobDetailIcons';
import { Job } from '../types/Job';
import Svg, { Path } from 'react-native-svg';

// Check Icon for Applied button
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

interface JobHeroSectionProps {
  job: Job;
  styles: any;
  colors: any;
  isSaved: boolean;
  isApplied?: boolean; // NEW: Track if user already applied
  onApply: () => void;
  onSave: () => void;
}

export const JobHeroSection: React.FC<JobHeroSectionProps> = ({
  job,
  styles,
  colors,
  isSaved,
  isApplied = false, // NEW: Default to false
  onApply,
  onSave,
}) => {
  const [logoError, setLogoError] = React.useState(false);
  
  // ✅ Use companyLogo from API, fallback to logo for backwards compatibility
  const logoUrl = job.companyLogo || job.logo;

  return (
    <View style={styles.heroSection}>
      {/* Company Logo */}
      <View style={styles.logoContainer}>
        {logoUrl && !logoError ? (
          <Image
            source={{ uri: logoUrl }}
            style={styles.companyLogo}
            resizeMode="contain"
            onError={() => {
              console.log('Failed to load logo in JobHeroSection:', logoUrl);
              setLogoError(true);
            }}
          />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoPlaceholderText}>
              {job.company.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Job Title & Company */}
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>

      {/* Quick Info Tags */}
      <View style={styles.quickInfo}>
        {job.location && (
          <View style={styles.infoTag}>
            <LocationIcon color={colors.textSecondary} size={14} />
            <Text style={styles.infoTagText}>{job.location}</Text>
          </View>
        )}
        {job.type && (
          <View style={styles.infoTag}>
            <ClockIcon color={colors.textSecondary} size={14} />
            <Text style={styles.infoTagText}>{job.type}</Text>
          </View>
        )}
        {job.salary && (
          <View style={styles.infoTag}>
            <MoneyIcon color={colors.textSecondary} size={14} />
            <Text style={styles.infoTagText}>{job.salary}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons - UPDATED: Show different button when applied */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[
            styles.applyButton,
            isApplied && styles.appliedButton // NEW: Add applied style
          ]}
          onPress={onApply}
          disabled={isApplied} // NEW: Disable when already applied
          activeOpacity={isApplied ? 1 : 0.8}
        >
          {isApplied && <CheckIcon color="#FFFFFF" />}
          <Text style={styles.applyButtonText}>
            {isApplied ? 'Applied' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}
          onPress={onSave}
          activeOpacity={0.8}
        >
          <BookmarkIcon color={isSaved ? '#FFFFFF' : colors.primary} filled={isSaved} />
        </TouchableOpacity>
      </View>
    </View>
  );
};