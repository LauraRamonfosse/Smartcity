import React from "react";
import { View, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";

function SearchBar({ searchText, onSearchTextChange, onSearchTypeChange, searchType }) {
  const handleSearchTypeChange = (type) => {
    // Réinitialise le texte lors du changement de type de recherche
    onSearchTextChange("");
    onSearchTypeChange(type);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, paddingTop: 10 }}>
      <TextInput
        placeholder="Entrez votre recherche"
        value={searchText}
        onChangeText={(text) => onSearchTextChange(text)}
        style={{
          backgroundColor: "#FFF",
          paddingLeft: 10,
          width: '80%',
          height: '100%',
          shadowColor: "black",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,  // Pour l'effet de box-shadow sur Android
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <Button
          icon={<Icon name="book" type="font-awesome" color={searchType === "books" ? "#FFFFFF" : "black"} />}
          onPress={() => handleSearchTypeChange("books")}
          type={searchType === "books" ? "solid" : "clear"}
          buttonStyle={{ backgroundColor: searchType === "books" ? "#354F52" : "transparent" }}
        />

        <Button
          icon={<Icon name="user" type="font-awesome" color={searchType === "accounts" ? "#FFFFFF" : "black"} />}
          onPress={() => handleSearchTypeChange("accounts")}
          type={searchType === "accounts" ? "solid" : "clear"}
          buttonStyle={{ backgroundColor: searchType === "accounts" ? "#354F52" : "transparent" }}
        />
      </View>
    </View>
  );
}

export default SearchBar;
