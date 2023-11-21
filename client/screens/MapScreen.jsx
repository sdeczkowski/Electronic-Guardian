import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable, Animated, TextInput } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker, PROVIDER_GOOGLE, Circle, Polygon } from "react-native-maps";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
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
      const id = await AsyncStorage.getItem("_id");
      try {
        const url = "http://10.0.2.2:3001/api/noti/delete";
        axios.post(url, { _opid: id });
        setData(null);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const sendSeen = async () => {
      const id = await AsyncStorage.getItem("_id");
      try {
        const url = "http://10.0.2.2:3001/api/noti/seen";
        axios.post(url, { _opid: id });
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
            <AntIcon name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Powiadomienia</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <AntIcon name="infocirlceo" size={20} color="black" />
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
              <AntIcon name="closecircleo" size={30} color="black" />
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
    const [podloc, setPodLoc] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
    const [loading, setLoading] = useState(true);
    const [newNoti, setNewNoti] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState("");
    const [selectedValue, setSelectedValue] = useState("Podopieczny");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(true);
    const [modalInput, setModalInput] = useState("");
    const [phoneNr, setPhoneNr] = useState("101000000");
    const [code, setCode] = useState();
    const [pods, setPods] = useState([]);
    const [podArea, setPodArea] = useState([]);
    const [freshLocation, setFreshLoc] = useState(false);

    const Setup = async () => {
      const type = await AsyncStorage.getItem("type");
      setType(type);
      const id = await AsyncStorage.getItem("_id");
      if (type === "op") {
        try {
          const url = "http://10.0.2.2:3001/api/noti/get/" + id;
          axios.get(url).then((response) => {
            if (response && response.data) {
              response.data.notifications.map((item) => {
                if (!item.seen) {
                  setNewNoti(true);
                }
              });
              console.log("powiadomienia - odebrane");
            }
          });
        } catch (error) {
          console.log(error.response.data.message);
        }
        try {
          const url = "http://10.0.2.2:3001/api/user/code/" + id;
          axios.get(url).then((response) => {
            if (response && response.data) {
              setCode(response.data);
              console.log("kod - odebrany");
            }
          });
        } catch (error) {
          console.log(error.response.data.message);
        }
        try {
          const url = "http://10.0.2.2:3001/api/user/getpods/" + id;
          axios.get(url).then((response) => {
            if (response && response.data) {
              setPods(response.data);
              console.log("podopieczni - odebrani");
            }
          });
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else {
        try {
          const url = "http://10.0.2.2:3001/api/area/getpodarealook/" + id;
          axios.get(url).then((response) => {
            if (response && response.data) {
              setPodArea(response.data);
              console.log("podopieczny - odebranal obszar");
            }
          });
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
      try {
        // let { status } = await Location.requestForegroundPermissionsAsync();
        // if (status !== "granted") {
        //   setErrorMsg("Permission to access location was denied");
        //   return;
        // }
        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
        });
        setLocation(location);
        await AsyncStorage.setItem(
          "location",
          JSON.stringify({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421,
          })
        );
        console.log("\n x: " + location.coords.latitude + "\n y: " + location.coords.longitude);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    const SendArea = async () => {
      const id = await AsyncStorage.getItem("_id");
      let loc = await Location.getCurrentPositionAsync({});
      const type = await AsyncStorage.getItem("type");
      if (type === "pod") {
        try {
          const url = "http://10.0.2.2:3001/api/user/updateloc";
          await axios.post(url, {
            _id: id,
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    const isPodinArea = async (item) => {
      let date = new Date();
      date = date.getTime();
      try {
        const url = "http://10.0.2.2:3001/api/user/podloc/" + item._podid;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setPodLoc(response.data.location);
            let poddate = Date.parse(response.data.location_date);
            if (date < poddate + 1000000) {
              setFreshLoc(true)
            }
            if (item.isActive) {
              checkIfInsidePolygon(response.data.location.latitude, response.data.location.longitude, item);
            }
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
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

    const checkIfInsidePolygon = async (platitude, plongitude, item) => {
      const point = {
        latitude: platitude,
        longitude: plongitude,
      };
      const isInside = isPointInPolygon(point, item.cords);
      if (isInside) {
        if(!item.loc_status){
          console.log("Jesteś w obszarze");
          item.loc_status = true;
        }
      } else {
        if(item.loc_status){
          console.log("Jesteś poza obszarem");
          await NotiSend(item._podid, item.name);
          item.loc_status = false;
        }
      }
    };

    const NotiSend = async ( _podid, name) => {
      const id = await AsyncStorage.getItem("_id");
      const date = new Date()
      try {
        const url = "http://10.0.2.2:3001/api/noti/add";
        axios.post(url, { 
          _opid: id,
          _podid: _podid,
          title: "Podopieczny opuścił obszar",
          details: "Podopieczny opuścił obszar: "+ name,
          areaname: name,
          date: date.toISOString()
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    }

    const GetPodArea = async (_podid) => {
      const id = await AsyncStorage.getItem("_id");
      try {
        const url = "http://10.0.2.2:3001/api/area/getpodarea/" + id + "/" + _podid;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setPodArea(response.data);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
      try {
        const url = "http://10.0.2.2:3001/api/user/podloc/" + _podid;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setPodLoc(response.data.location);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fade = (toValue, duration) => {
      setIsVisible(toValue === 1);
      Animated.timing(fadeAnim, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    };

    const makeCall = () => {
      const args = {
        number: phoneNr,
        prompt: false,
        skipCanOpen: true,
      };
      call(args).catch(console.error);
    };

    const handleModalConfirmation = () => {
      console.log("Zatwierdzono kod:", modalInput);
      setModalVisible(false);
    };

    const handleMapPress = (event) => {
      const { coordinate } = event.nativeEvent;
      setCoordinates((prevCoordinates) => [...prevCoordinates, coordinate]);
    };

    useEffect(() => {
      Setup();
    }, []);

    useEffect(() => {
      const intId = setInterval(() => {
        if (type === "op") {
          if (podArea.length > 0) {
            podArea.map((item) => {
              isPodinArea(item);
            });
          }
        } else {
          SendArea(location);
        }
      }, 10000);
      return () => {
        clearInterval(intId);
      };
    }, [podArea]);

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
            onPress={handleMapPress}>
            {podArea.map((item) => (
              <Polygon
                key={item.name}
                strokeColor={item.isActive ? "blue" : "grey"}
                fillColor={item.isActive ? "rgba(109, 147, 253, 0.4)" : "rgba(124, 124, 124, 0.4)"}
                strokeWidth={2}
                coordinates={item.cords}
              />
            ))}
            {podloc !== null ? (
              <Marker coordinate={podloc}>
                <MaterialIcon name="map-marker-account-outline" size={25} color={freshLocation ? "rgb(212, 43, 43)" : "rgb(110, 110, 110)"} />
              </Marker>
            ) : (
              <View></View>
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
                <View
                  style={[styles.leftbar, { width: "85%", height: 65, backgroundColor: "white", paddingBottom: 60 }]}>
                  {pods.length != 0 ? (
                    <Picker
                      style={[
                        {
                          backgroundColor: "white",
                          height: "12.5%",
                          width: "85%",
                          left: 20,
                          borderRadius: 20,
                        },
                      ]}
                      selectedValue={selectedValue}
                      onValueChange={(itemValue) => {
                        GetPodArea(itemValue);
                        setSelectedValue(itemValue);
                      }}>
                      <Picker.Item label={"Podopieczny"} value={""} />
                      {pods.map((pod) => (
                        <Picker.Item
                          style={{ borderRadius: 20 }}
                          key={pod._podid}
                          label={pod.firstname + " " + pod.lastname}
                          value={pod._podid}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={{ height: 50, paddingTop: 15 }}> Brak podopiecznych </Text>
                  )}
                </View>
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
                    <Text style={[styles.title, { justifyContent: "center", fontSize: 80 }]}>{code}</Text>
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
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Ionicons name="qr-code-outline" size={32} color="grey" />
                </Pressable>
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
                    onPress={() => {
                      setModalVisible(true);
                    }}>
                    <AntIcon name="user" size={32} color="grey" />
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
                    onPress={makeCall}>
                    <AntIcon name="fork" size={32} color="grey" />
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
                    onPress={() => fade(isVisible ? 0 : 1, isVisible ? 100 : 200)}>
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
                  <Text style={[styles.title, { justifyContent: "center" }]}>Wprowadź kod od opiekuna:</Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginVertical: 10,
                      width: "100%",
                      paddingHorizontal: 10,
                      borderRadius: 10
                    }}
                    value={modalInput}
                    onChangeText={(text) => {
                      const formattedText = text.replace(/[^0-9]/g, ""); // Usuń niecyfrowe znaki
                      if (formattedText.length == 6) {
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
