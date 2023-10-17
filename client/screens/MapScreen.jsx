import * as React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import stylemain from "../styles/stylemain";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function MapScreen() {
  return (
    <View style={{ height: "88%" }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
        <View style={stylemain.leftbar}>
          <Ionicons name="person-circle-sharp" size={50} color="grey" />
          <Text style={{margin: 10}}>Nazwa użytkownika</Text>
          <TouchableOpacity style={{margin:10}}>
            <Ionicons name="chevron-down-outline" size={32} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 65 }}>
          <TouchableOpacity style={stylemain.button} onPress={{}}>
            <Ionicons name="notifications-outline" size={32} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ alignSelf: "flex-end", height: 65, width: 65 }}>
          <TouchableOpacity style={[stylemain.button, { alignSelf: "flex-end" }]}>
            <Ionicons name="qr-code-outline" size={32} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}