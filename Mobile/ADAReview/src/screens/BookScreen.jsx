import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Rating from '../components/StarRating';

const BookScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { book } = route.params;
  

  return (<>
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-sharp" size={30} color="#354F52" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image source={book.image} style={styles.image} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.info}>Roman {book.genre}</Text>
        <Text style={styles.info}>Illustré par {book.illustrator}</Text>
        <Text style={styles.info}>Edité par {book.publishing_house},</Text>
        <Text style={styles.info}>{book.country}</Text>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Rating rating={book.rating}/>
          <Text style = {styles.info}>({book.nbRatings})</Text>
        </View>
        {/* Ajoutez d'autres propriétés du livre selon vos besoins */}
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    flex: 1,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  icon: {
    marginTop: 20, // Ajustez la marge pour placer le bouton légèrement moins haut
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  content: {
    alignItems : 'center',
    marginBottom: 200, // Ajustez la marge pour placer les informations du livre un peu plus haut
  },
  title: {
    fontSize: 32,
    fontWeight:'800',
    marginTop: 10,
    marginBottom : 10,
    color : '#354F52'
  },
  info: {
    textAlign: 'center',
    fontSize : 16,
    marginTop : 5,
    marginBottom :10,
    color : '#000',
    fontWeight : '400'
  },
  author: {
    fontSize: 20,
    marginBottom : 10,
    color : '#000',
    fontWeight:'800'
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    color: '#808080',
  },
});

export default BookScreen;
