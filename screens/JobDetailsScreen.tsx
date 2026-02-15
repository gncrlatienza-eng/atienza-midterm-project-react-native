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
      // Create formatted message without emojis
      const shareMessage = `
Check out this job opportunity!

${job.title}
${job.company}
${job.location ? `Location: ${job.location}` : ''}
${job.salary ? `Salary: ${job.salary}` : ''}
${job.type ? `Type: ${job.type}` : ''}

${job.description ? job.description.substring(0, 200).replace(/<[^>]*>/g, '') + '...' : ''}
      `.trim();

      const shareOptions = Platform.select({
        ios: {
          message: shareMessage,
          url: `https://empllo.com/jobs/${job.id}`,
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
          console.log('Shared via:', result.activityType);
        } else {
          console.log('Job shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
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
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 120 } // Extra padding for tab bar
          ]}
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

          {/* Spacer */}
          <View style={{ height: 32 }} />

          {/* About the Role */}
          <JobContentSection
            title="About the Role"
            content={job.description}
            styles={styles}
            colors={colors}
          />

          {/* Requirements */}
          <JobContentSection
            title="Requirements"
            listItems={job.requirements}
            styles={styles}
            colors={colors}
          />

          {/* Benefits & Perks */}
          <JobContentSection
            title="Benefits & Perks"
            listItems={job.benefits}
            styles={styles}
            colors={colors}
          />

          {/* Bottom Spacing */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};