import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LocationIcon, ClockIcon, MoneyIcon, BookmarkIcon } from './JobDetailIcons';
import { Job } from '../types/Job';

interface JobHeroSectionProps {
  job: Job;
  styles: any;
  colors: any;
  isSaved: boolean;
  onApply: () => void;
  onSave: () => void;
}

export const JobHeroSection: React.FC<JobHeroSectionProps> = ({
  job,
  styles,
  colors,
  isSaved,
  onApply,
  onSave,
}) => {
  return (
    <View style={styles.heroSection}>
      {/* Company Logo */}
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

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={onApply}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
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