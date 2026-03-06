import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemedContext';
import { HomeScreen } from '../screens/HomeScreen';
import { SavedJobsScreen } from '../screens/SavedJobScreen';
import { AppliedJobsScreen } from '../screens/AppliedJobsScreen';
import { createTabBarStyles } from '../styles/NavigationBar';
import Svg, { Path, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter, Animated } from 'react-native';
import { Job } from '../types/Job';

const Tab = createBottomTabNavigator();

const SAVED_JOBS_KEY = '@saved_jobs';

// Minimalistic Search Icon
const SearchTabIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={focused ? "2.5" : "2"} />
    <Path d="M16 16L21 21" stroke={color} strokeWidth={focused ? "2.5" : "2"} strokeLinecap="round" />
  </Svg>
);

// Minimalistic Bookmark Icon
const BookmarkTabIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" 
      stroke={color} 
      strokeWidth={focused ? "2.5" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={focused ? color : "none"}
    />
  </Svg>
);

const AnimatedIconWrapper: React.FC<{ focused: boolean; children: React.ReactNode }> = ({ focused, children }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.08 : 1,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {children}
    </Animated.View>
  );
};

export const NavigationBar: React.FC = () => {
  const { colors, theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [savedCount, setSavedCount] = useState<number>(0);

  const tabBarStyles = createTabBarStyles({ colors, isDarkMode });

  const loadSavedCount = useCallback(async () => {
    try {
      const savedJobsJson = await AsyncStorage.getItem(SAVED_JOBS_KEY);
      if (!savedJobsJson) {
        setSavedCount(0);
        return;
      }
      const savedJobs: Job[] = JSON.parse(savedJobsJson);
      setSavedCount(savedJobs.length);
    } catch (error) {
      console.error('Error loading saved jobs count:', error);
      setSavedCount(0);
    }
  }, []);

  useEffect(() => {
    loadSavedCount();
    const subscription = DeviceEventEmitter.addListener('savedJobsUpdated', loadSavedCount);
    return () => {
      subscription.remove();
    };
  }, [loadSavedCount]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        ...tabBarStyles,
      }}
    >
      <Tab.Screen
        name="FindJobs"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIconWrapper focused={focused}>
              <SearchTabIcon focused={focused} color={color} />
            </AnimatedIconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIconWrapper focused={focused}>
              <BookmarkTabIcon focused={focused} color={color} />
            </AnimatedIconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="AppliedJobs"
        component={AppliedJobsScreen}
        options={{
          tabBarLabel: 'Applied',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIconWrapper focused={focused}>
              <BookmarkTabIcon focused={focused} color={color} />
            </AnimatedIconWrapper>
          ),
        }}
      />
    </Tab.Navigator>
  );
};