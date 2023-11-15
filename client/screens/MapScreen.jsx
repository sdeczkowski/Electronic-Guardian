import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  ActivityIndicator,
  Alert,
  Pressable,
  Animated,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker, PROVIDER_GOOGLE, Circle, Polygon } from "react-native-maps";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons1 from "react-native-vector-icons/AntDesign";
import styles from "../styles/styles";
import * as Location from "expo-location";
import moment from "moment";
import call from "react-native-phone-call";



const Stack = createStackNavigator();

export default function MapScreen() {
  const Notifications = ({ navigation }) => {
    const [data, setData] = useState([]);


    const NotiSetup = async () => {
      try {
        const id = await AsyncStorage.getItem("_id");
        const url = "http://10.0.2.2:3001/api/noti/get/" + id;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setData(response.data.notifications);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const deleteNoti = async () => {
      const email = await AsyncStorage.getItem("email");
      try {
        const url = "http://10.0.2.2:3001/api/noti/delete";
        axios.post(url, { email: email });
        setData(null);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const sendSeen = async () => {
      const email = await AsyncStorage.getItem("email");
      try {
        const url = "http://10.0.2.2:3001/api/noti/seen";
        axios.post(url, { email: email });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

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
            <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>{item.firstname + " " + item.lastname}</Text>
          </View>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ width: "80%" }}>{item.details}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>{moment(new Date(item.date)).fromNow()}</Text>
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

    useEffect(() => {
      NotiSetup();
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      if (data != []) {
        sendSeen();
      }
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.tab,
        });
    }, []);

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
          {data ? (
            <FlatList nestedScrollEnabled data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />
          ) : (
            <></>
          )}
        </View>
        {data !== null ? (
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                deleteNoti();
              }}>
              <Ionicons1 name="closecircleo" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };

  const Map = ({ navigation }) => {
    const [mapRegion, setMapRegion] = useState({});
    const [location, setLocation] = useState();
    const [coordinates, setCoordinates] = useState([]);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
    const [loading, setLoading] = useState(true);
    const [newNoti, setNewNoti] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState("");
    const [selectedValue, setSelectedValue] = useState("Podopieczny 1");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(true);
    const [modalInput, setModalInput] = useState('');
    const [phoneNr, setPhoneNr] = useState('101000000');

    const fade = (toValue, duration) => {
      setIsVisible(toValue === 1);
      Animated.timing(fadeAnim, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    };

    const makeCall = () =>{
        const args = {
          number: phoneNr,
          prompt: false,
          skipCanOpen: true
        };
        call(args).catch(console.error);
    };

    const openModal = () => {
      setModalVisible(true);
    };

    const handleModalConfirmation = () => {
      console.log('Zatwierdzono kod:', modalInput);
      setModalVisible(false);
    };

    const fade = (toValue, duration) => {
      setIsVisible(toValue === 1);
      Animated.timing(fadeAnim, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    };
    const NotiSetup = async () => {
      try {
        const id = await AsyncStorage.getItem("_id");
        const url = "http://10.0.2.2:3001/api/noti/get/" + id;
        axios.get(url).then((response) => {
          if (response && response.data) {
            response.data.notifications.map((item) => {
              if (!item.seen) {
                setNewNoti(true);
              }
            });
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const LocationSetup = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log("\n x: " + location.coords.latitude + "\n y: " + location.coords.longitude);
      setLocation(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });
      setLocation(location);
      AsyncStorage.setItem(
        "location",
        JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
        })
      );
    };

    const handleMapPress = (event) => {
      const { coordinate } = event.nativeEvent;
      setCoordinates((prevCoordinates) => [...prevCoordinates, coordinate]);
    };

    const resetCoordinates = () => {
      setCoordinates([]);
    };

    const isPointInPolygon = (point, polygon) => {
      let oddNodes = false;
      let j = polygon.length - 1;

      for (let i = 0; i < polygon.length; i++) {
        const vertexI = polygon[i];
        const vertexJ = polygon[j];

        if (
          (vertexI.longitude < point.longitude && vertexJ.longitude >= point.longitude) ||
          (vertexJ.longitude < point.longitude && vertexI.longitude >= point.longitude)
        ) {
          if (
            vertexI.latitude +
            ((point.longitude - vertexI.longitude) / (vertexJ.longitude - vertexI.longitude)) *
            (vertexJ.latitude - vertexI.latitude) <
            point.latitude
          ) {
            oddNodes = !oddNodes;
          }
        }

        j = i;
      }

      return oddNodes;
    };
    const checkIfInsidePolygon = () => {
      const point = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const isInside = isPointInPolygon(point, coordinates);

      if (isInside) {
        console.log("Jesteś w obszarze");
      } else {
        console.log("Jesteś poza obszarem");
      }
    };

    const SetType = async () => {
      const type = await AsyncStorage.getItem("type");
      setType(type);
    };

    const handleCheckLocation = () => {
      checkIfInsidePolygon();
    };

    useEffect(() => {
      SetType();
      NotiSetup();
      LocationSetup();
      if (mapRegion != {}) {
        setLoading(false);
      }
    }, []);

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
            /* initialRegion={{
              latitude: 51.2376267,
              longitude: 22.5713683,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421,
            }}*/
            region={mapRegion}
            //onRegionChange={mapRegion}
            onPress={handleMapPress}>
            {coordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                onPress={() => {
                  if (
                    selectedCoordinate &&
                    selectedCoordinate.latitude === coordinate.latitude &&
                    selectedCoordinate.longitude === coordinate.longitude
                  ) {
                    setCoordinates((prevCoordinates) =>
                      prevCoordinates.filter(
                        (coord) => coord.latitude !== coordinate.latitude || coord.longitude !== coordinate.longitude
                      )
                    );
                    setSelectedCoordinate(null);
                  }
                }}
              />
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
            {type === "op" ? (
              <View>
                <View style={[styles.box, { width: "75%", height: 65, backgroundColor: "white", paddingBottom: 60 }]}>
                  <Picker
                    style={{
                      backgroundColor: "white",
                      height: "12.5%",
                      width: "95%",
                      borderRadius: 20,
                      marginLeft: 5,
                    }}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                    <Picker.Item label="Podopieczny 1" value="Podopieczny 1" />
                    <Picker.Item label="Podopieczny 2" value="Podopieczny 2" />
                    <Picker.Item label="Podopieczny 3" value="Podopieczny 3" />
                  </Picker>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007BFF",
                    padding: 10,
                    borderRadius: 20,
                    width: "80%",
                    marginLeft: 10,
                  }}
                  onPress={handleCheckLocation}>
                  <Text style={styles.buttonText}>Lokalizuj</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
            {type === "op" ? (
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
                    navigation.navigate("Notifications");
                  }}>
                  <Ionicons name="notifications-outline" size={32} color="grey" />
                  <View style={newNoti ? styles.dot : ""}></View>
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
          </View>
          {type === "op" ? (
            <View style={{ paddingBottom: 100 }}>
              <View style={{ alignSelf: "flex-end", height: 65, width: 65 }}>
                <Modal
                  isVisible={isModalVisible}
                  transparent={true}
                  onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                  }}>
                  <View
                    style={[
                      styles.box,
                      {
                        color: "white",
                        height: "50%",
                        flexDirection: "column",
                      },
                    ]}>
                    <Text style={[styles.title, { justifyContent: "center" }]}>Kod podopiecznego</Text>
                    <Text style={[styles.title, { justifyContent: "center", fontSize: 80 }]}>
                      {Math.floor(Math.random() * 100000) + 1}
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        {
                          justifyContent: "center",
                          color: "grey",
                          fontSize: 15,
                        },
                      ]}>
                      Przekaż swój kod dla podopiecznego
                    </Text>
                    <Divider />
                    <Pressable
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      <Text style={[styles.title, { justifyContent: "center" }]}>Zamknij</Text>
                    </Pressable>
                  </View>
                </Modal>
                <Pressable
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
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Ionicons name="qr-code-outline" size={32} color="grey" />
                </Pressable>
                <Button title="Resetuj obszar" onPress={resetCoordinates} />
              </View>
            </View>
          ) : (
          <View>
            {isVisible && (
            <Animated.View
              style={[
                styles.fadingContainer,
                {
                  opacity: fadeAnim,
                },
              ]}>
              <Pressable
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
                  onPress={openModal}>
                  <Ionicons1 name="user" size={32} color="grey" />
                </Pressable>
              <Pressable
                  style={[
                    styles.button,
                    {
                      backgroundColor: "white",
                      height: 65,
                      width: 65,
                      borderRadius: 50,
                      alignSelf: "flex-end",
                      //marginRight:"30%",
                    },
                  ]}
                    onPress={makeCall}
                  >
                  <Ionicons1 name="fork" size={32} color="grey" />
                </Pressable>
            </Animated.View>
            )}
            <View style={{ paddingBottom: 100 }}>
              <View style={{ alignSelf: "flex-end", height: 65, width: 65 }}>
                    <Pressable
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
                      onPress={() => fade(isVisible ? 0 : 1, isVisible ? 3000 : 5000)}
                    >
                      <Ionicons name="alert" size={32} color="grey" />
                    </Pressable>
                </View>
              </View>
              <Modal
                isVisible={isModalVisible}
                transparent={true}
                onRequestClose={() => {
                  setModalVisible(!isModalVisible);
                }}>
                <View
                  style={[
                    styles.box,
                    {
                      color: "white",
                      height: "50%",
                      flexDirection: "column",
                      alignItem: "center",
                    },
                  ]}>
                  <Text style={[styles.title, { justifyContent: "center" }]}>
                    Wprowadź kod od opiekuna:
                  </Text>
                  <TextInput
                    style={{height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      marginVertical: 10,
                      width: '100%',
                      paddingHorizontal: 10,}}
                    value={modalInput}
                    onChangeText={(text) => {
                      
                      const formattedText = text.replace(/[^0-9]/g, ''); // Usuń niecyfrowe znaki
                      if (formattedText.length <= 6) {
                        setModalInput(formattedText);
                      }
                    }}
                    maxLength={6}
                    keyboardType="numeric"
                  />
    
                  <Divider />
                  <View style={{ flexDirection: "row", width: "80%", margin: 10 }}>
                    <Pressable
                      style={{
                        margin: 10,
                        width: "60%",
                        alignContent: "space-between",
                        marginLeft: "20%",
                        
                      }}
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      

                      <Text>Anuluj</Text>

                    </Pressable>

                    <Pressable
                      style={{
                        margin: 10,
                        alignContent: "space-between",
                        width: "50%",
                        marginLeft: "-5%",
                        
                      }}
                      onPress={() => {
                        handleModalConfirmation();
                      }}>
                      

                      <Text>Zatwierdź</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
            </View>
          )}
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
