import { useEffect, useState } from "react";
import {
   Text,
   View,
   StyleSheet,
   ScrollView,
   ActivityIndicator,
   ImageBackground,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { FetchExercises } from "@/api/FetchExercises";

interface Exercise {
   name: string;
   muscle: string;
   equipment: string;
   difficulty: string;
   instructions: string;
}

function ExerciseDetails() {
   const { name } = useLocalSearchParams<{ name: string }>();
   const [exercise, setExercise] = useState<Exercise | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);
   const [isExpanded, setIsExpanded] = useState<boolean>(false);

   useEffect(() => {
      const fetchExercise = async () => {
         setLoading(true);
         try {
            const data = await FetchExercises({ name });
            const foundExercise = data.length ? data[0] : null;
            setExercise(foundExercise);
         } catch (err) {
            setError(err as Error);
         } finally {
            setLoading(false);
         }
      };

      fetchExercise();
   }, [name]);

   if (loading) {
      return <ActivityIndicator size="large" color="#fff" />;
   }

   if (error) {
      return <Text style={styles.errorText}>Error: {error.message}</Text>;
   }

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
            <Text
               style={styles.instructions}
               numberOfLines={isExpanded ? 0 : 3}
            >
               {exercise.instructions}
            </Text>
            <Text
               style={styles.label}
               onPress={() => setIsExpanded(!isExpanded)}
            >
               {isExpanded ? "Read less" : "Read more"}
            </Text>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   // backgroundImage: {
   //    flex: 1,
   //    resizeMode: "cover",
   //    justifyContent: "center",
   //    alignItems: "center",
   //    // opacity: 0.9,
   // },

   container: {
      flex: 1,
      // padding: 20,
      backgroundColor: "#222", // Dark background
   },
   headerContainer: {
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: "#444", // Lighter border for contrast
   },
   header: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff", // White text
      textAlign: "center",
   },
   detailsContainer: {
      marginBottom: 20,
      backgroundColor: "#333", // Slightly darker background for details
      padding: 10,
      borderRadius: 10,
   },
   label: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      color: "#ddd", // Light gray text for labels
   },
   value: {
      fontWeight: "normal",
      color: "#ddd", // Light gray text for values
   },

   instructionsContainer: {
      backgroundColor: "#242c40",
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
