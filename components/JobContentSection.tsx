import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface JobContentSectionProps {
  title: string;
  content?: string;
  listItems?: string[];
  styles: any;
  colors?: any;
}

// Check icon for requirements
const CheckIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} opacity="0.15" />
    <Path 
      d="M9 12L11 14L15 10" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

// Star icon for benefits
const StarIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={color} opacity="0.12" />
    <Path 
      d="M12 6L13.545 9.13L17 9.635L14.5 12.07L15.09 15.51L12 13.885L8.91 15.51L9.5 12.07L7 9.635L10.455 9.13L12 6Z" 
      fill={color}
      opacity="0.85"
    />
  </Svg>
);

// Helper function to clean HTML tags and format text
const cleanHTMLText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/<h3>/gi, '\n')
    .replace(/<\/h3>/gi, '\n')
    .replace(/<ul>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<strong>/gi, '')
    .replace(/<\/strong>/gi, '')
    .replace(/<em>/gi, '')
    .replace(/<\/em>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/\n\n+/g, '\n\n')
    .trim();
};

export const JobContentSection: React.FC<JobContentSectionProps> = ({
  title,
  content,
  listItems,
  styles,
  colors,
}) => {
  // Don't render if no content
  if (!content && (!listItems || listItems.length === 0)) {
    return null;
  }

  // Determine icon based on section title
  const isBenefitsSection = title.toLowerCase().includes('benefit') || 
                            title.toLowerCase().includes('perk');
  
  const iconColor = colors?.primary || '#007AFF';
  const benefitColor = '#FF9500'; // Orange/gold for benefits

  const enhancedStyles = StyleSheet.create({
    section: {
      marginBottom: 32,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors?.text || '#000',
      marginBottom: 16,
      letterSpacing: 0.35,
    },
    contentCard: {
      backgroundColor: colors?.backgroundSecondary || '#F2F2F7',
      borderRadius: 16,
      padding: 18,
      marginBottom: 8,
    },
    descriptionText: {
      fontSize: 15,
      lineHeight: 22,
      color: colors?.text || '#000',
      fontWeight: '400',
    },
    listContainer: {
      gap: 14,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    iconContainer: {
      marginTop: 1,
    },
    listText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 22,
      color: colors?.text || '#000',
      fontWeight: '400',
    },
  });

  return (
    <View style={enhancedStyles.section}>
      <Text style={enhancedStyles.sectionTitle}>{title}</Text>
      
      {/* Render text content in a card if provided */}
      {content && (
        <View style={enhancedStyles.contentCard}>
          <Text style={enhancedStyles.descriptionText}>
            {cleanHTMLText(content)}
          </Text>
        </View>
      )}
      
      {/* Render list items with SVG icons if provided */}
      {listItems && listItems.length > 0 && (
        <View style={enhancedStyles.listContainer}>
          {listItems.map((item, index) => (
            <View key={index} style={enhancedStyles.listItem}>
              <View style={enhancedStyles.iconContainer}>
                {isBenefitsSection ? (
                  <StarIcon color={benefitColor} />
                ) : (
                  <CheckIcon color={iconColor} />
                )}
              </View>
              <Text style={enhancedStyles.listText}>
                {cleanHTMLText(item)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};