import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';


//importy widoków
import MapScreen from './MapScreen';
import ProfileScreen from './UserProfile';
import AreaScreen from './AreaScreen';
import ChatScreen from './ContactsScreen';

//nazwy widoków
const ChatName = "Chat";
const LocationName = "LocationList";
const MapName = "Map";
const ProfileName = "Settings";

const Tab = createBottomTabNavigator();

const mainpage = () => {
  return (
      <Tab.Navigator
        initialRouteName={MapName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === MapName) {
              iconName = focused ? "map" : "map-outline";
            } else if (rn === ProfileName) {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === ChatName) {
              iconName = focused ? "chatbox" : "chatbox-outline";
            } else if (rn === LocationName) {
              iconName = focused ? "location" : "location-outline";
            }
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute', 
            padding: 10, 
            left: 20, 
            right: 20, 
            borderRadius: 15,
            height: 60,
            bottom: 20,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOpacity: 0.8,
            elevation: 5,
            shadowRadius: 7 ,
            shadowOffset : { width: 1, height: 3},
          }
        })}
      >
        {/* Linki do widoków */}
        <Tab.Screen name={ChatName} component={ChatScreen} />
        <Tab.Screen name={LocationName} component={AreaScreen} />
        <Tab.Screen name={MapName} component={MapScreen} />
        <Tab.Screen name={ProfileName} component={ProfileScreen} />
      </Tab.Navigator>
  );
};
export default mainpage;
