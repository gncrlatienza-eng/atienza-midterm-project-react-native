import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { FeaturedJobCard } from './FeaturedJobCard';
import { Job } from '../types/Job';

interface FeaturedCarouselProps {
  jobs: Job[];
  onJobPress: (job: Job) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ jobs, onJobPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Auto-switch every 6 seconds
  useEffect(() => {
    if (jobs.length <= 1) return;

    const interval = setInterval(() => {
      // Fade out and slide
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Switch to next job
        setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length);
        
        // Reset position and fade in
        slideAnim.setValue(20);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [jobs.length, fadeAnim, slideAnim]);

  // Reset animations when jobs change
  useEffect(() => {
    fadeAnim.setValue(1);
    slideAnim.setValue(0);
    setCurrentIndex(0);
  }, [jobs]);

  if (jobs.length === 0) return null;

  const currentJob = jobs[currentIndex];

  return (
    <View style={{ position: 'relative' }}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        }}
      >
        <FeaturedJobCard
          job={currentJob}
          onPress={onJobPress}
        />
      </Animated.View>

      {/* Pagination Dots */}
      {jobs.length > 1 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
            gap: 6,
          }}
        >
          {jobs.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Allow manual switching
                fadeAnim.setValue(0);
                slideAnim.setValue(20);
                setCurrentIndex(index);
                Animated.parallel([
                  Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                  Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                ]).start();
              }}
              style={{
                width: index === currentIndex ? 24 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: index === currentIndex ? '#007AFF' : '#D1D1D6',
                opacity: index === currentIndex ? 1 : 0.4,
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};