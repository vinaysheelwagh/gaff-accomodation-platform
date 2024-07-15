import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";
import { updatePost } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";

const AccomodationCard = ({ accomodationItem, isBookmarksPage, refetchAllPosts }) => {
  const { user } = useGlobalContext();
  const {
    title,
    image,
    location,
    startDate,
    endDate,
    price,
    creator: { name, avatar },
    likedBy,
  } = accomodationItem;

  const savePost = async () => {
    await updatePost(
      { likedBy: likedBy.includes(user.$id) ? likedBy.filter((itm) => itm !== user.$id) : [...likedBy, user.$id] },
      accomodationItem.$id
    );
    await refetchAllPosts();
  };

  return (
    <View className="flex-col items-center px-4 mb-5">
      <View className="w-full flex-row items-start p-3 rounded-xl border border-gray-300 bg-white shadow-md">
        <TouchableOpacity onPress={() => router.push("/accomodation")}>
          <Image source={{ uri: image }} className="w-20 h-20 rounded-xl" resizeMode="cover" />
        </TouchableOpacity>
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-black font-semibold text-lg" numberOfLines={1}>
              {title}
            </Text>
            {!isBookmarksPage && (
              <TouchableOpacity onPress={savePost}>
                <Image
                  source={likedBy.includes(user?.$id) ? icons.heartRed : icons.heart}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-gray-500 text-sm" numberOfLines={1}>
            {location}
          </Text>
          <View className="flex-row items-center mt-1 justify-between">
            <View className="flex-row items-center">
              <Text className="text-gray-500 text-sm">{startDate} - </Text>
              <Text className="text-gray-500 text-sm">{endDate}</Text>
            </View>
            <Text className="text-green-600 font-semibold text-base  mr-2">€{price} / Night</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccomodationCard;
