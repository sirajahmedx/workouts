import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

const Loading = () => {
   return (
      <View style={styles.container}>
         <ActivityIndicator size="large" color="#037aff" />
         <Text style={styles.text}>Loading...</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "darkgrey",
   },
   text: {
      marginTop: 10,
      fontSize: 16,
      color: "#000",
   },
});

export default Loading;
