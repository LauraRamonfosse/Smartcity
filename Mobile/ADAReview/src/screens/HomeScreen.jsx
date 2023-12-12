// Home.js
import React, { useEffect, useState } from 'react';
import { FlatList, View} from 'react-native';
import BookItem from '../components/BookItem';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../store/bookSlice';
import { fetchBookData } from '../store/dataBaseLoader';

function HomeScreen() {
  const [selectedId, setSelectedId] = useState('');
  const navigation = useNavigation();
  const [booksList,setBooksList] = useSelector((state) => state.books.books);
  const dispatch = useDispatch();

  useEffect(() => {
    //fetchBookData(dispatch);
  },[])
  
  return (
    <View style={styles.container}>
      <FlatList
        data={booksList}
        renderItem={({item}) => (<BookItem item={item} isSelected={item.isbn === selectedId} onPress={() => setSelectedId(item.isbn)}/>)}
        keyExtractor={(item) => item.isbn}
      />
    </View>
  );
}

export default HomeScreen;
