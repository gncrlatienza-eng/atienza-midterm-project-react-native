import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';
import { JobApplication } from '../types/Job';
import { RootStackParamList } from '../types/Navigation';
import { BackIcon } from '../components/JobDetailIcons';
import { showConfirmationModal } from '../components/ConfirmationModal';

const APPLICATIONS_KEY = '@job_applications';

export const AppliedJobsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors, 390, 844); // fallback; real dimensions not critical for static layout
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

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

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    showConfirmationModal({
      title: 'Delete applications?',
      message:
        selectedIds.size === 1
          ? 'Are you sure you want to delete this application from your history?'
          : `Are you sure you want to delete ${selectedIds.size} applications from your history?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      destructive: true,
      onConfirm: async () => {
        try {
          const remaining = applications.filter((app) => !selectedIds.has(app.jobId));
          setApplications(remaining);
          await AsyncStorage.setItem(APPLICATIONS_KEY, JSON.stringify(remaining));
          setSelectedIds(new Set());
          setExpandedIds((prev) => {
            const next = new Set(prev);
            selectedIds.forEach((id) => next.delete(id));
            return next;
          });
        } catch (error) {
          console.error('Error deleting selected applications:', error);
        }
      },
    });
  };

  const toggleExpand = (jobId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.backgroundSecondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BackIcon color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.title}>Applied</Text>
            </View>

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
            const isExpanded = expandedIds.has(app.jobId);

            const appliedDate = new Date(app.appliedAt);
            const appliedLabel = appliedDate.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            });

            const initial = app.company?.charAt(0).toUpperCase() || '?';

            return (
              <View key={`${app.jobId}-${app.appliedAt}`}>
                <View
                  style={[
                    styles.jobCard,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                    isSelected && {
                      borderColor: colors.primary,
                      borderWidth: 2,
                      backgroundColor: colors.primary + '10',
                    },
                  ]}
                >
                  {/* Selection checkbox */}
                  <TouchableOpacity
                    onPress={() => toggleSelect(app.jobId)}
                    activeOpacity={0.7}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: isSelected ? colors.primary : colors.borderLight,
                      backgroundColor: isSelected ? colors.primary : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}
                  >
                    {isSelected && (
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 4,
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                    )}
                  </TouchableOpacity>

                  {/* Avatar */}
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: colors.backgroundSecondary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: colors.textSecondary,
                      }}
                    >
                      {initial}
                    </Text>
                  </View>

                  {/* Main content */}
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={0.8}
                    onPress={() => toggleExpand(app.jobId)}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ flex: 1, paddingRight: 8 }}>
                          <Text
                            style={styles.jobTitle}
                            numberOfLines={1}
                          >
                            {app.jobTitle}
                          </Text>
                          <Text
                            style={styles.company}
                            numberOfLines={1}
                          >
                            {app.company}
                          </Text>
                        </View>

                        <Text
                          style={{
                            ...styles.detailText,
                            fontSize: 11,
                          }}
                        >
                          {appliedLabel}
                        </Text>
                      </View>

                      {!isExpanded ? (
                        <Text
                          style={styles.detailText}
                          numberOfLines={1}
                        >
                          {app.whyHireYou}
                        </Text>
                      ) : (
                        <>
                          <View style={{ height: 8 }} />
                          <Text style={styles.detailText}>Name: {app.applicantName}</Text>
                          <Text style={styles.detailText}>Email: {app.applicantEmail}</Text>
                          <Text style={styles.detailText}>Phone: {app.applicantPhone}</Text>
                          <View style={{ height: 8 }} />
                          <Text style={styles.detailText}>Why hire you:</Text>
                          <Text style={styles.detailText}>{app.whyHireYou}</Text>
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
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

