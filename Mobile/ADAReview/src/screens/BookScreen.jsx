import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MenuBar from '../Navigation/MenuBar';
import { useFonts } from 'expo-font';

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
        <Text style={styles.date}>{book.date}</Text>
        {/* Ajoutez d'autres propriétés du livre selon vos besoins */}
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E5E5',
    flex: 1,
    padding: 20,
  },
  image: {
    width: 180,
    height: 300,
    marginRight: 10,
  },
  icon: {
    marginTop: 20, // Ajustez la marge pour placer le bouton légèrement moins haut
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200, // Ajustez la marge pour placer les informations du livre un peu plus haut
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  author: {
    fontSize: 20,
    marginTop: 5,
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    color: '#808080',
  },
});

export default BookScreen;
