import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient.fetch(`*[_type == "category"]`).then((data) => {
      setCategories(data);
    }, []);
  });
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 18 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Categories Card */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
