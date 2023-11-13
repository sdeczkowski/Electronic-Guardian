import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, StyleSheet, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Circle, Polygon } from "react-native-maps";
import Modal from "react-native-modal";
import { Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import EviliconsIcon from "react-native-vector-icons/EvilIcons";
import styles from "../styles/styles";
import { Picker } from "@react-native-picker/picker";
import MapScreen from "./MapScreen";
const Stack = createStackNavigator();


export default function AreaScreen() {
  // czas obszaru
  const AreaTime = ({ navigation }) => {
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

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [time2, setTime2] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [option, setOption] = useState(null);
    const [dateArea, setDateArea] = useState("");
    const [dateReady, setDateReady] = useState(Date());
    const [timeArea, setTimeArea] = useState("");
    const [timeReady, setTimeReady] = useState(Date());
    const [timeArea2, setTimeArea2] = useState("");
    const [timeReady2, setTimeReady2] = useState(Date());

    useEffect(() => {
      setDateReady(dateArea);
      setTimeReady(timeArea);
      setTimeReady2(timeArea2);
      return () => {
        setDateReady(true);
        setTimeReady(true);
        setTimeReady2(true);
      };
    }, [dateArea, timeArea, timeArea2]);

    const toggleDatePicker = () => {
      setShowPicker(!showPicker);
    };

    const toggleTimePicker = () => {
      setShowPicker2(!showPicker2);
    };

    const onChange1 = ({ type }, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      const tempDate = new Date(currentDate);
      toggleDatePicker();
      setDateArea(tempDate.getDate() + "." + (tempDate.getMonth() + 1) + "." + tempDate.getFullYear());
    };

    const onChange2 = ({ type }, selectedTime, nr) => {
      const currentTime = selectedTime || date;
      setTime(currentTime);
      const tempDate = new Date(currentTime);
      toggleTimePicker();
      setTimeArea(tempDate.getHours() + ":" + tempDate.getMinutes());
    };

    const onChange3 = ({ type }, selectedTime2) => {
      const currentTime2 = selectedTime2 || date;
      setTime2(currentTime2);
      const tempDate2 = new Date(currentTime2);
      toggleTimePicker();
      setTimeArea2(tempDate2.getHours() + ":" + tempDate2.getMinutes());
    };

    const opcje = [
      { id: 1, label: "Codziennie" },
      { id: 2, label: "Co tydzień" },
      { id: 3, label: "Nigdy" },
    ];

    const selectOptions = (optionId) => {
      setOption(optionId);
    };

    return (
      <View style={{ alignItems: "center", height: "100%", paddingTop: 25 }}>
        <View style={styles.index}>
          <TouchableOpacity>
            <AntDesignIcon name="arrowleft" size={20} color="black" onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Tworzenie obszaru</Text>
          <TouchableOpacity>
            <AntDesignIcon name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          {showPicker && <DateTimePicker mode="date" display="spinner" value={date} onChange={onChange1} />}
          {!showPicker && (
            <Pressable style={[styles.box, { width: "90%" }]} onPress={toggleDatePicker}>
              <TextInput
                style={[styles.box, { width: "90%", color: "black" }]}
                onPress={toggleDatePicker}
                onChangeText={setDateArea}
                value={dateReady}
                placeholder="Chose the date"
                editable={false}></TextInput>
            </Pressable>
          )}
        </View>

        <View>
          {showPicker2 && <DateTimePicker mode="time" display="spinner" value={time} onChange={onChange2} />}
          {!showPicker2 && (
            <Pressable style={[styles.box, { width: "90%" }]} onPress={toggleTimePicker}>
              <TextInput
                style={[styles.box, { width: "90%", color: "black" }]}
                onPress={toggleTimePicker}
                onChangeText={setTimeArea}
                value={timeReady}
                placeholder="Chose time"
                editable={false}></TextInput>
            </Pressable>
          )}
        </View>

        <View>
          {showPicker2 && <DateTimePicker mode="time" display="spinner" value={time2} onChange={onChange3} />}
          {!showPicker2 && (
            <Pressable style={[styles.box, { width: "90%" }]} onPress={toggleTimePicker}>
              <TextInput
                style={[styles.box, { width: "90%", color: "black" }]}
                onPress={toggleTimePicker}
                onChangeText={setTimeArea2}
                value={timeReady2}
                placeholder="Chose time"
                editable={false}></TextInput>
            </Pressable>
          )}
        </View>
        <View style={{ margin: 10 }}>
          <Text style={[styles.title, { marginRight: "60%" }]}>Cykliczność:</Text>
          {opcje.map((opcja) => (
            <TouchableOpacity
              key={opcja.id}
              onPress={() => selectOptions(opcja.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: "60%",
                margin: 5,
              }}>
              {option === opcja.id ? (
                <AntDesignIcon name="checkcircleo" size={20} color="blue" />
              ) : (
                <EntypoIcon name="circle" size={20} color="black" />
              )}
              <Text>{opcja.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AreaSelect")}>
          <Text style={{ color: "white" }}>Zapisz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // tworzenie nowego obszaru
  const CreateArea = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("Podopieczny/grupa");
    const [isModalVisible, setModalVisible] = useState(false);
    const [mapRegion, setMapRegion] = useState({});
    const [location, setLocation] = useState();
    const [coordinates, setCoordinates] = useState([]);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
    const [loading, setLoading] = useState(true);

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

    const checkForIntersections = (newCoordinate) => {
      if (coordinates.length < 3) return false;

      for (let i = 0; i < coordinates.length; i++) {
        const point1 = coordinates[i];
        const point2 = coordinates[(i + 1) % coordinates.length];
        const nextPoint = coordinates[(i + 2) % coordinates.length];

        if (
          linesIntersect(
            newCoordinate.latitude,
            newCoordinate.longitude,
            nextPoint.latitude,
            nextPoint.longitude,
            point1.latitude,
            point1.longitude,
            point2.latitude,
            point2.longitude
          )
        ) {
          return true;
        }
      }
      return false;
    };

    const linesIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
      const a = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      const b = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
      const c = (x2 - x3) * (y1 - y3) - (y2 - y3) * (x1 - x3);
      const d = (x2 - x4) * (y1 - y3) - (y2 - y4) * (x1 - x3);

      return a * b < 0 && c * d < 0;
    };
    const handleMapPress = (event) => {
      const { coordinate } = event.nativeEvent;
      const hasIntersections = checkForIntersections(coordinate);

      if (!hasIntersections) {
        setCoordinates((prevCoordinates) => [...prevCoordinates, coordinate]);
      } else {
        console.log("Przecięcie! Wyczyszczam obszar.");
        resetCoordinates();
      }
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
      } else {
        setSelectedCoordinate(coordinate);
      }
    };

    const resetCoordinates = () => {
      setCoordinates([]);
    };

    return (
      <View
        style={{
          alignItems: "center",
          height: "100%",
          paddingTop: 25,
          flexDirection: "column",
        }}>
        <View style={styles.index}>
          <TouchableOpacity>
            <AntDesignIcon name="arrowleft" size={20} color="black" onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Tworzenie obszaru</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <AntDesignIcon name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.box, { alignItems: "center", width: "90%", height: "8%" }]}>
          <TextInput
            style={{
              paddingLeft: 15,
              fontWeight: "bold",
              color: "black",
              width: "90%",
            }}
            placeholder="Nazwa obszaru"></TextInput>
        </View>
        <View View style={[styles.box, { alignItems: "center", width: "90%" }]}>
          <Picker
            style={{
              backgroundColor: "rgb(219, 219, 219)",
              height: 30,
              width: "100%",
              borderRadius: 20,
            }}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            <Picker.Item label="Podopieczny/grupa" value="Podopieczny/grupa" />
            <Picker.Item label="Anna Nowak" value="Anna Nowak" />
            <Picker.Item label="Jan Kowalski" value="Jan Kowalski" />
          </Picker>
        </View>
        <View style={{ alignItems: "center", width: "90%" }}>
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
                  height: "90%",
                  width: "98vh",
                  flexDirection: "column",
                  padding: 7,
                },
              ]}>
              <MapView
                style={{
                  //...StyleSheet.absoluteFillObject,
                  height: "90%",
                  width: "100vh",
                  alignItems: "center",
                  overflow: "hidden",
                }}
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton={false}
                showsCompass={false}
                showsUserLocation={true}
                initialRegion={{
                  latitude: 51.2376267,
                  longitude: 22.5713683,
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0421,
                }}
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
                            (coord) =>
                              coord.latitude !== coordinate.latitude || coord.longitude !== coordinate.longitude
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
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Pressable
                  style={{
                    margin: 10,
                  }}
                  onPress={() => {
                    resetCoordinates();
                    setModalVisible(false);
                  }}>
                  <Text>Anuluj</Text>
                </Pressable>
                <Pressable
                  style={{
                    margin: 10,
                  }}
                  onPress={() => {
                    resetCoordinates();
                  }}>
                  <Text>Reset</Text>
                </Pressable>
                <Pressable
                  style={{
                    margin: 10,
                  }}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text>Zapisz</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={{ width: "90%" }}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Image
              style={{
                height: 300,
                width: 300,
                borderRadius: 8,
                marginTop: 8,
                marginBottom: 20,
              }}
              source={require("../assets/map.jpg")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AreaTime")}>
            <Text style={{ color: "white" }}>Dalej</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AreaDetail = () => {};

  // lista obszarów
  const AreaSelect = ({ navigation }) => {
    const data = [
      { id: 1, title: "Obszar1" },
      { id: 2, title: "Obszar2" },
    ];
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(221, 222, 223)",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 20,
          padding: 10,
          margin: 10,
          paddingTop: 25,
        }}
        onPress={()=>{
          navigation.navigate('AreaDetail')
        }}>
        <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 8,
            }}>
            {item.title}
          </Text>
          <EviliconsIcon name="user" size={50} color="black" style={{}} />
        </View>
        <View style={{ width: "60%", height: "60%" }}>
          <Image style={{ width: 175, height: 150, borderRadius: 5 }} source={require("../assets/map.jpg")} />
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ alignItems: "center", height: "100%", paddingTop: 25 }}>
        <View style={styles.index}>
          <View></View>
          <Text style={{ textAlign: "center" }}> Obszary</Text>
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() => {
              navigation.navigate("CreateArea");
            }}>
            <AntDesignIcon name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "90%", height: "87%", margin: 5 }}>
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
        </View>
      </View>
    );
  };

  const AreaDetailScreen = () => {
    const coordinates = [
      {"latitude": 51.24433861957029, "longitude": 22.558915726840496},
      {"latitude": 51.24194190277511, "longitude": 22.583090141415596},
      {"latitude": 51.22874754520771, "longitude": 22.571560330688953}
    ];
  
    return (
      <View style={{alignItems: 'center',
      height: '100%',
       }}>
        <View>
        
        </View>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject, borderRadius:20,height:'60%',width:'90%' ,flex:1,}}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={false}
          showsCompass={false}
          
          region={{
            latitude: (Math.min(...coordinates.map(coord => coord.latitude)) + Math.max(...coordinates.map(coord => coord.latitude))) / 2,
            longitude: (Math.min(...coordinates.map(coord => coord.longitude)) + Math.max(...coordinates.map(coord => coord.longitude))) / 2,
            latitudeDelta: Math.max(...coordinates.map(coord => coord.latitude)) - Math.min(...coordinates.map(coord => coord.latitude)) + 0.01,
            longitudeDelta: Math.max(...coordinates.map(coord => coord.longitude)) - Math.min(...coordinates.map(coord => coord.longitude)) + 0.01
          }}
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
      </View>
    );
  };
  

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AreaSelect" component={AreaSelect} />
      <Stack.Screen name="CreateArea" component={CreateArea} />
      <Stack.Screen name="AreaTime" component={AreaTime} />
      <Stack.Screen name="AreaDetail" component={AreaDetailScreen} />

    </Stack.Navigator>
  );
}
