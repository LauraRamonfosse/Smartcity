// BookDetails.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import Rating from './StarRating';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés

const BookCard = ({ item, textColor }) => (
  <View style={cardStyle.detailsContainer}>
    <Image source={item.image} style={cardStyle.bookImage} />
    <View style={cardStyle.textContainer}>
      <Text style={[cardStyle.title, { color: textColor }]}>{item.title}</Text>
      <Text style={[cardStyle.text, { color: textColor }]}>{item.author}</Text>
      <Text style={[cardStyle.text, { color: textColor }]}>{item.date}</Text>
      <Rating rating={item.rating} />
    </View>
  </View>
);

export default BookCard;
