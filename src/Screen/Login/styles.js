import { StyleSheet } from "react-native";
export const styles = StyleSheet.create(
    {
        headerLogin: {
            width:'100%',
            flex:1.5,
            justifyContent:'flex-end',
            alignItems:'center',
            justifyContent:'center'
        },
        headerText:{
            color:'#fff',
            fontSize:50,
            fontWeight:'900',
            top:20
        },
        container: {
            justifyContent:'center',
            alignItems:'center',
            width:'90%',
            marginTop:20,
        },
        viewInput: {
            width:'100%',
            marginTop:20,
            borderRadius:5,
            width:'90%',
        },
        iconInput:{
            left:25,
            zIndex:1,
        },
        IconSecurPass:{
            fontSize:23,
            height:23,
            right:30,
        },
        textInput: {
            borderBottomWidth:2,
            height:50,
            paddingLeft:25,
            backgroundColor:'rgba(255,255,255,0.5)',
            borderRadius:20,
            borderWidth:1,
            borderColor:'#fff',
            width:'93%',
            color:'#fff',
            fontWeight:'500',
        },
        textValidate: {
            fontSize:16,
            left:10,
            top:5,
            borderBottomWidth:1,
            width:'90%',
        },
        styleButtonLogin: {
            width:'50%',
            height:50,
            marginTop:50,
            margin:20,
            shadowOffset: { height: 1, width: 1 }, 
            shadowOpacity:1,
            shadowRadius:20,
            shadowColor:'black',
            elevation:15,
            borderRadius:40,
          }
    }
)