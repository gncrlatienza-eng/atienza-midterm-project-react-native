import React from 'react';
import { View, Text } from 'react-native';

interface JobContentSectionProps {
  title: string;
  content?: string;
  listItems?: string[];
  styles: any;
}

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
}) => {
  // Don't render if no content
  if (!content && (!listItems || listItems.length === 0)) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      {/* Render text content if provided */}
      {content && (
        <Text style={styles.descriptionText}>{cleanHTMLText(content)}</Text>
      )}
      
      {/* Render list items if provided */}
      {listItems && listItems.length > 0 && (
        <View style={styles.listContainer}>
          {listItems.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletDot} />
              <Text style={styles.listText}>{cleanHTMLText(item)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};