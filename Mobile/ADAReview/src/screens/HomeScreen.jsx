// Home.js
import React, { useState } from 'react';
import { FlatList, SafeAreaView} from 'react-native';
import BookItem from '../components/BookItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/styles';

function HomeScreen() {
  const [selectedId, setSelectedId] = useState();
  const navigation = useNavigation();
  const books = [
    {
      isbn: '978-1885-77-414',
      title: '1984',
      author: 'George Orwell',
      date: '1984',
      image: require('./images/test.jpg'),
      rating: 4.5,
    },
    {
      isbn: '977-1885-77-414',
      title: 'Animal Farm',
      author: 'George Orwell',
      date: '1945',
      image: require('./images/test1.jpg'),
      rating: 3,
    },
    {
      isbn: '976-1885-77-414',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      date: '1932',
      image: require('./images/test2.jpg'),
      rating: 4,
    },
  ];
  
  const renderItem = ({ item }) => (
    <BookItem
      item={item}
      onPress={() => {
        // Naviguez vers l'écran 'Book' avec les informations du livre sélectionné
        navigation.push('Book', { book: item });
        setSelectedId(item.isbn);
      }}
      isSelected={item.isbn === selectedId}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
