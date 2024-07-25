import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
   return (
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               tabBarIcon: ({ color }) => (
                  <FontAwesome5 size={28} name="home" color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="[name]"
            options={{
               title: "Exercises",
               tabBarIcon: ({ color }) => (
                  <FontAwesome5 size={28} name="dumbbell" color={color} />
               ),
            }}
         />
      </Tabs>
   );
}
