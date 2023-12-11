import React from "react";
import { View, TouchableOpacity } from "react-native";
import AccountCard from "../components/AccountCard";
import BookCard from "../components/BookCard";

const SearchItem = ({ item, searchType, onPress, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        {searchType === "accounts" && <AccountCard item={item} textColor={textColor} />}
        {searchType === "books" && <BookCard item={item} textColor={textColor} />}
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
