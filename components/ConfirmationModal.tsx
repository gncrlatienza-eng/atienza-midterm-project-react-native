import { Alert } from 'react-native';

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}

export const showConfirmationModal = ({
  title,
  message,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
}: ConfirmationModalProps) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: confirmText,
        style: destructive ? 'destructive' : 'default',
        onPress: onConfirm,
      },
    ]
  );
};

export const showSaveJobModal = (jobTitle: string, onConfirm: () => void) => {
  showConfirmationModal({
    title: 'Save this job?',
    message: `Save ${jobTitle} to your saved jobs?`,
    confirmText: 'Save',
    onConfirm,
  });
};

export const showRemoveJobModal = (jobTitle: string, onConfirm: () => void) => {
  showConfirmationModal({
    title: 'Remove from saved?',
    message: `Remove ${jobTitle} from your saved jobs?`,
    confirmText: 'Remove',
    onConfirm,
    destructive: true,
  });
};

export const showApplyJobModal = (jobTitle: string, companyName: string, onConfirm: () => void) => {
  showConfirmationModal({
    title: 'Apply for this job?',
    message: `You're about to apply for ${jobTitle} at ${companyName}`,
    confirmText: 'Apply',
    onConfirm,
  });
};

export const showCancelApplicationModal = (jobTitle: string, onConfirm: () => void) => {
  showConfirmationModal({
    title: 'Cancel Application',
    message: `Are you sure you want to cancel your application for ${jobTitle}?`,
    confirmText: 'Yes, Cancel',
    cancelText: 'No',
    destructive: true,
    onConfirm,
  });
};

export const showSuccessAlert = (title: string, message: string) => {
  Alert.alert(title, message, [{ text: 'OK' }], { cancelable: true });
};

export const showErrorAlert = (message: string) => {
  Alert.alert('Error', message, [{ text: 'OK' }]);
};

export const showComingSoonAlert = () => {
  Alert.alert('Coming Soon', 'Application form will be available soon!');
};