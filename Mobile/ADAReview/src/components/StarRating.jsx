// StarRating.js
import React from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';

function Rating({ rating }) {
  const totalStars = 5;
  const starSize = 17;
  const spaceBetweenStars = 2;

  const totalSize = totalStars * starSize + (totalStars - 1) * spaceBetweenStars;

  return (
    <View>
      <StarRating
        disabled
        maxStars={5}
        rating={rating}
        starSize={starSize}
        fullStarColor="#FFD700"
        containerStyle={{ width: totalSize }}
      />
    </View>
  );
}

export default Rating;
