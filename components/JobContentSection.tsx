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

// Check icon for list items
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

  const iconColor = colors.primary;

  const cleanedContent = content ? cleanHTMLText(content) : '';
  const contentLines = cleanedContent
    ? cleanedContent.split('\n').map(l => l.trim()).filter(Boolean)
    : [];
  const bulletLines = contentLines
    .filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'))
    .map(l => l.replace(/^(•|\-|\*)\s*/, '').trim())
    .filter(Boolean);
  const nonBulletText = contentLines
    .filter(l => !(l.startsWith('•') || l.startsWith('-') || l.startsWith('*')))
    .join('\n\n')
    .trim();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      {content && (
        <View style={styles.contentCard}>
          <Text style={styles.contentLabel}>Description</Text>

          {bulletLines.length > 0 ? (
            <View style={styles.contentBullets}>
              {bulletLines.map((line, index) => (
                <View key={index} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{line}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.descriptionText}>
              {nonBulletText || cleanedContent}
            </Text>
          )}
        </View>
      )}
      
      {listItems && listItems.length > 0 && (
        <View style={styles.listCard}>
          <View style={styles.listContainer}>
            {listItems.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <CheckIcon color={iconColor} />
                </View>
                <Text style={styles.listText}>
                  {cleanHTMLText(item)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};