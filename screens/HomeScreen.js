import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`
      )
      .then((data) => {
        setFeaturedCategory(data);
      });
  }, []);
  return (
    <SafeAreaView className="bg-white pt-5 flex-1">
      {/* Header */}
      <View className=" flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-100 p-4 rounded-full "
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-500 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search Bar  */}
      <View className="flex-row items-center pb-2 mx-4 space-x-2">
        <View className="flex-row flex-1 items-center bg-gray-200 p-3 space-x-2">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Reastaurant & Foodies"
            keyboardType="default"
          />
        </View>
        <AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>

      {/* Body  */}
      <ScrollView
        className="bg-gray-100 "
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories  */}
        <Categories />

        {/* Featured Row  */}
        {featuredCategory?.map((item) => (
          <FeaturedRow
            key={item._id}
            id={item._id}
            title={item.name}
            description={item.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
