// Home.js
import React, { useState, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View} from 'react-native';
import Item from '../components/Item';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { cardStyle } from '../styles/styles';
import BookCard from '../components/BookCard';

function HomeScreen() {
  const [selectedId, setSelectedId] = useState();
  const navigation = useNavigation();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const books = [
    {
      isbn: '978-1885-77-414',
      title: '1984',
      author: 'George Orwell',
      date: '1984',
      image: require('./images/test.jpg'),
      rating: 4.5,
      genre: 'Roman dystopique',
      illustrator : 'Georges Rohner',
      publishing_house : 'machin',
      country : 'United Kingdom',
      description : 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.',
      nbRatings : 40
    },
    {
      isbn: '977-1885-77-414',
      title: 'Animal Farm',
      author: 'George Orwell',
      date: '1945',
      image: require('./images/test1.jpg'),
      rating: 3,
      genre: 'Roman science-fiction',
      illustrator : 'Georges Rohner',
      publishing_house : 'machin',
      country : 'United Kingdom',
      description : 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.',
      nbRatings : 60
    },
    {
      isbn: '976-1885-77-414',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      date: '1932',
      image: require('./images/test2.jpg'),
      rating: 4,
      genre: 'Roman dystopique',
      illustrator : 'Georges Rohner',
      publishing_house : 'machin',
      country : 'United Kingdom',
      description : 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.',
      nbRatings : 20
    },
  ];
  
    // Utiliser useFocusEffect pour réactiver le bouton lorsque l'écran est en focus
  useFocusEffect(
      useCallback(() => {
        // Réactiver le bouton lorsqu'on revient à cet écran
        setButtonDisabled(false);
      }, [])
    );
    const handlePress = (item) => {
      // Vérifier si le bouton est désactivé
      if (!isButtonDisabled) {
        // Désactiver le bouton après le press
        setButtonDisabled(true);
  
        // Naviguer vers l'écran 'Book' avec les informations du livre sélectionné
        navigation.push('Book', { book: item });
  
        // Mettre à jour l'ID de l'élément sélectionné
        setSelectedId(item.isbn);
      }
    };
  
    // Fonction pour le rendu de chaque élément de la liste
    const renderItem = ({ item }) => (
      <Item
        item={item}
        onPress={() => handlePress(item)}
        isSelected={item.isbn === selectedId}
        cardComponent={BookCard}
      />
    );

  return (
    <>
    <View style={{ backgroundColor: '#354F52', alignItems: 'center', justifyContent: 'center', paddingTop : 40, paddingBottom : 10 }}>
    <Text style={{ color: 'white', fontSize: 28, fontWeight: '800'}}>Oeuvres du moment</Text>
  </View>
    <SafeAreaView style={{ ...cardStyle.container, backgroundColor: '#F0F0EC' }}>
      {/* Ajoutez un en-tête centré avec la couleur de fond et le texte souhaités */}

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn}
        extraData={selectedId}
      />
    </SafeAreaView>
    </>
  );
}


export default HomeScreen;
