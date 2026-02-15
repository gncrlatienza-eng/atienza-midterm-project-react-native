import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ApplicationFormFooterProps {
  styles: any;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const ApplicationFormFooter: React.FC<ApplicationFormFooterProps> = ({
  styles,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={onSubmit}
        disabled={isSubmitting}
        activeOpacity={0.7}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Application</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};