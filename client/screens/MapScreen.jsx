import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons1 from "react-native-vector-icons/AntDesign";
import styles from "../styles/styles";
import MapView, { Marker, PROVIDER_GOOGLE, Circle, Polygon } from "react-native-maps";
import * as Location from "expo-location";

const Stack = createStackNavigator();

export default function MapScreen() {
  // powiadomienia
  const Notifications = ({ navigation }) => {
    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.tab,
        });
    }, [navigation]);

    const data = [
      {
        id: 1,
        title: "Anna Nowak",
        notification_title: "tutuł powiadomienia",
        opis: "opis",
        time_ago: "2 godziny temu",
      },
      {
        id: 2,
        title: "Jan Kowalski",
        notification_title: "tytuł powiadomiena",
        opis: "opis",
        time_ago: "1 godzina temu",
      },
    ];

    const renderItem = ({ item }) => (
      <View
        style={{
          backgroundColor: "rgb(221, 222, 223)",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 20,
          padding: 10,
          margin: 10,
        }}>
        <View style={{}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "grey",
                width: 25,
                height: 25,
                borderRadius: 5,
              }}></View>
            <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>
              {item.title}
            </Text>
          </View>
          <Text style={{ fontWeight: "bold" }}>{item.notification_title}</Text>
          <Text style={{ width: "80%" }}>{item.opis}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>{item.time_ago}</Text>
          <View
            style={{
              backgroundColor: "grey",
              width: 40,
              height: 40,
              borderRadius: 5,
              marginTop: 10,
            }}></View>
        </View>
      </View>
    );

    return (
      <View style={{ alignItems: "center", height: "100%", paddingTop: 25 }}>
        <View style={styles.index}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons1 name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Powiadomienia</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <Ionicons1 name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "90%", height: "87%", margin: 5 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity>
            <Ionicons1 name="closecircleo" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ekran mapy
  const Map = ({ navigation }) => {
    const window = Dimensions.get("window");
    const screenHeight = window.height;
    const screenWidth = window.width;
    const [mapRegion, setMapRegion] = useState();
    const [location, setLocation] = useState();

    const userLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(
        "\nx: " + location.coords.latitude + "\ny: " + location.coords.longitude
      );
      setLocation(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });
    };

    useEffect(() => {
      userLocation();
    }, []);

    return (
      <View style={{ height: "100%", paddingTop: 25 }}>
        <MapView
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={false}
          showsCompass={false}
          showsUserLocation={true}
          region={mapRegion}
          //onRegionChange={mapRegion}
        >

            

          <Marker
            coordinate={{
              latitude: 51,
              longitude: 22,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421,
            }}>
              
            </Marker>
            <Polygon 
              strokeColor="red"
              fillColor="black"
              strokeWidth={2}
              holes={[[{
                latitude:51.236508,
                longitude:22.576638
              },
              {
                latitude:51.239571,
                longitude:22.583225
              },
              {
                latitude:51.236964,
                longitude:22.590070
              },
              {
                latitude:51.234640,
                longitude:22.588654
              },
              {
                latitude:51.235634,
                longitude:22.580028
              }]]}
               coordinates={[{
                latitude: 51,
                longitude: 22,
              }]}
            />
        </MapView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={styles.leftbar}>
            <Ionicons name="person-circle-sharp" size={50} color="grey" />
            <Text style={{ margin: 10 }}>Nazwa użytkownika</Text>
            <TouchableOpacity style={{ margin: 10 }}>
              <Ionicons name="chevron-down-outline" size={32} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={{ height: 65 }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "white",
                  height: 65,
                  width: 65,
                  borderRadius: 50,
                },
              ]}
              onPress={() => navigation.navigate("Notifications")}>
              <Ionicons name="notifications-outline" size={32} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 100 }}>
          <View style={{ alignSelf: "flex-end", height: 65, width: 65 }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "white",
                  height: 65,
                  width: 65,
                  borderRadius: 50,
                  alignSelf: "flex-end",
                },
              ]}>
              <Ionicons name="qr-code-outline" size={32} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={Map} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}
