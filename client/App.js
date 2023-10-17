import React, { useEffect, useState } from "react";
import { NavigationContainer, DarkTheme,} from "@react-navigation/native";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Text, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { store } from './store';
import { Init } from './store/actions';
import Homepage from "./screens/Homepage";
import LoginScreen from "./screens/Login";
import register from "./screens/Signup";


const Stack = createSharedElementStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Homepage" component={Homepage} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={register} />
    </Stack.Navigator>
  );
};

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Getting token...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const RootNavigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  }

  useEffect(() => {
    init()
  }, [])

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar backgroundColor='black' barStyle="light-content" />
        {token === null ? <AuthStack/> : <AppStack/>}
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
