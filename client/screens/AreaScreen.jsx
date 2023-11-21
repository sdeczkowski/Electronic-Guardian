import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, ActivityIndicator, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import EviliconsIcon from "react-native-vector-icons/EvilIcons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/styles";

const Stack = createStackNavigator();

export default function AreaScreen() {
  // czas obszaru
  const AreaTime = ({ route, navigation }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [time2, setTime2] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [showTime2, setShowTime2] = useState(false);
    const [option, setOption] = useState(null);
    const [dateArea, setDateArea] = useState("");
    const [dateReady, setDateReady] = useState(null);
    const [timeArea, setTimeArea] = useState("");
    const [timeReady, setTimeReady] = useState(null);
    const [timeArea2, setTimeArea2] = useState("");
    const [timeReady2, setTimeReady2] = useState(null);
    const [errDate, setErrDate] = useState(false);
    const [errTime, setErrTime] = useState(false);
    const [errTime2, setErrTime2] = useState(false);
    const [check, setCheck] = useState(null);
    let areaData = route.params.data;

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
      setShowTime(!showTime);
    };

    const toggleTimePicker2 = () => {
      setShowTime2(!showTime2);
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
      setTimeArea(`${tempDate.getHours()}:${tempDate.getMinutes() < 10 ? '0' : ''}${tempDate.getMinutes()}`);
    };

    const onChange3 = ({ type }, selectedTime2) => {
      const currentTime2 = selectedTime2 || date;
      setTime2(currentTime2);
      const tempDate2 = new Date(currentTime2);
      toggleTimePicker2();
      setTimeArea2(`${tempDate2.getHours()}:${tempDate2.getMinutes() < 10 ? '0' : ''}${tempDate2.getMinutes()}`);
    };

    const opcje = [
      { id: 1, label: "Codziennie" },
      { id: 2, label: "Co tydzień" },
      { id: 3, label: "Nigdy" },
    ];

    const selectOptions = (optionId) => {
      setOption(optionId);
    };

    const onSubmit = async () => {
      setErrTime(false);
      setErrDate(false);
      setCheck(null);
      const id = await AsyncStorage.getItem("_id");
      if (dateReady === "") {
        setErrDate(true);
        setCheck("Wybierz date!");
      } else if (timeReady === "") {
        setErrTime(true);
        setCheck("Wybierz czas rozpoczęcia!");
      } else if (timeReady2 === "") {
        setErrTime2(true);
        setCheck("Wybierz czas zakończenia!");
      } else if (time >= time2) {
        setErrTime2(true);
        setCheck("Czas zakończenia musi być późniejszy od czasu rozpoczęcia!");
      } else if (option === null) {
        setCheck("Wybierz cykliczność!");
      } else {
        try {
          const url = "http://10.0.2.2:3001/api/area/add";
          await axios.post(url, {
            _opid: id,
            _podid: areaData._podid,
            name: areaData.name,
            cords: areaData.cords,
            initialRegion: areaData.initRegion,
            date: date.toString(),
            repeat: option,
            time_f: time.toString(),
            time_t: time2.toString(),
            isActive: false,
          });
          navigation.navigate("AreaSelect");
        } catch (error) {
          console.log(error);
        }
      }
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
          {showPicker && <DateTimePicker mode="date" display="spinner" minimumDate={new Date()}  value={date} onChange={onChange1} />}
          {!showPicker && (
            <Pressable
              style={[
                styles.box,
                { width: "90%" },
                errDate ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 },
              ]}
              onPress={toggleDatePicker}>
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
          {showTime && (
            <DateTimePicker mode="time" is24hourSource="" display="spinner" value={time} onChange={onChange2} />
          )}
          {!showTime && (
            <Pressable
              style={[
                styles.box,
                { width: "90%" },
                errTime ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 },
              ]}
              onPress={toggleTimePicker}>
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
          {showTime2 && <DateTimePicker mode="time" display="spinner" value={time2} onChange={onChange3} />}
          {!showTime2 && (
            <Pressable
              style={[
                styles.box,
                { width: "90%" },
                errTime2 ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 },
              ]}
              onPress={toggleTimePicker2}>
              <TextInput
                style={[styles.box, { width: "90%", color: "black" }]}
                onPress={toggleTimePicker2}
                onChangeText={setTimeArea2}
                value={timeReady2}
                placeholder="Chose time"
                editable={false}></TextInput>
            </Pressable>
          )}
        </View>
        <Text style={{ color: "red" }}>{check}</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
          <Text style={{ color: "white" }}>Zapisz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // tworzenie nowego obszaru
  const CreateArea = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState();
    const [coordinates, setCoordinates] = useState([]);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Dodaj nowy stan
    const [mapRegionComplete, setRegionComplete] = useState([]);
    const [areaname, setAreaName] = useState("");
    const [pods, setPods] = useState([]);
    const [errName, setErrName] = useState(false);
    const [errPicker, setErrPicker] = useState(false);
    const [check, setCheck] = useState(null);
    const [checkArea, setCheckArea] = useState(null);
    const [loading, setLoading] = useState(true);

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

      //if (!hasIntersections) {
      setCoordinates((prevCoordinates) => [...prevCoordinates, coordinate]);
      //} else {
      //  console.log("Przecięcie! Wyczyszczam obszar.");
      //  resetCoordinates();
      //}
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

    const onSubmit = async () => {
      setErrName(false);
      setErrPicker(false);
      setCheck("");
      if (areaname.trim() == "") {
        setErrName(true);
        setCheck("Podaj nazwe obszaru!");
      } else if (selectedValue == undefined) {
        setErrPicker(true);
        setCheck("Wybierz podopiecznego!");
      } else if (coordinates.length == 0) {
        setCheck("Nie wybrano obszaru!");
      } else {
        const id = await AsyncStorage.getItem("_id");
        try {
          const url = "http://10.0.2.2:3001/api/area/getname/" + id + "/" + areaname;
          axios.get(url).then((response) => {
            if (response && response.data) {
              if (response.data.isname) {
                setErrName(true);
                setCheck("Obszar o podanej nazwie już istnieje!");
              } else {
                let partData = [];
                if (mapRegionComplete.length == 0) {
                  partData = {
                    name: areaname,
                    _podid: selectedValue,
                    initRegion: {
                      latitude: location.latitude,
                      latitudeDelta: location.latitudeDelta,
                      longitude: location.longitude,
                      longitudeDelta: location.longitudeDelta,
                    },
                    cords: coordinates,
                  };
                } else {
                  partData = {
                    name: areaname,
                    _podid: selectedValue,
                    initRegion: mapRegionComplete,
                    cords: coordinates,
                  };
                }
                navigation.navigate("AreaTime", { data: partData });
              }
            }
          });
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    const Setup = async () => {
      const region = await AsyncStorage.getItem("location");
      setLocation(JSON.parse(region));
      setRegionComplete(JSON.parse(region));
      const id = await AsyncStorage.getItem("_id");
      try {
        const url = "http://10.0.2.2:3001/api/user/getpods/" + id;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setPods(response.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const CheckArea = () => {
      setCheckArea("");
      if (coordinates.length < 3) {
        setCheckArea("Obszar musi składać się z conajmniej 3 punktów!");
      } else {
        setModalVisible(false);
      }
    };

    useEffect(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      Setup();
      return () =>
        navigation.getParent()?.setOptions({
          tabBarStyle: styles.tab,
        });
    }, [navigation]);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
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
          <View
            style={[
              styles.box,
              { alignItems: "center", width: "90%" },
              errName ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 },
            ]}>
            <TextInput
              style={{
                paddingLeft: 15,
                height: 50,
                color: "black",
                width: "90%",
              }}
              placeholder="Nazwa obszaru"
              value={areaname}
              onChangeText={(text) => setAreaName(text)}></TextInput>
          </View>
          <View
            View
            style={[
              styles.box,
              { alignItems: "center", width: "90%" },
              pods.length != 0 ? { borderWidth: 0 } : { borderColor: "red", borderWidth: 1 },
              errPicker ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 },
            ]}>
            {pods.length != 0 ? (
              <Picker
                style={{
                  backgroundColor: "rgb(219, 219, 219)",
                  height: 30,
                  width: "100%",
                  borderRadius: 20,
                }}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                <Picker.Item label={"Podopieczny"} value={""} />
                {pods.map((pod) => (
                  <Picker.Item key={pod._podid} label={pod.firstname + " " + pod.lastname} value={pod._podid} />
                ))}
              </Picker>
            ) : (
              <Text style={{ height: 50, paddingTop: 15, width: "100%" }}> Brak podopiecznych </Text>
            )}
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
                <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: "hidden", height: "90%" }}>
                  <MapView
                    style={{
                      //...StyleSheet.absoluteFillObject,
                      height: "99%",
                      width: "100vh",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                    provider={PROVIDER_GOOGLE}
                    showsMyLocationButton={false}
                    showsCompass={false}
                    showsUserLocation={true}
                    initialRegion={location}
                    //onRegionChange={mapRegion}
                    onRegionChangeComplete={(region) => {
                      console.log(region);
                      setRegionComplete({
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta,
                      });
                    }}
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
                        }}>
                        <MaterialIcon name="map-marker" size={25} color="rgb(212, 43, 43)" />
                      </Marker>
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
                <Text style={{ color: "red", textAlign: "center" }}>{checkArea}</Text>
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
                      setCheck("");
                      CheckArea();
                    }}>
                    <Text>Zapisz</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={{ width: "95%", borderRadius: 20, overflow: "hidden" }}
              onPress={() => {
                setModalVisible(true);
              }}>
              <MapView
                style={{
                  //...StyleSheet.absoluteFillObject,
                  height: 350,
                  width: 350,
                  alignItems: "center",
                  overflow: "hidden",
                }}
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton={false}
                scrollEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                zoomEnabled={false}
                showsCompass={false}
                region={mapRegionComplete}>
                {coordinates.map((coordinate, index) => (
                  <Marker key={index} coordinate={coordinate}>
                    <MaterialIcon name="map-marker" size={25} color="rgb(212, 43, 43)" />
                  </Marker>
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
            </TouchableOpacity>
          </View>
          <Text style={{ color: "red", textAlign: "center" }}>{check}</Text>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onSubmit();
              }}>
              <Text style={{ color: "white" }}>Dalej</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const AreaDetail = ({ navigation, route }) => {
    const [pod, setPod] = useState();
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

    const podData = async () => {
      try {
        const url =
          "http://10.0.2.2:3001/api/area/get/" +
          route.params._opid +
          "/" +
          route.params._podid +
          "/" +
          route.params.name;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setPod(response.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const deleteArea = async () => {
      try {
        const url = "http://10.0.2.2:3001/api/area/delete";
        await axios.post(url, {
          _opid: route.params._opid,
          _podid: route.params._podid,
          name: route.params.name,
        });
        navigation.navigate("AreaSelect");
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    useEffect(() => {
      podData();
    }, []);

    const opcje = [
      { id: 1, label: "Codziennie" },
      { id: 2, label: "Co tydzień" },
      { id: 3, label: "Nigdy" },
    ];

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      const coordinates = pod.cords;
      return (
        <View style={{ alignItems: "center", height: "90%", width: "100%", justifyContent: "flex-end" }}>
          <View style={[styles.index, { marginTop: 20, height: 40 }]}>
            <View></View>
            <Text style={{ textAlign: "center" }}> Obszar</Text>
            <View></View>
          </View>
          <View
            style={{
              height: "60%",
              width: "90%",
              flex: 1,
              justifyContent: "flex-end",
              borderRadius: 20,
              overflow: "hidden",
            }}>
            <MapView
              style={{ height: "100%", width: "100%", flex: 1, justifyContent: "flex-end" }}
              provider={PROVIDER_GOOGLE}
              showsMyLocationButton={false}
              scrollEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}
              zoomEnabled={false}
              showsCompass={false}
              region={{
                latitude: pod.initialRegion.latitude,
                longitude: pod.initialRegion.longitude,
                latitudeDelta: pod.initialRegion.latitudeDelta,
                longitudeDelta: pod.initialRegion.longitudeDelta,
              }}>
              {coordinates.map((coordinate, index) => (
                <Marker key={index} coordinate={coordinate}>
                  <MaterialIcon name="map-marker" size={25} color="rgb(212, 43, 43)" />
                </Marker>
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
          <View style={{ padding: 10, width: "100%" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>{pod.name}</Text>
            <Divider></Divider>
            <Text style={{ margin: 2 }}>Podopieczny: {pod.pod_firstname + " " + pod.pod_lastname}</Text>
            <Divider></Divider>
            <Text style={{ margin: 2 }}>Cykliczność: {opcje[pod.repeat - 1].label}</Text>
            <Divider></Divider>
            <Text style={{ margin: 2 }}>Data: {pod.date}</Text>
            <Divider></Divider>
            <Text style={{ margin: 2 }}>Czas od: {pod.time_from}</Text>
            <Text style={{ margin: 2 }}>Czas do: {pod.time_to}</Text>
          </View>
          <View style={{ alignItems: "center", paddingBottom: 20 }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "rgb(212, 43, 43)", alignItems: "center" }]}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={{ color: "white" }}>Usuń obszar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AreaSelect")}>
              <Text style={{ color: "white" }}>Powrót</Text>
            </TouchableOpacity>
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
                  margin: 0,
                  padding: 0,
                },
              ]}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: "70%",
                }}>
                <Text style={[styles.title, { justifyContent: "center" }]}>Usuwanie obszaru</Text>
                <MaterialIcon
                  name="progress-alert"
                  size={130}
                  color="rgb(212, 43, 43)"
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <Text style={[styles.title, { justifyContent: "center", color: "grey", fontSize: 15 }]}>
                  Czy na pewno chesz usunąć obaszar?
                </Text>
              </View>
              <View style={{ height: "20%" }}>
                <Divider bold={true} />
                <View style={{ flexDirection: "row", justifyContent: "space-around", height: "100%" }}>
                  <Pressable
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text style={{ fontSize: 20 }}>Nie</Text>
                  </Pressable>
                  <Divider style={{ width: 1, height: "99%" }} />
                  <Pressable
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                    onPress={() => {
                      deleteArea();
                    }}>
                    <Text style={{ fontSize: 20 }}>Tak</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  };

  // lista obszarów
  const AreaSelect = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setErr] = useState();

    const AreaSelect = async (_podid, name) => {
      const id = await AsyncStorage.getItem("_id");
      navigation.navigate("AreaDetail", { _opid: id, _podid: _podid, name: name });
    };

    const AreaSetup = async () => {
      try {
        const id = await AsyncStorage.getItem("_id");
        const url = "http://10.0.2.2:3001/api/area/getall/" + id;
        axios.get(url).then((response) => {
          if (response && response.data) {
            setData(response.data);
            setLoading(false);
          }
        });
      } catch (error) {
        if (error.response.status == 404) {
          setErr(error.response.data.message);
        }
      }
    };

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
        onPress={() => {
          AreaSelect(item._podid, item.name);
        }}>
        <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 8,
            }}>
            {item.name}
          </Text>
          <EviliconsIcon name="user" size={50} color="black" style={{}} />
        </View>
        <View style={{ width: "45%", height: "95%", borderRadius: 20, overflow: "hidden" }}>
          <MapView
            style={{
              //...StyleSheet.absoluteFillObject,
              height: 150,
              width: 150,
              alignItems: "center",
            }}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton={false}
            scrollEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            showsCompass={false}
            region={item.initialRegion}>
            {item.cords.length > 2 && (
              <Polygon
                strokeColor="blue"
                fillColor="rgba(109, 147, 253, 0.4)"
                strokeWidth={2}
                coordinates={item.cords}
              />
            )}
          </MapView>
        </View>
      </TouchableOpacity>
    );

    useEffect(() => {
      AreaSetup();
    }, []);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
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
            <FlatList
              nestedScrollEnabled
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AreaSelect" component={AreaSelect} />
      <Stack.Screen name="CreateArea" component={CreateArea} />
      <Stack.Screen name="AreaTime" component={AreaTime} />
      <Stack.Screen name="AreaDetail" component={AreaDetail} />
    </Stack.Navigator>
  );
}
