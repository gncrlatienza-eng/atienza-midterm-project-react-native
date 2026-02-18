import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LocationIcon, ClockIcon, MoneyIcon, BookmarkIcon } from './JobDetailIcons';
import { Job } from '../types/Job';
import Svg, { Path } from 'react-native-svg';

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
  isApplied?: boolean;
  onApply: () => void;
  onSave: () => void;
}

export const JobHeroSection: React.FC<JobHeroSectionProps> = ({
  job,
  styles,
  colors,
  isSaved,
  isApplied = false,
  onApply,
  onSave,
}) => {
  const [logoError, setLogoError] = React.useState(false);
  
  const logoUrl = job.companyLogo || job.logo;

  return (
    <View style={styles.heroSection}>
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

      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>

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

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[
            styles.applyButton,
            isApplied && styles.appliedButton
          ]}
          onPress={onApply}
          disabled={isApplied}
          activeOpacity={isApplied ? 1 : 0.8}
        >
          {/* flexDirection row + alignItems center keeps text and check on same line */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Text style={styles.applyButtonText}>
              {isApplied ? 'Applied' : 'Apply Now'}
            </Text>
            {isApplied && <CheckIcon color="#FFFFFF" />}
          </View>
        </TouchableOpacity>

        {/* disabled + opacity 0.3 when applied */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaved && styles.saveButtonActive,
            isApplied && { opacity: 0.3 }
          ]}
          onPress={isApplied ? undefined : onSave}
          disabled={isApplied}
          activeOpacity={0.8}
        >
          <BookmarkIcon color={isSaved ? '#FFFFFF' : colors.primary} filled={isSaved} />
        </TouchableOpacity>
      </View>
    </View>
  );
};