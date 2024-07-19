import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import exercises from "../data/exercises.json";
import Exercise from "@/components/Exercise";

const Home = () => {
   return (
      <FlatList data={exercises} renderItem={({ item }) => <Exercise item={item} />} />
   );
};

export default Home;
