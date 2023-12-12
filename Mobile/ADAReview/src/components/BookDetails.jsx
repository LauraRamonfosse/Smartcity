// BookDetails.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';

const BookDetails = ({ item, textColor }) => (
  <View style={styles.detailsContainer}>
    <Image source={{uri:item.image}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
      <Text style={[styles.text, { color: textColor }]}>{item.author}</Text>
      <Text style={[styles.text, { color: textColor }]}>{item.date}</Text>
      <AirbnbRating showRating={false} size={20} defaultRating={item.rating} />
    </View>
  </View>
);

export default BookDetails;
