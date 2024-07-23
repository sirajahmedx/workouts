import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import exercises from "@/data/exercises.json";
import { Stack, useLocalSearchParams } from "expo-router";

function ExerciseDetails() {
   const [isExpanded, setIsExpanded] = useState(false);
   const params = useLocalSearchParams();
   const exercise = exercises.find((item) => item.name === params.name);

   if (!exercise) {
      return <Text style={styles.errorText}>Exercise not found</Text>;
   }

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <Stack.Screen options={{ title: exercise.name }} />

         <View style={styles.headerContainer}>
            <Text style={styles.header}>{exercise.name}</Text>
         </View>
         <View style={styles.detailsContainer}>
            <Text style={styles.label}>
               Muscle: <Text style={styles.value}>{exercise.muscle}</Text>
            </Text>
            <Text style={styles.label}>
               Equipment: <Text style={styles.value}>{exercise.equipment}</Text>
            </Text>
            <Text style={styles.label}>
               Difficulty:{" "}
               <Text style={styles.value}>{exercise.difficulty}</Text>
            </Text>
         </View>
         <View style={styles.instructionsContainer}>
            <Text style={styles.label}>Instructions:</Text>
            <Text style={styles.instructions} numberOfLines={isExpanded ? 0 : 3}>
               {exercise.instructions}
            </Text>
            <Text style={styles.label} onPress={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Read less" : "Read more"}</Text>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 20,
      backgroundColor: "#f5f5f5",
   },
   headerContainer: {
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: "#ccc", // Light gray border
   },
   header: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
   },
   detailsContainer: {
      marginBottom: 20,
      backgroundColor: "#f0f0f0",
      padding: 10,
      borderRadius: 10,
   },
   label: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      color: "#444",
   },
   value: {
      fontWeight: "normal",
      color: "#444",
   },
   instructionsContainer: {
      backgroundColor: "#f8f8f8",
      padding: 10,
      borderRadius: 10,
   },
   instructions: {
      fontSize: 16,
      marginTop: 10,
      lineHeight: 24,
      color: "#666",
   },

   errorText: {
      fontSize: 18,
      color: "red",
      textAlign: "center",
      marginTop: 20,
   },
});

export default ExerciseDetails;


