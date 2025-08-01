import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Colors } from '@/constants/Colors';

interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
  style?: any;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showSeeAll = true,
  onSeeAllPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {showSeeAll && (
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
          <Icon 
            name="chevron-right" 
            size={16} 
            color={Colors.tint} 
            style={styles.chevron}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.background,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: 4,
  },
});

export default SectionHeader;