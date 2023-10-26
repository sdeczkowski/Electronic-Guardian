import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("token");
    let email = await AsyncStorage.getItem("email");
    let type = await AsyncStorage.getItem("type");
    if (token !== null && email !== null && type !== null) {
      console.log("data fetched");
      dispatch({
        type: "LOGIN",
        token: token,
        email: email,
        utype: type,
      });
    }
  };
};

export const Login = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("type", data.type);
    await AsyncStorage.setItem("email", data.email);
    console.log("data stored");

    dispatch({
      type: "LOGIN",
      token: data.token,
      email: data.email,
      utype: data.type,
    });
  };
};

export const Logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("type");
    await AsyncStorage.removeItem("email");
    dispatch({
      type: "LOGOUT",
    });
  };
};
