import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2699c7",
    borderRadius: 20,
    padding: 10,
    height: 40,
    width: 150,
    borderColor: `#000000`,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    //shadows
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 16,
    shadowOffset: { width: 1, height: 3 },
  },

  title: {
    //flex: 1,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    //backgroundColor: `#f0ffff`,
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textinput: {
    backgroundColor: `#dbdada`,
    textAlign: "center",
    borderRadius: 20,
    height: 30,
    width: 150,
    margin: 5,
  },
  box: {
    backgroundColor: "rgb(221, 222, 223)",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  index: {
    backgroundColor: "rgb(235, 235, 235)",
    width: "100%",
    height: "5vh",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 16,
    shadowOffset: { width: 1, height: 3 },
    marginBottom: 10,
  },
  acc_titles: {
    color: `#a9a9a9`,
    height: 30,
    width: 150,
    margin: 5,
},
});
export default styles;
