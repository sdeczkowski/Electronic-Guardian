import { StyleSheet } from "react-native";
const stylemain = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        height: 65, 
        width: 65,
        borderColor: `#000000`,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        //shadows
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 16 ,
        shadowOffset : { width: 1, height: 3},
    },

    leftbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 50,
        padding: 5,
        margin: 10,
        height: 65,
        width: "30vh",
        backgroundColor: "white",
        //shadows
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.5,
        elevation: 1,
        shadowRadius: 16 ,
        shadowOffset : { width: 1, height: 3}
    }
})
export default stylemain;