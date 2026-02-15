import React from 'react';
import { View, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
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
    // TODO: Navigate to application form
    // navigation.navigate('ApplicationForm', { job });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Update saved jobs in state/storage
  };

  const handleShare = () => {
    console.log('Share job:', job.id);
    // TODO: Implement share functionality
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