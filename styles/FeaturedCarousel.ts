import { StyleSheet } from 'react-native';

export const createFeaturedCarouselStyles = () =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      gap: 6,
    },
    dot: {
      height: 6,
      borderRadius: 3,
    },
    dotInactive: {
      width: 6,
      backgroundColor: '#D1D1D6',
      opacity: 0.4,
    },
    dotActive: {
      width: 24,
      backgroundColor: '#007AFF',
      opacity: 1,
    },
  });