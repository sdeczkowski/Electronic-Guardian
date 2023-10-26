import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput,Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import EviliconsIcon from "react-native-vector-icons/EvilIcons";
import styles from "../styles/styles";
import {Picker} from '@react-native-picker/picker';

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
    const [showPicker, setShowPicker] = useState(false);
    const [option, setOption] = useState(null);

    const toggleDatePicker = () => {
      setShowPicker(!showPicker);
    };
    const onChange = ({ type }, selectedDate) => {
      if (type == "set") {
        const currentDate = selectedDate;
        setDate(currentDate);
      } else {
        toggleDatePicker();
      }
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
            <AntDesignIcon
              name="arrowleft"
              size={20}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Tworzenie obszaru</Text>
          <TouchableOpacity>
            <AntDesignIcon name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        
        {showPicker && (
          <DateTimePicker 
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
        )}
      {!showPicker &&(
        <TouchableOpacity 
          style={styles.textinput} 
          onPress={togglueDatePicker}
        >

        </TouchableOpacity>
      )}
        <View style={{ margin: 10 }}>
          <Text>Cykliczność:</Text>
          {opcje.map((opcja) => (
            <TouchableOpacity
              key={opcja.id}
              onPress={() => selectOptions(opcja.id)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {option === opcja.id ? (
                <AntDesignIcon name="checkcircleo" size={20} color="blue" />
              ) : (
                <EntypoIcon name="circle" size={20} color="black" />
              )}
              <Text>{opcja.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AreaSelect")}
          >
            <Text>Zapisz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // tworzenie nowego obszaru
  const CreateArea = ({ navigation }) => {
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

    const [selectedValue, setSelectedValue] = useState("Podopieczny/grupa");

    return (
      <View style={{ alignItems: "center", height: "100%" , paddingTop: 25 }}>
        <View style={styles.index}>
          <TouchableOpacity>
            <AntDesignIcon
              name="arrowleft"
              size={20}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Tworzenie obszaru</Text>
          <TouchableOpacity style={{ margin: 5 }}>
            <AntDesignIcon name="infocirlceo" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textinput}
            placeholder="Nazwa obszaru"
          ></TextInput>
          <Picker
            style={{
              backgroundColor: "rgb(219, 219, 219)",
              height: 30,
              width: 150,
              borderRadius: 20,
            }}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Podopieczny/grupa" value="Podopieczny/grupa" />
            <Picker.Item label="Anna Nowak" value="Anna Nowak" />
            <Picker.Item label="Jan Kowalski" value="Jan Kowalski" />
          </Picker>
          <TouchableOpacity onPress={{}}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 8,
                marginTop: 8,
                marginBottom: 20,
              }}
              source={require("../assets/map.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AreaTime")}
          >
            <Text>Dalej</Text>
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
      <View
        style={{
          backgroundColor: "rgb(221, 222, 223)",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 20,
          padding: 10,
          margin: 10,
          paddingTop: 25
        }}
      >
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <Text
            style={{ flex: 1, fontSize: 16, fontWeight: "bold", marginLeft: 8 }}
          >
            {item.title}
          </Text>
          <EviliconsIcon name="user" size={50} color="black" style={{}} />
        </View>
        <Image
          style={{ width: 175, height: 150, borderRadius: 5 }}
          source={require("../assets/map.jpg")}
        />
      </View>
    );

    return (
      <View style={{ alignItems: "center", height: "100%" , paddingTop: 25 }}>
        <View style={styles.index}>
          <View></View>
          <Text style={{ textAlign: "center" }}>       Obszary</Text>
          <TouchableOpacity
            style={{ margin: 5 }}
            onPress={() => {
              navigation.navigate("CreateArea");
            }}
          >
            <AntDesignIcon name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "90%", height: "87%", margin: 5 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AreaSelect" component={AreaSelect} />
      <Stack.Screen name="CreateArea" component={CreateArea} />
      <Stack.Screen name="AreaTime" component={AreaTime} />
    </Stack.Navigator>
  );
}
