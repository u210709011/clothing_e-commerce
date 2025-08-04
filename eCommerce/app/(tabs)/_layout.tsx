import { Tabs } from "expo-router";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CartIconWithBadge from "@/components/molecules/CartIconWithBadge";
import { Colors } from "@/constants/Colors";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        tabBarButton: (props) => {
          const viewRef = props.ref as React.Ref<View>;
          return (
            <View ref={viewRef} style= {{paddingHorizontal: 30, paddingTop:5}}>
              <TouchableWithoutFeedback onPress={props.onPress}>
                <View>
                  {props.children}
                </View>
              </TouchableWithoutFeedback>
            </View>
          )
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons size={28} name="home" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons size={28} name="favorite" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <CartIconWithBadge
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
