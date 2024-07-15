import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import AccomodationCard from "../../components/AccomodationCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import Popular from "../../components/Popular";

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    await refetch();
    setrefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <AccomodationCard accomodationItem={item} refetchAllPosts={refetch} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row items-center mb-6">
              <View className="mr-4 w-12 h-12 border border-secondary rounded-full justify-center items-center">
                <Image className="w-[90%] h-[90%] rounded-full" source={{ uri: user?.avatar }} resizeMode="contain" />
              </View>
              <View>
                <Text className="font-pmedium text-sm text-gray-500">Welcome Back,</Text>
                <Text className="text-xl font-psemibold text-gray-800">{user?.name}</Text>
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1">
              <Text className="text-gray-500 text-lg font-pregular mb-3">Popular Stays 🔥</Text>
              <Popular posts={latestPosts ?? []} />
            </View>
            <View className="w-full flex-1">
              <Text className="text-gray-500 text-lg font-pregular">Nearby Stays</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Posts Found" subtitle="Be the first one to upload a post" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
