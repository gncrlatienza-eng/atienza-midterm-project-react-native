import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './context/ThemedContext';
import { ThemedStatusBar } from './globalstyles/ThemedStatusBar';
import { LoadingScreen } from './screens/LoadingScreen';
import { NavigationBar } from './components/NavigationBar';
import { JobDetailsScreen } from './screens/JobDetailsScreen';

const Stack = createNativeStackNavigator();

// App Root
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={NavigationBar} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <AppContent />
    </ThemeProvider>
  );
}