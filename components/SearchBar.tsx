import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, useWindowDimensions, Animated, Text, Platform} from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createSearchBarStyles } from '../styles/SearchBar';
import Svg, { Circle, Path } from 'react-native-svg';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  onCancel?: () => void;
  showCancel?: boolean;
}

// Search Icon
const SearchIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
    <Path d="M16 16L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Clear Icon
const CloseIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Path d="M6 6L18 18M18 6L6 18" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onFocus,
  onBlur,
  isFocused: externalIsFocused,
  onCancel,
  showCancel = false,
}) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const styles = createSearchBarStyles(colors, width);
  
  const [internalIsFocused, setInternalIsFocused] = useState(false);
  const isFocused = externalIsFocused !== undefined ? externalIsFocused : internalIsFocused;
  
  const searchBarWidth = React.useRef(new Animated.Value(1)).current;
  const cancelOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (showCancel) {
      Animated.parallel([
        Animated.spring(searchBarWidth, {
          toValue: isFocused ? 0.75 : 1, // Shrink to 75% when Cancel shows
          useNativeDriver: false,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(cancelOpacity, {
          toValue: isFocused ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused, showCancel]);

  const animatedWidth = searchBarWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 40], // Full width minus padding
  });

  const handleClear = () => {
    onChangeText('');
  };

  const handleFocus = () => {
    setInternalIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setInternalIsFocused(false);
    onBlur?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View 
        style={[
          styles.container,
          showCancel && { width: animatedWidth }
        ]}
      >
        <SearchIcon color={colors.textTertiary} />
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            activeOpacity={0.7}
          >
            <CloseIcon color={colors.background} />
          </TouchableOpacity>
        )}
      </Animated.View>

      {showCancel && isFocused && (
        <Animated.View style={[styles.cancelContainer, { opacity: cancelOpacity }]}>
          <TouchableOpacity onPress={handleCancel} activeOpacity={0.6}>
            <Text style={[styles.cancelText, { color: colors.primary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};