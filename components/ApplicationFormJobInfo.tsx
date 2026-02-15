import React from 'react';
import { View, Text, Image } from 'react-native';
import { Job } from '../types/Job';

interface ApplicationFormJobInfoProps {
  job: Job;
  styles: any;
  colors: any;
}

export const ApplicationFormJobInfo: React.FC<ApplicationFormJobInfoProps> = ({
  job,
  styles,
  colors,
}) => {
  const logoUri = job.companyLogo || job.logo;
  
  // Get company initials for fallback
  const getInitials = (companyName: string): string => {
    return companyName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.jobInfo}>
      {/* Company Logo */}
      <View style={styles.logoContainer}>
        {logoUri ? (
          <Image 
            source={{ uri: logoUri }} 
            style={styles.companyLogo}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.companyLogoFallback, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.companyLogoText, { color: colors.primary }]}>
              {getInitials(job.company)}
            </Text>
          </View>
        )}
      </View>

      {/* Job Title */}
      <Text style={styles.jobTitle}>{job.title}</Text>
      
      {/* Company Name */}
      <Text style={styles.jobCompany}>{job.company}</Text>
    </View>
  );
};