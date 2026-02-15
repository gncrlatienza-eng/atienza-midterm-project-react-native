import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobApplication } from '../types/Job';

const APPLICATIONS_KEY = '@job_applications';

// Check if user has applied for a specific job
export const hasAppliedForJob = async (jobId: string): Promise<boolean> => {
  try {
    const applicationsJson = await AsyncStorage.getItem(APPLICATIONS_KEY);
    if (applicationsJson) {
      const applications: JobApplication[] = JSON.parse(applicationsJson);
      return applications.some(app => app.jobId === jobId);
    }
    return false;
  } catch (error) {
    console.error('Error checking if applied:', error);
    return false;
  }
};

// Get all applied job IDs
export const getAppliedJobIds = async (): Promise<Set<string>> => {
  try {
    const applicationsJson = await AsyncStorage.getItem(APPLICATIONS_KEY);
    if (applicationsJson) {
      const applications: JobApplication[] = JSON.parse(applicationsJson);
      return new Set(applications.map(app => app.jobId));
    }
    return new Set();
  } catch (error) {
    console.error('Error getting applied job IDs:', error);
    return new Set();
  }
};

// Cancel/remove application
export const cancelApplication = async (jobId: string): Promise<boolean> => {
  try {
    const applicationsJson = await AsyncStorage.getItem(APPLICATIONS_KEY);
    if (applicationsJson) {
      let applications: JobApplication[] = JSON.parse(applicationsJson);
      applications = applications.filter(app => app.jobId !== jobId);
      await AsyncStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error canceling application:', error);
    return false;
  }
};

// Get application for a specific job
export const getApplicationForJob = async (jobId: string): Promise<JobApplication | null> => {
  try {
    const applicationsJson = await AsyncStorage.getItem(APPLICATIONS_KEY);
    if (applicationsJson) {
      const applications: JobApplication[] = JSON.parse(applicationsJson);
      return applications.find(app => app.jobId === jobId) || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting application:', error);
    return null;
  }
};