import React from "react";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

interface ExerciseProps {
   item: {
      name: string;
      muscle: string;
      equipment: string;
      difficulty: string;
   };
}

function Exercise({ item }: ExerciseProps) {
   return (
      <Link href={`/${item.name}`} asChild>
         <Pressable style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDetails}>
               <Text style={styles.muscleText}>
                  {item.muscle.toUpperCase()}
               </Text>{" "}
               /{" "}
               <Text style={styles.equipmentText}>
                  {item.equipment.replace("_", " ").toUpperCase()}
               </Text>{" "}
               /{" "}
               <Text style={styles.difficultyText}>
                  {item.difficulty.toUpperCase()}
               </Text>
            </Text>
         </Pressable>
      </Link>
   );
}

const styles = StyleSheet.create({
   exerciseContainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#333", // Dark border color
   },
   exerciseName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ffffff", // Bright white text color
   },
   exerciseDetails: {
      fontSize: 14,
      color: "#dddddd", // Light grey text color
   },
   muscleText: {
      color: "#ffffff", // Bright white text color
   },
   equipmentText: {
      color: "#bbbbbb", // Light grey text color
   },
   difficultyText: {
      color: "#888888", // Medium grey text color
   },
});

export default Exercise;
