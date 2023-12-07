// BookDetails.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import Rating from './StarRating';
import { styles } from '../styles/styles'; // Importez les styles partagés

const BookDetails = ({ item, textColor }) => (
  <View style={styles.detailsContainer}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
      <Text style={[styles.text, { color: textColor }]}>{item.author}</Text>
      <Text style={[styles.text, { color: textColor }]}>{item.date}</Text>
      <Rating rating={item.rating} />
    </View>
  </View>
);

export default BookDetails;
