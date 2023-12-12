// BookItem.js
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/styles'; // Importez les styles partagés
import BookDetails from './BookDetails';

const BookItem = ({ item, onPress, isSelected }) => {
  const backgroundColor = isSelected ? '#354F52' : 'white';
  const textColor = isSelected ? '#FFFFFF' : '#000000';
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <BookDetails item={item} textColor={textColor} />
    </TouchableOpacity>
  );
};

export default BookItem;
