import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ApplicationFormHeaderProps {
  styles: any;
  onClose: () => void;
}

export const ApplicationFormHeader: React.FC<ApplicationFormHeaderProps> = ({
  styles,
  onClose,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Apply for Job</Text>
      <View style={styles.cancelButton} />
    </View>
  );
};