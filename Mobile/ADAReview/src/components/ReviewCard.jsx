import React from 'react';
import { View, Image, Text } from 'react-native';
import Rating from './StarRating';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés

const ReviewCard = ({ item, textColor }) => (
  <View style={cardStyle.detailsContainer}>
    <Image source={item.image} style={cardStyle.reviewImage} />
    <View style={cardStyle.textContainer}>
      <Text style={[cardStyle.reviewTitle, { color: textColor }]}>{item.title}</Text>
      <Text style={[cardStyle.username, { color: textColor }]}>{item.username}</Text>
      <Rating rating={item.rating} />
      <View style={cardStyle.likeDislikeContainer}>
        <Text style={cardStyle.likeButton}>👍</Text>
        <Text style={cardStyle.voteCount}>{item.likes - item.dislikes}</Text>
        <Text style={cardStyle.dislikeButton}>👎</Text>
      </View>
    </View>

  </View>
);
export default ReviewCard;