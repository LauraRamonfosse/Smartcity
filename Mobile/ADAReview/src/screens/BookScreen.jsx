import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView,SafeAreaView,FlatList } from 'react-native';
import { useState } from 'react';
import Item from '../components/Item';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Rating from '../components/StarRating';
import { bookDetailsstyles } from '../styles/styles';
import ReviewCard from '../components/ReviewCard';
import BackButton from '../components/BackButton';

const BookScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {book} = route.params;
  const [selectedId, setSelectedId] = useState();
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const reviews = [
    {
      id : 1,
      id_book: '978-1885-77-414',
      image : require('./images/sasuke.jpg'),
      title : 'On vit vraiment dans une saucisse',
      username : 'Xx_DarkSasuke_xX',
      rating : 4.5,
      likes : 100,
      dislikes : 200
    },
    {
      id : 2,
      id_book: '977-1885-77-414',
      image : require('./images/sasuke.jpg'),
      title : 'On vit vraiment dans une saucisse',
      username : 'Xx_DarkSasuke_xX',
      rating : 3,
      likes : 200,
      dislikes : 200
    },
    {
      id : 3,
      id_book: '976-1885-77-414',
      image : require('./images/sasuke.jpg'),
      title : 'On vit vraiment dans une saucisse',
      username : 'Xx_DarkSasuke_xX',
      rating : 1.5,
      likes : 300,
      dislikes : 200
    },
  ];
  
  const renderItem = ({item}) => (
    <Item
      item={item}
      onPress={() => {
        // Naviguez vers l'écran 'Book' avec les informations du livre sélectionné
        navigation.push('Review', { review: item });
        setSelectedId(item.id);
      }}
      isSelected={item.id === selectedId}
      cardComponent={ReviewCard}
    />
  );
  
  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <SafeAreaView style={bookDetailsstyles.container}>
      <BackButton navigation={navigation} color={'#354F52'}/> 
    <FlatList
      ListHeaderComponent={
        <>
          <View style={bookDetailsstyles.content}>
            <Image source={book.image} style={bookDetailsstyles.image} />
            <Text style={bookDetailsstyles.title}>{book.title}</Text>
            <Text style={bookDetailsstyles.author}>{book.author}</Text>
            <Text style={bookDetailsstyles.info}>{book.genre}</Text>
            <Text style={bookDetailsstyles.info}>Illustré par {book.illustrator}</Text>
            <Text style={bookDetailsstyles.info}>Edité par {book.publishing_house},</Text>
            <Text style={bookDetailsstyles.info}>{book.country}</Text>
            <View style={bookDetailsstyles.ratingContainer}>
              <Rating rating={book.rating} />
              <Text style={bookDetailsstyles.rating}>({book.nbRatings} ratings)</Text>
            </View>
            <View style={bookDetailsstyles.summaryContainer}>
                <TouchableOpacity onPress={toggleDescriptionVisibility}>
                  <Text style={bookDetailsstyles.summaryTitle}>Description <Icon
                    name={isDescriptionVisible ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#354F52"
                  /></Text>
                  
                </TouchableOpacity>
                {isDescriptionVisible && (
                  <Text style={bookDetailsstyles.summaryText}>{book.description}</Text>
                )}
              </View>
            <View style={bookDetailsstyles.reviewContainer}>
              <TouchableOpacity style={bookDetailsstyles.addButton} onPress={() => navigation.push("ReviewForm", {book : book})}>
                <Text style={bookDetailsstyles.addText}>Nouvelle critique +</Text>
              </TouchableOpacity>
            </View>

            
          </View>
          
        </>
      }
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
     </SafeAreaView>
  );
};



export default BookScreen;