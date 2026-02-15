// Navigation types for React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps as TabScreenProps } from '@react-navigation/bottom-tabs';
import { Job } from './Job';

// Root Stack Navigator
export type RootStackParamList = {
  MainTabs: undefined;
  JobDetails: { job: Job; fromSaved?: boolean };
  ApplicationForm: { job: Job; fromSaved?: boolean };
};

// Bottom Tab Navigator
export type BottomTabParamList = {
  FindJobs: undefined;
  SavedJobs: undefined;
};

// Screen props types
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabScreenProps<T extends keyof BottomTabParamList> = 
  TabScreenProps<BottomTabParamList, T>;

// Specific screen props for easier use
export type JobDetailsScreenProps = RootStackScreenProps<'JobDetails'>;
export type ApplicationFormScreenProps = RootStackScreenProps<'ApplicationForm'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}