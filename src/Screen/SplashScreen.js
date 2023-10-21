/* eslint-disable no-shadow */
/* eslint-disable no-trailing-spaces */

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */

import { View, ActivityIndicator, Image, Switch, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const dsnhom = [
  {id:'1', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  {id:'2', tentv:'NGUYỄN TRƯỜNG GIANG',mssv:'B2113188'},
  {id:'3', tentv:'NGUYỄN TIẾN THÀNH',mssv:'B2113188'},
  {id:'4', tentv:'VÕ VĂN HUỆ',mssv:'B2113188'},
  {id:'5', tentv:'BÙI THỊ HUỲNH NHƯ',mssv:'B2113188'},
  // {id:'7', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'8', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'9', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'10', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'11', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'12', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'13', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'14', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'15', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'16', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'17', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'18', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'19', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  // {id:'20', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
];
const head = () => (
   <View style={{
    flex:1,
    justifyContent:'center',
   }}>
    <Text style={{
      fontSize:22,
      fontWeight:'900',
      marginBottom:10,
    }}>
     Thành Viên Nhóm 2:
    </Text>
    <View style={{
    flex:1,
    flexDirection:'row',
    width:'100%',
    }}>
    <Text style={{
      width:'15%',
      fontSize:16,
      color:'black',
      fontWeight:'600',
      textAlignVertical:'center',
      borderWidth:2,
      padding:10,
    }}>
     STT
    </Text>
    <Text style={{
      width:'50%',
      fontSize:16,
      color:'black',
      fontWeight:'600',
      textAlignVertical:'center',
      borderWidth:2,
      padding:10,
    }}>
     TÊN
    </Text>
    <Text style={{
      width:'35%',
      fontSize:16,
      color:'black',
      fontWeight:'600',
      textAlign:'center',
      textAlignVertical:'center',
      borderWidth:2,
      padding:10,
    }}>
        MSSV
    </Text>
  </View>
   </View>
);
const Viewds = ({item}) => (
  <View style={{
    flex:1,
    flexDirection:'row',
    width:'100%',
    }}>
    <Text style={{
      width:'15%',
      fontSize:16,
      color:'black',
      fontWeight:'600',
      textAlignVertical:'center',
      borderWidth:2,
      padding:10,
    }}>
     {item.id}
    </Text>
    <Text style={{
      width:'50%',
      fontSize:16,
      color:'black',
      fontWeight:'600',
      textAlignVertical:'center',
      borderWidth:2,
      padding:5,
    }}>
     {item.tentv}
    </Text>
    <Text style={{
      width:'35%',
      fontSize:16,
      color:'black',
      fontWeight:'600',
      textAlignVertical:'center',
      borderWidth:2,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:5,
    }}>
      MSSV: {item.mssv}
    </Text>
  </View>
);

const SplashScreen = ({navigation}) => {
    const [sw,setsw] = useState(true);

  return (
      <View style={{
        flex:1,
        alignItems:'center',
      }}>
        <FlatList
      ListHeaderComponent={head}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
      }}
        data={dsnhom}
        renderItem={Viewds}
        keyExtractor={dsnhom => dsnhom.id}
      />
      <TouchableOpacity
      style={{
        position:'absolute',
        backgroundColor:'blue',
        height:50,
        width:100,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        bottom:10,
        right:15,
      }}
      onPress={()=>{
        navigation.navigate("Login")
      }}>
        <Text style={{
          color:'white',
          fontWeight:'500'
        }}>
          NEXT
        </Text>
      </TouchableOpacity>
      </View> 
  );
};
export default SplashScreen;

