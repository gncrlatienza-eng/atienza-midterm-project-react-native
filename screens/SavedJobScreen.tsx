import React from 'react';
import { View, Text, SafeAreaView, useWindowDimensions,} from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createHomeStyles } from '../styles/HomeScreen';

export const SavedJobsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const styles = createHomeStyles(colors, width, height);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved Jobs</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No saved jobs yet.{'\n'}Start saving jobs you're interested in!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};