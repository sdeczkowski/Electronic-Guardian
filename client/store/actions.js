import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("token");
    let email = await AsyncStorage.getItem("email");
    let type = await AsyncStorage.getItem("type");
    let id = await AsyncStorage.getItem("_id");
    if (token !== null && email !== null && type !== null) {
      console.log("data fetched");
      dispatch({
        type: "LOGIN",
        token: token,
        email: email,
        utype: type,
        _id: id,
      });
    }
  };
};

export const Login = (data) => {
  return async (dispatch) => {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("type", data.type);
    await AsyncStorage.setItem("email", data.email);
    await AsyncStorage.setItem("_id", data._id);
    console.log("data stored");

    dispatch({
      type: "LOGIN",
      token: data.token,
      email: data.email,
      utype: data.type,
      _id: data._id,
    });
  };
};

export const Logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("type");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("_id");
    dispatch({
      type: "LOGOUT",
    });
  };
};
