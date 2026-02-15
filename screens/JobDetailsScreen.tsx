import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, useWindowDimensions, } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createJobDetailsStyles } from '../styles/JobDetailsScreen';
import { Job } from '../types/Job';
import Svg, { Path } from 'react-native-svg';

// Back Arrow Icon
const BackIcon: React.FC<{ color: string }> = ({ color }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M19 12H5M12 19L5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

interface JobDetailsScreenProps {
    route: {
        params: {
            job: Job;
        };
    };
    navigation: any;
}

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route, navigation }) => {
    const { job } = route.params;
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();
    const styles = createJobDetailsStyles(colors, width, height);

    const handleApply = () => {
        // TODO: Navigate to application form
        console.log('Apply for job:', job.id);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <BackIcon color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Job Details</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Content */}
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Job Title & Company */}
                    <View style={styles.titleSection}>
                        <Text style={styles.jobTitle}>{job.title}</Text>
                        <Text style={styles.company}>{job.company}</Text>
                    </View>

                    {/* Job Details Badges */}
                    <View style={styles.badgesContainer}>
                        {job.location && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>📍 {job.location}</Text>
                            </View>
                        )}
                        {job.salary && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>💰 {job.salary}</Text>
                            </View>
                        )}
                        {job.type && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>💼 {job.type}</Text>
                            </View>
                        )}
                        {job.posted && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>📅 {job.posted}</Text>
                            </View>
                        )}
                    </View>

                    {/* Description */}
                    {job.description && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.sectionText}>{job.description}</Text>
                        </View>
                    )}

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Requirements</Text>
                            {job.requirements.map((req, index) => (
                                <View key={index} style={styles.bulletPoint}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.sectionText}>{req}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Benefits */}
                    {job.benefits && job.benefits.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Benefits</Text>
                            {job.benefits.map((benefit, index) => (
                                <View key={index} style={styles.bulletPoint}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.sectionText}>{benefit}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Spacing at bottom */}
                    <View style={{ height: 100 }} />
                </ScrollView>

                {/* Apply Button - Fixed at bottom */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={handleApply}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.applyButtonText}>Apply for this job</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};