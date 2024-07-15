import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setform] = useState({ name: "", email: "", password: "", phone: "" });
  const [isSubmitting, setisSubmitting] = useState(false);
  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.name, form.phone);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-3xl font-bold">
            GA<Text className="text-secondary">FF</Text>
          </Text>
          <Text className="text-2xl text-gray-800 text-semibold mt-5 font-psemibold">Sign Up to Gaff</Text>
          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setform({ ...form, name: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Phone"
            value={form.phone}
            handleChangeText={(e) => setform({ ...form, phone: e })}
            otherStyles="mt-7"
          />
          <CustomButton title={"Sign Up"} handlePress={submit} containerStyles={"mt-7"} isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-500 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
