import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BackIcon, ShareIcon } from './JobDetailIcons';

interface JobDetailsHeaderProps {
  styles: any;
  colors: any;
  onBack: () => void;
  onShare: () => void;
}

export const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({
  styles,
  colors,
  onBack,
  onShare,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onBack}
        activeOpacity={0.6}
      >
        <BackIcon color={colors.primary} />
      </TouchableOpacity>
      
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onShare}
          activeOpacity={0.6}
        >
          <ShareIcon color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};