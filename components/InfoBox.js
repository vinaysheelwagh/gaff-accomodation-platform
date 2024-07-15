import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subTitle, containerStyles, titleStyle }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-center font-psemibold text-gray-800 ${titleStyle}`}>{title}</Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">{subTitle}</Text>
    </View>
  );
};

export default InfoBox;
