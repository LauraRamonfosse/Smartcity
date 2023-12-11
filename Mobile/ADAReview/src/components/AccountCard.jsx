import React from 'react';
import { View, Image, Text } from 'react-native';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés

const AccountCard = ({ item, textColor }) => (
  <View style={cardStyle.detailsContainer}>
    <Image source={item.image} style={cardStyle.accountImage} />
    <View style={cardStyle.textContainer}>
      <Text style={[cardStyle.author, {fontWeight :'800'}, { color: textColor }]}>{item.username}</Text>
      <Text style={[cardStyle.text, { color: textColor }]}>
        ({item.nbRatings} {item.nbRatings === 1 ? 'critique' : 'critiques'})
      </Text>
    </View>
  </View>
);

export default AccountCard;
