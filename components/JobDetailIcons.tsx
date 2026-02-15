import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

// Back Arrow Icon
export const BackIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M19 12H5M12 19L5 12L12 5" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

// Share Icon (iOS style)
export const ShareIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

// Bookmark Icon
export const BookmarkIcon: React.FC<{ color: string; filled?: boolean }> = ({ color, filled = false }) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={filled ? color : 'none'}
    />
  </Svg>
);

// Location Pin Icon
export const LocationIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
      fill={color}
      opacity={0.7}
    />
  </Svg>
);

// Clock Icon
export const ClockIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" opacity={0.7} />
    <Path d="M12 7v5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.7} />
  </Svg>
);

// Money Icon
export const MoneyIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      opacity={0.7}
    />
  </Svg>
);