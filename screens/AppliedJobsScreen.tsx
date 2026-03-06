import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { JobApplication } from '../types/Job';

const APPLICATIONS_KEY = '@job_applications';

export const AppliedJobsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors, 390, 844); // fallback; real dimensions not critical for static layout

  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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

  const toggleSelect = (jobId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === applications.length) {
      setSelectedIds(new Set());
      return;
    }
    const allIds = new Set(applications.map((app) => app.jobId));
    setSelectedIds(allIds);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    try {
      const remaining = applications.filter((app) => !selectedIds.has(app.jobId));
      setApplications(remaining);
      await AsyncStorage.setItem(APPLICATIONS_KEY, JSON.stringify(remaining));
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Error deleting selected applications:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Applied</Text>
            {applications.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16 }}>
                <TouchableOpacity onPress={handleSelectAll} activeOpacity={0.7}>
                  <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>
                    {selectedIds.size === applications.length && applications.length > 0
                      ? 'Clear'
                      : 'Select All'}
                  </Text>
                </TouchableOpacity>
                {selectedIds.size > 0 && (
                  <TouchableOpacity onPress={handleDeleteSelected} activeOpacity={0.7}>
                    <Text style={{ color: '#EF4444', fontWeight: '700' }}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>

        <ScrollView style={styles.jobList} contentContainerStyle={{ paddingBottom: 32 }}>
          {applications.map((app) => {
            const isSelected = selectedIds.has(app.jobId);
            return (
              <TouchableOpacity
                key={`${app.jobId}-${app.appliedAt}`}
                activeOpacity={0.8}
                onPress={() => toggleSelect(app.jobId)}
              >
                <View
                  style={[
                    styles.jobCard,
                    isSelected && {
                      borderColor: colors.primary,
                      borderWidth: 2,
                      backgroundColor: colors.primary + '10',
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}
                  >
                    <View>
                      <Text style={styles.jobTitle}>{app.jobTitle}</Text>
                      <Text style={styles.company}>{app.company}</Text>
                    </View>
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: isSelected ? colors.primary : colors.borderLight,
                        backgroundColor: isSelected ? colors.primary : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 3,
                            backgroundColor: '#FFFFFF',
                          }}
                        />
                      )}
                    </View>
                  </View>

                  <View style={{ height: 8 }} />
                  <Text style={styles.detailText}>Name: {app.applicantName}</Text>
                  <Text style={styles.detailText}>Email: {app.applicantEmail}</Text>
                  <Text style={styles.detailText}>Phone: {app.applicantPhone}</Text>
                  <View style={{ height: 8 }} />
                  <Text style={styles.detailText}>Why hire you:</Text>
                  <Text style={styles.detailText}>{app.whyHireYou}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

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

