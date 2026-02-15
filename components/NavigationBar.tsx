import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from '../context/ThemedContext';
import { HomeScreen } from '../screens/HomeScreen';
import { SavedJobsScreen } from '../screens/SavedJobScreen';
import Svg, { Path, Circle } from 'react-native-svg';

const Tab = createBottomTabNavigator();

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

export const NavigationBar: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 90,
          paddingTop: 8,
          paddingBottom: 28,
        },
        tabBarBackground: () => (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: isDark
                ? 'rgba(28, 28, 30, 0.85)' 
                : 'rgba(255, 255, 255, 0.85)',
              borderTopWidth: 0.5,
              borderTopColor: isDark ? 'rgba(84, 84, 88, 0.3)' : 'rgba(0, 0, 0, 0.1)',
            }}
            blurType={isDark ? 'dark' : 'light'}
            blurAmount={20}
            reducedTransparencyFallbackColor={colors.tabBarBackground}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="FindJobs"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Find Jobs',
          tabBarIcon: ({ focused, color }) => (
            <SearchTabIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ focused, color }) => (
            <BookmarkTabIcon focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};