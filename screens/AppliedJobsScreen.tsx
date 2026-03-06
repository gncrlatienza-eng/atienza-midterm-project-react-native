import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { JobApplication } from '../types/Job';

const APPLICATIONS_KEY = '@job_applications';

export const AppliedJobsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors, 390, 844); // fallback; real dimensions not critical for static layout

  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const json = await AsyncStorage.getItem(APPLICATIONS_KEY);
        if (json) {
          const parsed: JobApplication[] = JSON.parse(json);
          setApplications(parsed.sort((a, b) => (a.appliedAt < b.appliedAt ? 1 : -1)));
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error('Error loading applications:', error);
        setApplications([]);
      }
    };

    loadApplications();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Applied</Text>
          </View>
        </View>

        <ScrollView style={styles.jobList} contentContainerStyle={{ paddingBottom: 32 }}>
          {applications.map((app) => (
            <View key={`${app.jobId}-${app.appliedAt}`} style={styles.jobCard}>
              <Text style={styles.jobTitle}>{app.jobTitle}</Text>
              <Text style={styles.company}>{app.company}</Text>
              <View style={{ height: 8 }} />
              <Text style={styles.detailText}>Name: {app.applicantName}</Text>
              <Text style={styles.detailText}>Email: {app.applicantEmail}</Text>
              <Text style={styles.detailText}>Phone: {app.applicantPhone}</Text>
              <View style={{ height: 8 }} />
              <Text style={styles.detailText}>Why hire you:</Text>
              <Text style={styles.detailText}>{app.whyHireYou}</Text>
            </View>
          ))}

          {applications.length === 0 && (
            <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
              <Text style={styles.emptyText}>No applications yet.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

