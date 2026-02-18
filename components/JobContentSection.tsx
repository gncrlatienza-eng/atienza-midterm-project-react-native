import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemedContext';
import { createJobContentSectionStyles } from '../styles/JobContentSection';
import Svg, { Circle, Path } from 'react-native-svg';

interface JobContentSectionProps {
  title: string;
  content?: string;
  listItems?: string[];
  styles?: any; // For backward compatibility, but not used anymore
  colors?: any; // For backward compatibility, but not used anymore
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
}) => {
  const { colors } = useTheme();
  const styles = createJobContentSectionStyles(colors);

  // Don't render if no content
  if (!content && (!listItems || listItems.length === 0)) {
    return null;
  }

  // Determine icon based on section title
  const isBenefitsSection = title.toLowerCase().includes('benefit') || 
                            title.toLowerCase().includes('perk');
  
  const iconColor = colors.primary;
  const benefitColor = '#FF9500'; // Orange/gold for benefits

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      {/* Render text content in a card if provided */}
      {content && (
        <View style={styles.contentCard}>
          <Text style={styles.descriptionText}>
            {cleanHTMLText(content)}
          </Text>
        </View>
      )}
      
      {/* Render list items with SVG icons if provided */}
      {listItems && listItems.length > 0 && (
        <View style={styles.listContainer}>
          {listItems.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.iconContainer}>
                {isBenefitsSection ? (
                  <StarIcon color={benefitColor} />
                ) : (
                  <CheckIcon color={iconColor} />
                )}
              </View>
              <Text style={styles.listText}>
                {cleanHTMLText(item)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};