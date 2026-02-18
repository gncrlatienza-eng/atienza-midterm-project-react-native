import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Animated, TouchableOpacity, PanResponder } from 'react-native';
import { FeaturedJobCard } from './FeaturedJobCard';
import { Job } from '../types/Job';
import { createFeaturedCarouselStyles } from '../styles/FeaturedCarousel';

interface FeaturedCarouselProps {
  jobs: Job[];
  onJobPress: (job: Job) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ jobs, onJobPress }) => {
  const styles = createFeaturedCarouselStyles();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const switchToNext = useCallback(() => {
    if (jobs.length <= 1) return;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -20, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length);
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    });
  }, [jobs.length, fadeAnim, slideAnim]);

  // Switch to previous
  const switchToPrev = useCallback(() => {
    if (jobs.length <= 1) return;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 20, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + jobs.length) % jobs.length);
      slideAnim.setValue(-20);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    });
  }, [jobs.length, fadeAnim, slideAnim]);

  // PanResponder for swipe detection
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          switchToNext();
        } else if (gestureState.dx > 50) {
          switchToPrev();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (jobs.length <= 1) return;
    const interval = setInterval(() => { switchToNext(); }, 6000);
    return () => clearInterval(interval);
  }, [jobs.length, switchToNext]);

  useEffect(() => {
    fadeAnim.setValue(1);
    slideAnim.setValue(0);
    setCurrentIndex(0);
  }, [jobs, fadeAnim, slideAnim]);

  const handleDotPress = useCallback((index: number) => {
    if (index === currentIndex) return;
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    setCurrentIndex(index);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [currentIndex, fadeAnim, slideAnim]);

  if (jobs.length === 0) return null;

  const currentJob = jobs[currentIndex];

  return (
    <View style={styles.container}>
      {/* Attach panResponder to the animated view */}
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}
        {...panResponder.panHandlers}
      >
        <FeaturedJobCard job={currentJob} onPress={onJobPress} />
      </Animated.View>

      {jobs.length > 1 && (
        <View style={styles.paginationContainer}>
          {jobs.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              style={[
                styles.dot,
                index === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};