// Navigation types for React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps as TabScreenProps } from '@react-navigation/bottom-tabs';

// Root Stack Navigator
export type RootStackParamList = {
  MainTabs: undefined;
  JobDetails: { jobId: string };
  ApplicationForm: { jobId: string; fromSaved?: boolean };
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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}