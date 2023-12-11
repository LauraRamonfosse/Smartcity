import React, { useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import SearchItem from "../components/SearchItem";
import { cardStyle } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

function SearchScreen() {
  const [searchType, setSearchType] = useState("accounts");
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const accounts = [
    {
      id: 1,
      image: require('./images/sasuke.jpg'),
      username: 'Xx_DarkSasuke_xX',
      nbRatings : 12
    },
    {
      id: 2,
      image: require('./images/sasuke.jpg'),
      username: 'Xx_DarkSasuke_xX',
      nbRatings : 0
    },
    {
      id: 3,
      image: require('./images/sasuke.jpg'),
      username: 'Xx_DarkSasuke_xX',
      nbRatings : 1
    }
  ];
  const books = [
    {
      isbn: '978-1885-77-414',
      title: '1984',
      author: 'George Orwell',
      date: '1984',
      image: require('./images/test.jpg'),
      rating: 4.5,
      genre: 'dystopique',
      illustrator: 'Georges Rohner',
      publishing_house: 'machin',
      country: 'United Kingdom',
      description: 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.',
      nbRatings: 40
    },
    {
      isbn: '977-1885-77-414',
      title: 'Animal Farm',
      author: 'George Orwell',
      date: '1945',
      image: require('./images/test1.jpg'),
      rating: 3,
      genre: 'dystopique',
      illustrator: 'Georges Rohner',
      publishing_house: 'machin',
      country: 'United Kingdom',
      description: 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.',
      nbRatings: 60
    },
    {
      isbn: '976-1885-77-414',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      date: '1932',
      image: require('./images/test2.jpg'),
      rating: 4,
      genre: 'dystopique',
      illustrator: 'Georges Rohner',
      publishing_house: 'machin',
      country: 'United Kingdom',
      description: 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.',
      nbRatings: 20
    },
  ];
  const ItemSeparator = () => (
    <View
      style={{
        height: 3,
        backgroundColor: "#CED0CE", // Couleur de la séparation
      }}
    />
  );
  const filteredResults = searchType === "accounts"
    ? accounts.filter(account => account.username.toLowerCase().includes(searchText.toLowerCase()))
    : books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <SafeAreaView style ={cardStyle.container}>
      {/* Utilisez le composant SearchBar avec les propriétés nécessaires */}
      <SearchBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSearchTypeChange={setSearchType}
        searchType={searchType}
      />

    <FlatList
      data={filteredResults}
      keyExtractor={(item) => (searchType === "accounts" ? item.id.toString() : item.isbn.toString())}
      renderItem={({ item }) => (
        <SearchItem
          item={item}
          searchType={searchType}
          onPress={() => {
            if (searchType === "accounts") {
              navigation.push('Profile', { account: item });
            } else {
              navigation.push('Book', { book: item });
            }
          }}
          textColor="black"
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />

    </SafeAreaView>
  );
}
export default SearchScreen;