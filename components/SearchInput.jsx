import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery, isSavedVideo, setInputVal }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-gray-500 text-base mt-0.5 flex-1 font-pregular"
        value={query}
        placeholder={"Search your accomodation..."}
        placeholderTextColor="#343453"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert("Mising Query", "Please input something to search results across database");
          if (isSavedVideo) {
            setInputVal(query);
          } else {
            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.magnifyingGlass} className="w-8 h-8" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
