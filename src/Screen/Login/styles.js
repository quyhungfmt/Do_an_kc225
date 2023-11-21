import { StyleSheet } from "react-native";
export const styles = StyleSheet.create(
    {
        headerLogin: {
            width:'100%',
            flex:1.5,
            // justifyContent:'flex-end',
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
            marginTop:20,
            borderRadius:5,
            width:'90%',
            zIndex:0,
        },
        iconInput:{
            position:'absolute',
            left:3,
            zIndex:2,
            pointerEvents:'none',
        },
        IconSecurPass:{
            position:'absolute',
            fontSize:23,
            height:23,
            right:15,
            zIndex:2,
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
            width:100,
            height:50,
            marginTop:50,
            margin:20,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'gray',
            borderBottomLeftRadius:30,
            borderTopRightRadius:30,
            borderWidth:2,
            borderColor:"#fff",
          }
    }
)