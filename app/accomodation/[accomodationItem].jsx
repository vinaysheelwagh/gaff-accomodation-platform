import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Accomodation = () => {
  const { accomodationItem } = useLocalSearchParams();
  const { data: post, refetch } = useAppwrite(() => getPost(accomodationItem));
  const {
    title,
    image,
    location,
    startDate,
    endDate,
    price,
    //creator: { name, avatar },
    description,
  } = post;

  const getAccomodationDetail = async () => {
    const details = await getPost(accomodationItem);
  };

  useEffect(() => {
    getAccomodationDetail();
  }, []);

  return (
    title &&
    image &&
    price && (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center h-full px-4">
            <View className="relative mt-5">
              <Text className="text-2xl text-secondary-200 text-center font-bold">{title}</Text>
              <Text className="text-lg text-gray-500 text-center font-bold m-2">{location}</Text>
              <Image source={{ uri: image }} className="w-80 h-80 rounded-xl" resizeMode="cover" />
            </View>
            <View className="flex-row items-center m-5">
              <Text className="text-gray-500 text-lg">{description}</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Text className="text-gray-500 text-sm font-psemibold">{startDate} - </Text>
              <Text className="text-gray-500 text-sm font-psemibold">{endDate}</Text>
            </View>
            <Text className="text-green-600 font-semibold text-base mt-2">€{price} / Night</Text>
            <CustomButton title="Book Now" handlePress={() => router.replace("/home")} containerStyles="w-[50%] mt-7" />
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    )
  );
};

export default Accomodation;
