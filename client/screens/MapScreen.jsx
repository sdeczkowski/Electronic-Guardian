import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions, 
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import { Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons1 from "react-native-vector-icons/AntDesign";
import styles from "../styles/styles";
import MapView, { Marker, PROVIDER_GOOGLE, Circle, Polygon } from "react-native-maps";

import * as Location from "expo-location";


const Stack = createStackNavigator();

export default function MapScreen() {
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

  const Map = ({ navigation }) => {
    const window = Dimensions.get("window");
    const screenHeight = window.height;
    const screenWidth = window.width;
    const [mapRegion, setMapRegion] = useState({});
    const [location, setLocation] = useState();
    const [coordinates, setCoordinates] = useState([]);
    const [loading, setLoading] = useState(true);
    const data = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'}
    ]

    const code = () => {
      const x = Math.floor(Math.random() * 100000) + 1;

      Alert.alert(
        'Kod podopiecznego' ,
        '' + x,
        [
          { text: 'Zamknij', onPress: () => console.log('Close Pressed') },
        ]
      );
    }
    
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
      setLoading(false);
    };

    useEffect(() => {
      if(mapRegion != {}){
        setLoading(false);
      }
      userLocation();
    }, []);

    const handleMapPress = (event) => {
      const { coordinate } = event.nativeEvent;
      setCoordinates(prevCoordinates => [...prevCoordinates, coordinate]);
    }
  
    const resetCoordinates = () => {
      setCoordinates([]);
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
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
          onPress={handleMapPress}
        >
          {coordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate} />
        ))}
        {coordinates.length > 2 && (
        <Polygon
          strokeColor="blue"
          fillColor="rgba(109, 147, 253, 0.4)"
          strokeWidth={2}
          coordinates={coordinates}
        />
        )}
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
          <View >
          <Button title="Resetuj obszar" onPress={resetCoordinates} />
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
              onPress={() => {
                setLoading(true);
                navigation.navigate("Notifications");}}>
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
              ]}
               //onPress={()=>code()}
               onPress={toggleModal}
              >
                <Modal isVisible={isModalVisible}>
                <View style={[styles.box,{color:"white", height:"50%", flexDirection:"column"}]}>                  
                <Text style={[styles.title,{justifyContent:"center"}]}> Kod podopiecznego</Text>
                <Text style={[styles.title,{justifyContent:"center",fontSize:80}]}>{
                    Math.floor(Math.random() * 100000) + 1
                  }
                </Text>
                <Text style={[styles.title,{justifyContent:"center", color:"grey", fontSize:15}]}>Przekaż swój kod dla podopiecznego</Text>
                <Divider />
                <TouchableOpacity
                >
                <Text style={[styles.title,{justifyContent:"center"}]}>Zamknij</Text>
                </TouchableOpacity>
                </View>
                </Modal>
              <Ionicons name="qr-code-outline" size={32} color="grey" />
                
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={Map} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}
