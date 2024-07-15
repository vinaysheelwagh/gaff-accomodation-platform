import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

const Accomodation = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center">
              GA<Text className="text-secondary">FF.</Text>
            </Text>
            {/* <Text className="text-lg text-secondary-200 text-center font-bold py-2">
              Very easy way to book accomodation
            </Text> */}
          </View>
          <CustomButton title="Book Now" handlePress={() => router.replace("/home")} containerStyles="w-[50%] mt-7" />
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Accomodation;
