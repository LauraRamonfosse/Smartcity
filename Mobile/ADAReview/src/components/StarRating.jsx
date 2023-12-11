
// StarRating.js
import React from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';

function Rating({ rating, onRatingChange, disabled = true, starSize = 17}) {
  const totalStars = 5;
  const spaceBetweenStars = 2;

  const totalSize = totalStars * starSize + (totalStars - 1) * spaceBetweenStars;

  return (
    <View style={{ paddingRight: 5 }}>
      <StarRating
        disabled={disabled}
        maxStars={5}
        rating={rating}
        starSize={starSize}
        fullStarColor={"#FFD700"}  // Changer la couleur des étoiles sélectionnées
        containerStyle={{ width: totalSize }}
        selectedStar={onRatingChange}
      />
    </View>
  );
}

export default Rating;

