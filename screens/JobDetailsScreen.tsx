import React from 'react';
import { View, ScrollView, SafeAreaView, useWindowDimensions, Share, Alert, Platform } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createJobDetailsStyles } from '../styles/JobDetailsScreen';
import { JobDetailsHeader } from '../components/JobDetailsHeader';
import { JobHeroSection } from '../components/JobHeroSection';
import { JobContentSection } from '../components/JobContentSection';
import { JobDetailsScreenProps } from '../types/Navigation';

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route, navigation }) => {
  const { job } = route.params;
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createJobDetailsStyles(colors, width, height);

  const [isSaved, setIsSaved] = React.useState(job.isSaved || false);

  const handleApply = () => {
    console.log('Apply for job:', job.id);
    Alert.alert(
      'Apply for this job?',
      `You're about to apply for ${job.title} at ${job.company}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Apply',
          onPress: () => {
            Alert.alert('Coming Soon', 'Application form will be available soon!');
          }
        }
      ]
    );
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    const message = !isSaved ? 'Job saved!' : 'Job removed from saved';
    Alert.alert('Success', message, [{ text: 'OK' }], { cancelable: true });
  };

  const handleShare = async () => {
    try {
      // Create formatted message
      const shareMessage = `
Check out this job opportunity!

${job.title}
${job.company}
${job.location ? `📍 ${job.location}` : ''}
${job.salary ? `💰 ${job.salary}` : ''}
${job.type ? `⏰ ${job.type}` : ''}

${job.description ? job.description.substring(0, 200).replace(/<[^>]*>/g, '') + '...' : ''}
      `.trim();

      const shareOptions = Platform.select({
        ios: {
          message: shareMessage,
          // Adding a URL enables AirDrop and full iOS share experience
          // You can use the job's actual URL if you have one
          url: `https://empllo.com/jobs/${job.id}`, // Replace with your actual job URL
          title: `${job.title} at ${job.company}`,
        },
        android: {
          message: shareMessage,
          title: `${job.title} at ${job.company}`,
        },
        default: {
          message: shareMessage,
        },
      });

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared via specific app (AirDrop, Messages, etc.)
          console.log('Shared via:', result.activityType);
        } else {
          // Shared (Android)
          console.log('Job shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // User dismissed the share sheet
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share job. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <JobDetailsHeader
          styles={styles}
          colors={colors}
          onBack={handleBack}
          onShare={handleShare}
        />

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Section */}
          <JobHeroSection
            job={job}
            styles={styles}
            colors={colors}
            isSaved={isSaved}
            onApply={handleApply}
            onSave={handleSave}
          />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <JobContentSection
            title="About the Role"
            content={job.description}
            styles={styles}
          />

          {/* Requirements */}
          <JobContentSection
            title="Requirements"
            listItems={job.requirements}
            styles={styles}
          />

          {/* Benefits */}
          <JobContentSection
            title="Benefits & Perks"
            listItems={job.benefits}
            styles={styles}
          />

          {/* Bottom Spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};