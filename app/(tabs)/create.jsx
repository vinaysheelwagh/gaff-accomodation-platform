import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: null,
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    price: 0,
  });

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0] });
    }
  };

  const submit = async () => {
    if (!form.title || !form.startDate | !form.endDate || !form.price || !form.location) {
      return Alert.alert("Please fill in all the fields");
    }
    setUploading(true);
    try {
      await createPost({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({ title: "", image: null, description: "", startDate: "", endDate: "", location: "", price: 0 });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-5">
        <Text className="text-2xl text-gray-800 font-psemibold">Create Accomodation Post</Text>
        <FormField
          title="Post Title"
          value={form.title}
          placeholder="Give your post a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-5"
        />
        <View className="mt-4 space-y-2">
          <Text className="text-base text-gray-500 font-pmedium">Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image source={{ uri: form.image.uri }} resizeMode="cover" className="w-full h-64 rounded-2xl" />
            ) : (
              <View className="w-full h-16 px-4 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                <Text className="text-sm text-gray-400 font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="Description"
          value={form.description}
          placeholder="Describe your stay here..."
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-4"
        />
        <View className="mt-4 flex-row justify-between items-start">
          <FormField
            title="Start Date"
            value={form.startDate}
            placeholder="Type is start date"
            handleChangeText={(e) => setForm({ ...form, startDate: e })}
            otherStyles="w-[48%] "
          />
          <View className="w[4%]"></View>
          <FormField
            title="End Date"
            value={form.endDate}
            placeholder="Type in end date"
            handleChangeText={(e) => setForm({ ...form, endDate: e })}
            otherStyles="w-[48%]"
          />
        </View>
        <FormField
          title="Location"
          value={form.location}
          placeholder="Type in location"
          handleChangeText={(e) => setForm({ ...form, location: e })}
          otherStyles="mt-4"
        />
        <FormField
          title="Price / Night"
          value={form.price}
          placeholder="Type in price"
          handleChangeText={(e) => setForm({ ...form, price: parseInt(e) })}
          otherStyles="mt-4"
        />
        <CustomButton title="Submit & Publish" handlePress={submit} containerStyles="mt-7" isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
