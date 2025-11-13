import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  stars,
  maxStars = 3,
  size = 40,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <Text key={index} style={[styles.star, { fontSize: size }]}>
          {index < stars ? '⭐' : '☆'}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
});
