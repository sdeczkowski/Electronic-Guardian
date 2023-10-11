import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    
    button: {
        backgroundColor: '#28ACE2',
        borderRadius: 20,
        padding: 10,
        height: 40,
        width: 150,
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

    title: {
        //flex: 1,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        //backgroundColor: `#f0ffff`,
    },
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop:10,
        marginBottom: 10,
    },
    textinput: {
        backgroundColor: `#dcdcdc`,
        textAlign: 'center',
        borderRadius: 20,
        height: 30,
        width: 150,
        margin: 5,
    },

})
export default styles;