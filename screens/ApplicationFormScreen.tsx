import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApplicationFormStyles } from '../styles/ApplicationFormScreen';
import { Job, JobApplication } from '../types/Job';
import { showSuccessAlert, showErrorAlert } from '../components/ConfirmationModal';
import { ApplicationFormHeader } from '../components/ApplicationFormHeader';
import { ApplicationFormJobInfo } from '../components/ApplicationFormJobInfo';
import { ApplicationFormFields } from '../components/ApplicationFormFields';
import { ApplicationFormFooter } from '../components/ApplicationFormFooter';

const APPLICATIONS_KEY = '@job_applications';

interface ApplicationFormScreenProps {
  visible: boolean;
  job: Job;
  fromSaved?: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ApplicationFormScreen: React.FC<ApplicationFormScreenProps> = ({
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

  // Updated Philippine phone validation
  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Philippine mobile numbers:
    // - Start with +63 or 63 or 0
    // - Followed by 9 (mobile prefix)
    // - Total 10 digits after country code (9XXXXXXXXX)
    // Examples: +639171234567, 09171234567, 639171234567
    
    // Check if starts with +63
    if (phone.startsWith('+63')) {
      return digitsOnly.length === 12 && digitsOnly.startsWith('639');
    }
    // Check if starts with 63
    if (phone.startsWith('63')) {
      return digitsOnly.length === 12 && digitsOnly.startsWith('639');
    }
    // Check if starts with 0
    if (phone.startsWith('0')) {
      return digitsOnly.length === 11 && digitsOnly.startsWith('09');
    }
    
    return false;
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
      newErrors.phone = 'Please enter a valid Philippine mobile number (e.g., +63 917 XXX XXXX or 0917 XXX XXXX)';
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
        `Your application for ${job.title} at ${job.company} has been submitted successfully.`
      );
      
      // Call onSuccess after showing the alert
      onSuccess();
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

  const handleFormDataChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleErrorClear = (field: keyof typeof errors) => {
    setErrors({ ...errors, [field]: '' });
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
          <ApplicationFormHeader styles={styles} onClose={handleClose} />

          {/* Job Info with Logo */}
          <ApplicationFormJobInfo job={job} styles={styles} colors={colors} />

          {/* Form Fields */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <ApplicationFormFields
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              colors={colors}
              styles={styles}
              onFormDataChange={handleFormDataChange}
              onErrorClear={handleErrorClear}
            />
          </ScrollView>

          {/* Submit Button */}
          <ApplicationFormFooter
            styles={styles}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};