import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Modal,
   FlatList,
   Animated,
   Easing,
   TouchableOpacity,
   ImageBackground,
} from "react-native";
// import { Appearance, useColorScheme } from "react-native";

import Exercise from "@/components/Exercise";
import { FetchExercises } from "@/api/FetchExercises";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

interface Filter {
   muscle: string;
   type: string;
   difficulty: string;
}

interface ExerciseData {
   name: string;
   muscle: string;
   equipment: string;
   difficulty: string;
   instructions: string;
}

const Home: React.FC = () => {
   const [exercises, setExercises] = useState<ExerciseData[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const [filter, setFilter] = useState<Filter>({
      muscle: "biceps",
      type: "strength",
      difficulty: "beginner",
   });
   const [modalVisible, setModalVisible] = useState<boolean>(false);

   // Animation
   const [fadeAnim] = useState(new Animated.Value(0));

   useEffect(() => {
      const fadeIn = () => {
         Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
         }).start();
      };
      fadeIn();
      fetchAndSetExercises();
   }, [filter]);

   const fetchAndSetExercises = async () => {
      setLoading(true);
      try {
         const data: ExerciseData[] = await FetchExercises({
            muscle: filter.muscle,
            type: filter.type,
            difficulty: filter.difficulty,
         });
         setExercises(data);
      } catch (err: unknown) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("An unknown error occurred");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <View style={styles.container}>
         <View style={styles.buttonContainer}>
            <TouchableOpacity
               style={styles.filterButton}
               onPress={() => setModalVisible(true)}
            >
               <Text style={styles.buttonText}>Add Filters</Text>
            </TouchableOpacity>
         </View>

         <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  <Text style={styles.label}>Muscle Group:</Text>
                  <Picker
                     selectedValue={filter.muscle}
                     onValueChange={(itemValue: string): void =>
                        setFilter((prev) => ({ ...prev, muscle: itemValue }))
                     }
                     style={styles.picker}
                  >
                     <Picker.Item label="Abdominals" value="abdominals" />
                     <Picker.Item label="Abductors" value="abductors" />
                     <Picker.Item label="Biceps" value="biceps" />
                     <Picker.Item label="Triceps" value="triceps" />
                     <Picker.Item label="Traps" value="traps" />
                     <Picker.Item label="Middle Back" value="middle_back" />
                     <Picker.Item label="Lower Back" value="lower_back" />
                     <Picker.Item label="Neck" value="neck" />
                  </Picker>

                  <Text style={styles.label}>Exercise Type:</Text>
                  <Picker
                     selectedValue={filter.type}
                     onValueChange={(itemValue: string): void =>
                        setFilter((prev) => ({ ...prev, type: itemValue }))
                     }
                     style={styles.picker}
                  >
                     <Picker.Item label="Cardio" value="cardio" />
                     <Picker.Item label="Strongman" value="strongman" />
                     <Picker.Item label="Strength" value="strength" />
                     <Picker.Item label="Powerlifting" value="powerlifting" />
                     <Picker.Item label="Stretching" value="stretching" />
                  </Picker>

                  <Text style={styles.label}>Difficulty:</Text>
                  <Picker
                     selectedValue={filter.difficulty}
                     onValueChange={(itemValue: string): void =>
                        setFilter((prev) => ({
                           ...prev,
                           difficulty: itemValue,
                        }))
                     }
                     style={styles.picker}
                  >
                     <Picker.Item label="Beginner" value="beginner" />
                     <Picker.Item label="Intermediate" value="intermediate" />
                     <Picker.Item label="Expert" value="expert" />
                  </Picker>

                  <View style={styles.buttonContainer}>
                     <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => {
                           setModalVisible(false);
                           fetchAndSetExercises();
                        }}
                     >
                        <Text style={styles.buttonText}>Apply Filters</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer}>
                     <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                     >
                        <Text style={styles.buttonText}>Close</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>

         {loading ? (
            <Loading />
         ) : error ? (
            <Error message={error} />
         ) : (
            <Animated.View
               style={{ ...styles.listContainer, opacity: fadeAnim }}
            >
               <FlatList
                  data={exercises}
                  renderItem={({ item }) => <Exercise item={item} />}
                  keyExtractor={(item) => item.instructions}
               />
            </Animated.View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#121212", // Dark background
      padding: 10,
   },
   buttonContainer: {
      marginVertical: 10,
      alignItems: "center",
   },
   filterButton: {
      backgroundColor: "#1f1f1f", // Slightly lighter dark button color
      padding: 15,
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
   },
   buttonText: {
      color: "#ffffff", // Bright white text color
      fontSize: 16,
      fontWeight: "bold",
   },
   modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)", // Darker overlay
   },
   modalContent: {
      width: "85%",
      backgroundColor: "#1e1e1e", // Darker background for modal
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 6,
      elevation: 6,
   },
   label: {
      fontSize: 18,
      marginBottom: 10,
      color: "#ffffff", // Bright white text color
      fontWeight: "bold",
   },
   picker: {
      width: "100%",
      height: 50,
      borderColor: "#333", // Dark border color
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      backgroundColor: "#333", // Dark picker background
      color: "#ffffff", // Bright text color in picker
   },
   applyButton: {
      backgroundColor: "#333", // Darker apply button color
      padding: 15,
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
   },
   closeButton: {
      backgroundColor: "#444", // Slightly lighter dark color
      padding: 15,
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
   },
   listContainer: {
      flex: 1,
      marginTop: 10,
   },
});

export default Home;
