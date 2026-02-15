import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
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
  const { colors, theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isDarkMode 
            ? 'rgba(28, 28, 30, 0.90)' // Dark mode: slightly transparent
            : 'rgba(255, 255, 255, 0.90)', // Light mode: slightly transparent
          borderTopWidth: 0.5,
          borderTopColor: isDarkMode 
            ? 'rgba(84, 84, 88, 0.3)' 
            : 'rgba(0, 0, 0, 0.1)',
          height: 90,
          paddingTop: 8,
          paddingBottom: 28,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: isDarkMode ? 0.3 : 0.1,
          shadowRadius: 8,
        },
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