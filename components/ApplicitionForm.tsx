import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApplicationFormStyles } from '../styles/ApplicationFormScreen';
import { Job, JobApplication } from '../types/Job';
import { showSuccessAlert, showErrorAlert } from './ConfirmationModal';

const APPLICATIONS_KEY = '@job_applications';

interface ApplicationFormProps {
  visible: boolean;
  job: Job;
  fromSaved?: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  visible,
  job,
  fromSaved = false,
  onClose,
  onSuccess,
}) => {
  const { colors } = useTheme();
  const styles = createApplicationFormStyles(colors);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whyHireYou: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    whyHireYou: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      whyHireYou: '',
    };

    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid contact number';
      isValid = false;
    }

    // Validate why hire you
    if (!formData.whyHireYou.trim()) {
      newErrors.whyHireYou = 'This field is required';
      isValid = false;
    } else if (formData.whyHireYou.trim().length < 50) {
      newErrors.whyHireYou = 'Please write at least 50 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create application object
      const application: JobApplication = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        applicantName: formData.name.trim(),
        applicantEmail: formData.email.trim(),
        applicantPhone: formData.phone.trim(),
        whyHireYou: formData.whyHireYou.trim(),
        appliedAt: new Date().toISOString(),
      };

      // Save to AsyncStorage
      const applicationsJson = await AsyncStorage.getItem(APPLICATIONS_KEY);
      let applications: JobApplication[] = applicationsJson ? JSON.parse(applicationsJson) : [];
      applications.push(application);
      await AsyncStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        whyHireYou: '',
      });
      setErrors({
        name: '',
        email: '',
        phone: '',
        whyHireYou: '',
      });

      setIsSubmitting(false);

      // Show success message
      showSuccessAlert(
        'Application Submitted!',
        `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
        () => {
          onSuccess();
        }
      );
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
      showErrorAlert('Failed to submit application. Please try again.');
    }
  };

  const handleClose = () => {
    // Clear form data when closing
    setFormData({
      name: '',
      email: '',
      phone: '',
      whyHireYou: '',
    });
    setErrors({
      name: '',
      email: '',
      phone: '',
      whyHireYou: '',
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Apply for Job</Text>
            <View style={styles.cancelButton} />
          </View>

          {/* Job Info */}
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobCompany}>{job.company}</Text>
          </View>

          {/* Form */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Name Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[styles.input, errors.name ? styles.inputError : null]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textTertiary}
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text });
                  if (errors.name) {
                    setErrors({ ...errors, name: '' });
                  }
                }}
                autoCapitalize="words"
                editable={!isSubmitting}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="your.email@example.com"
                placeholderTextColor={colors.textTertiary}
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  if (errors.email) {
                    setErrors({ ...errors, email: '' });
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isSubmitting}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            {/* Phone Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Contact Number *</Text>
              <TextInput
                style={[styles.input, errors.phone ? styles.inputError : null]}
                placeholder="+1 (555) 123-4567"
                placeholderTextColor={colors.textTertiary}
                value={formData.phone}
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text });
                  if (errors.phone) {
                    setErrors({ ...errors, phone: '' });
                  }
                }}
                keyboardType="phone-pad"
                editable={!isSubmitting}
              />
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            </View>

            {/* Why Hire You Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Why should we hire you? *</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  errors.whyHireYou ? styles.inputError : null,
                ]}
                placeholder="Tell us why you're the perfect fit for this role..."
                placeholderTextColor={colors.textTertiary}
                value={formData.whyHireYou}
                onChangeText={(text) => {
                  setFormData({ ...formData, whyHireYou: text });
                  if (errors.whyHireYou) {
                    setErrors({ ...errors, whyHireYou: '' });
                  }
                }}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                editable={!isSubmitting}
              />
              <Text style={styles.characterCount}>
                {formData.whyHireYou.length} characters (minimum 50)
              </Text>
              {errors.whyHireYou ? (
                <Text style={styles.errorText}>{errors.whyHireYou}</Text>
              ) : null}
            </View>

            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Submit Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};