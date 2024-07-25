import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Error = ({ message } : any) => {
   return (
      <View style={styles.container}>
         <Text style={styles.errorText}>Error: {message}</Text>
         <Text style={styles.retryText}>Please try again later.</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
   },
   errorText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#ff0000",
      marginBottom: 8,
   },
   retryText: {
      fontSize: 16,
      color: "#888",
   },
});

export default Error;
