import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import axios from "axios";

const Role = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={[styles.img, { width: 200, height: 200 }]} source={require("../assets/uni.png")} />
      <Text>Wybierz role</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          navigation.navigate("Register", { type: "op" });
        }}>
        <Text style={{ color: "white" }}>Opiekun</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          //dispatch(Type(2));
          navigation.navigate("Register", { type: "pod" });
        }}>
        <Text style={{ color: "white" }}>Podopieczny</Text>
      </TouchableOpacity>
    </View>
  );
};

const Register = ({ route, navigation }) => {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordrepeat, setPasswordRepeat] = useState("");
  const { type } = route.params;

  const [check, setCheck] = useState(null);
  const [errFname, setErrFname] = useState(false);
  const [errLname, setErrLname] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPhone, setErrPhone] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [errRPass, setErrRPass] = useState(false);

  const handleSignUp = async () => {
    setCheck(null);
    setErrFname(false);
    setErrLname(false);
    setErrEmail(false);
    setErrPhone(false);
    setErrPass(false);
    setErrRPass(false);
    const namesRegex = /^[a-z ,.'-]+$/i;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!namesRegex.test(firstname)) {
      setErrFname(true);
      setCheck("Niepoprawne imie!");
    } else if (!namesRegex.test(lastname)) {
      setErrLname(true);
      setCheck("Niepoprawne nazwisko!");
    } else if (!emailRegex.test(email)) {
      setErrEmail(true);
      setCheck("Niepoprawny email!");
    } else if (phone.length < 9) {
      setErrPhone(true);
      setCheck("Niepoprawny numer telefonu!");
    } else if (password == "") {
      setErrPass(true);
      setCheck("Wpisz hasło!");
    } else if (password != passwordrepeat) {
      setErrPass(true);
      setErrRPass(true);
      setCheck("Hasła nie są identyczne!");
    } else {
      try {
        console.log(type);
        const url = "http://10.0.2.2:3001/api/signup";
        await axios.post(url, {
          password: password,
          email: email,
          firstname: firstname,
          lastname: lastname,
          isActive: true,
          type: type,
          phoneNumber: phone,
        });
        navigation.navigate("Login");
      } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          if (error.response.status == 409) {
            if (error.response.data.message == "Konto z podanym emailem już istnieje") {
              setErrEmail(true);
            } else {
              setErrPass(true);
              setErrRPass(true);
            }
            setCheck(error.response.data.message);
          }
        }
      }
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 25,
      }}>
      <Image style={[styles.img, { width: 200, height: 200 }]} source={require("../assets/uni.png")} />
      <Text style={{ color: "red" }}>{check}</Text>
      <TextInput
        style={[styles.textinput, errFname ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        label="firstname"
        placeholder="Imię"
        placeholderTextColor="rgb(145, 145, 145)"
        value={firstname}
        onChangeText={(text) => setFirst(text)}></TextInput>
      <TextInput
        style={[styles.textinput, errLname ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        label="lastname"
        placeholder="Nazwisko"
        placeholderTextColor="rgb(145, 145, 145)"
        value={lastname}
        onChangeText={(text) => setLast(text)}></TextInput>
      <TextInput
        style={[styles.textinput, errEmail ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        label="email"
        placeholder="E-mail"
        placeholderTextColor="rgb(145, 145, 145)"
        value={email}
        onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput
        style={[styles.textinput, errPhone ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        label="phone"
        placeholder="123456789"
        placeholderTextColor="rgb(145, 145, 145)"
        maxLength={9}
        keyboardType="numeric"
        value={phone}
        onChangeText={(text) => setPhone(text)}></TextInput>
      <TextInput
        style={[styles.textinput, errPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        label="password"
        placeholder="Hasło"
        placeholderTextColor="rgb(145, 145, 145)"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}></TextInput>
      <TextInput
        style={[styles.textinput, errRPass ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }]}
        placeholder="Powtórz hasło"
        placeholderTextColor="rgb(145, 145, 145)"
        value={passwordrepeat}
        onChangeText={(text) => setPasswordRepeat(text)}
        secureTextEntry={true}></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: "white" }}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
};
export { Register, Role };
