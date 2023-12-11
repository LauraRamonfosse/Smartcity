// ProfileScreen.js

import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import Item from '../components/Item';
import ReviewCard from '../components/ReviewCard';
import { useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import BackButton from '../components/BackButton';

function ProfileScreen() {
  const route = useRoute();
  const [selectedId, setSelectedId] = useState();
  const { account } = route.params;
  const navigation = useNavigation();
  const reviews = [
    {
      id: 1,
      id_book: '978-1885-77-414',
      image: require('./images/sasuke.jpg'),
      title: 'On vit vraiment dans une saucisse',
      username: 'Xx_DarkSasuke_xX',
      rating: 4.5,
      likes: 100,
      dislikes: 200
    },
    {
      id: 2,
      id_book: '977-1885-77-414',
      image: require('./images/sasuke.jpg'),
      title: 'On vit vraiment dans une saucisse',
      username: 'Xx_DarkSasuke_xX',
      rating: 3,
      likes: 200,
      dislikes: 200
    },
    {
      id: 3,
      id_book: '976-1885-77-414',
      image: require('./images/sasuke.jpg'),
      title: 'On vit vraiment dans une saucisse',
      username: 'Xx_DarkSasuke_xX',
      rating: 1.5,
      likes: 300,
      dislikes: 200
    },
  ];

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onPress={() => {
        navigation.push('Review', { review: item });
        setSelectedId(item.id);
      }}
      isSelected={item.id === selectedId}
      cardComponent={ReviewCard}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topContainer}>
        <BackButton navigation={navigation} color={'white'} />
        <View style={styles.profileContainer}>
          <Image
            source={account.image}
            style={styles.profileImage}
          />
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>{account.username}</Text>
            <Text style={styles.rating}>{account.nbRatings} critique(s)</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0EC',
  },
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#354F52',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoContainer: {
    marginLeft: 10,
  },
  profileImage: {
    marginLeft : 20,
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 20,
    color: 'white',
  },
  ratingText: {
    fontSize: 20,
    color: 'white',
  },
  bottomContainer: {
    flex: 1,
    padding: 20,
  },
});

export default ProfileScreen;
