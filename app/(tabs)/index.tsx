import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import exercises from "../../data/exercises.json";
import Exercise from "@/components/Exercise";

const Home = () => {
   return (
      <View style={styles.container}>
         <FlatList
            data={exercises}
            renderItem={({ item }) => <Exercise item={item} />}
         />
      </View>
   );
};

export default Home;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "darkgray",
      justifyContent: "center",
   },
});
