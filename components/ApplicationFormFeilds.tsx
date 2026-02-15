import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface FormData {
  name: string;
  email: string;
  phone: string;
  whyHireYou: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  whyHireYou: string;
}

interface ApplicationFormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  colors: any;
  styles: any;
  onFormDataChange: (field: keyof FormData, value: string) => void;
  onErrorClear: (field: keyof FormErrors) => void;
}

export const ApplicationFormFields: React.FC<ApplicationFormFieldsProps> = ({
  formData,
  errors,
  isSubmitting,
  colors,
  styles,
  onFormDataChange,
  onErrorClear,
}) => {
  return (
    <>
      {/* Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="Enter your full name"
          placeholderTextColor={colors.textTertiary}
          value={formData.name}
          onChangeText={(text) => {
            onFormDataChange('name', text);
            if (errors.name) onErrorClear('name');
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
            onFormDataChange('email', text);
            if (errors.email) onErrorClear('email');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isSubmitting}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      {/* Phone Field - Philippine Format */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Contact Number *</Text>
        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : null]}
          placeholder="+63 (9XX) XXX-XXXX"
          placeholderTextColor={colors.textTertiary}
          value={formData.phone}
          onChangeText={(text) => {
            onFormDataChange('phone', text);
            if (errors.phone) onErrorClear('phone');
          }}
          keyboardType="phone-pad"
          editable={!isSubmitting}
        />
        <Text style={styles.hintText}>Philippine mobile number format</Text>
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
            onFormDataChange('whyHireYou', text);
            if (errors.whyHireYou) onErrorClear('whyHireYou');
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
    </>
  );
};