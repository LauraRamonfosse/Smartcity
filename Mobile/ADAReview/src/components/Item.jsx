// BookItem.js
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés

function Item ({ item, onPress, isSelected, cardComponent }){
  const backgroundColor = isSelected ? '#354F52' : 'white';
  const textColor = isSelected ? '#FFFFFF' : '#000000';

  return (
    <TouchableOpacity onPress={onPress} style={[cardStyle.item, { backgroundColor }]}>
      {React.createElement(cardComponent, { item, textColor })}
    </TouchableOpacity>
  );

}
export default Item;
