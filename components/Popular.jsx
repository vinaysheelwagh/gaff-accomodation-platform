import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native";
import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const PopularItem = ({ activeItem, item }) => {
  const {
    title,
    image,
    location,
    price,
    startDate,
    endDate,
    creator: { name, avatar },
    likedBy,
  } = item;
  return (
    <Animatable.View className="mr-1" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      <View className="flex-col items-center px-1">
        <View className="w-full rounded-xl border border-gray-300 bg-white shadow-md">
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}} className="w-full h-40 rounded-t-xl relative">
            <Image source={{ uri: image }} className="w-full h-full rounded-t-xl" resizeMode="cover" />
            <View className="absolute top-2 left-2 bg-gray-800 bg-opacity-75 px-2 py-1 rounded-lg">
              <Text className="text-white text-xs">€{price}/Day</Text>
            </View>
          </TouchableOpacity>
          <View className="p-3">
            <Text className="text-black font-semibold text-lg" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-500 text-sm" numberOfLines={1}>
              {location}
            </Text>
            <View className="flex-row items-center mt-2">
              <View className="flex-row items-center mr-4">
                <Text className="text-gray-600 text-sm">
                  {startDate} - {endDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
};

const Popular = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <PopularItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Popular;
