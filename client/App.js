import React, { useEffect, useState } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { store } from "./store";
import { Init } from "./store/actions";
import styles from "./styles/styles";

//importy widoków
//autoryzacja
import { Register, Role } from "./screens/Signup";
import LoginScreen from "./screens/Login";
//aplikacja
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/UserProfile";
import AreaScreen from "./screens/AreaScreen";
import ChatScreen from "./screens/ContactsScreen";

//nazwy widoków
const ChatName = "ChatScreen";
const LocationName = "LocationList";
const MapName = "Map";
const ProfileName = "Settings";

const Stack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [type, setType] = useState("");

  const SetType = async() => {
    const type = await AsyncStorage.getItem("type");
    setType(type);
  }

  useEffect(() => {
    SetType();
  }, []);

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
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tab,
      })}>
      <Tab.Screen name={ChatName} component={ChatScreen} />
      {(type==="op") ? (<Tab.Screen name={LocationName} component={AreaScreen}/>) : (<></>)}
      <Tab.Screen name={MapName} component={MapScreen} />
      <Tab.Screen name={ProfileName} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Role" component={Role} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const token = useSelector((state) => state.Reducers.authToken);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="white" barStyle="light-content" />
      {token === null ? <AuthStack /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
