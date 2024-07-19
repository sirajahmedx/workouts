import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Exercise({ item }: any) {
   return (
      <View style={styles.exerciseContainer}>
         <Text style={styles.exerciseName}>{item.name}</Text>
         <Text style={styles.exerciseDetails}>
            <Text style={styles.muscleText}>{item.muscle.toUpperCase()}</Text> /{" "}
            <Text style={styles.equipmentText}>
               {item.equipment.replace("_", " ").toUpperCase()}
            </Text>{" "}
            /{" "}
            <Text style={styles.difficultyText}>
               {item.difficulty.toUpperCase()}
            </Text>
         </Text>
      </View>
   );
}

export default Exercise;

const styles = StyleSheet.create({
   exerciseContainer: {
      backgroundColor: "#f5f5f5",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   exerciseName: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
   },
   exerciseDetails: {
      fontSize: 14,
      color: "#888",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   muscleText: {
      fontWeight: "bold",
      color: "#0099cc", // Light blue for muscle
   },
   equipmentText: {
      color: "#ff9900", // Orange for equipment
   },
   difficultyText: {
      color: "#ff0000", // Red for difficulty (assuming higher difficulty is more intense)
   },
});
