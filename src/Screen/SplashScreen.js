/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */

import { View, ActivityIndicator, Image, Switch, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Components/firebaseapp';


const colors = [
  '#fff','#F9E79F','#85C1E9','#F8C471','#F5B7B1','#A9DFBF','#48C9B0',
];
const dsnhom = [
  {id:'1', tentv:'NGUYỄN QUÝ HƯNG',mssv:'B2113188'},
  {id:'2', tentv:'NGUYỄN TRƯỜNG GIANG',mssv:'B2106567'},
  {id:'3', tentv:'NGUYỄN TIẾN THÀNH',mssv:'B2106596'},
  {id:'4', tentv:'VÕ VĂN HUỆ',mssv:'B2100126'},
  {id:'5', tentv:'BÙI THỊ HUỲNH NHƯ',mssv:'B2113297'},
  {id:'6', tentv:'VÕ THANH SANG',mssv:'B2113201'},
];
const head = () => (
  <View style={{
      width:'100%',
      height:70,
      justifyContent:'center',
      paddingLeft:10,
  }}>
      <Text style={{
          color:'#fff',
          fontSize:22,
          fontWeight:'500',
      }}>
          Thành Viên Nhóm 2:
      </Text>
      <View style={{
          flexDirection:'row',
          borderBottomWidth:2,
          
      }}>
          <Text style={{width:'18%',fontSize:20,fontWeight:'600'}}>STT</Text>
          <Text style={{width:'55%',fontSize:20,fontWeight:'600'}}>Họ Tên</Text>
          <Text style={{width:'20%',fontSize:20,fontWeight:'600'}}>MSSV</Text>
      </View>
  </View>
);
const Viewds = ({item}) => (
  <View style={{
      flexDirection:'row',
      margin:5,
      backgroundColor:colors[item.id],
      borderRadius:10,
      borderWidth:1,
      borderColor:'#5DADE2',
  }}>
      <Text style={[styles.text,{width:'10%'}]}>{item.id}</Text>
      <Text style={[styles.text,{width:'50%'}]}>{item.tentv}</Text>
      <Text style={[styles.text,{width:'20%'}]}>{item.mssv}</Text>
  </View>
);


const SplashScreen = ({navigation}) => {
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            navigation.navigate('tabBar');
            console.log('Người dùng đã đăng nhập:', user);
          } else {
              navigation.navigate('Login');
            console.log('Người dùng chưa đăng nhập splass');
          }
        });
      }, []);
return (
  <View style={{
      paddingTop:40,
      flex:1,
      justifyContent:'center',
      alignItems:'center'    ,
      backgroundColor:'#5DADE2',
      }}>
      <FlatList data={dsnhom} renderItem={Viewds} ListHeaderComponent={head}/>
      <TouchableOpacity
      onPress={() => {
          navigation.navigate('Login');
      }}
      style={{
          height:50,
          width:100,
          backgroundColor:'#189011',
          borderRadius:20,
          justifyContent:'center',
          alignItems:'center',
          bottom:5,
          borderWidth:1,
          borderColor:'#BB05B9',
      }}>
          <Text style={styles.text}>
              Next
          </Text>
          
      </TouchableOpacity>
  </View>
);
};

export default SplashScreen;

const styles = StyleSheet.create({
  text: {
      margin:10,
      fontSize:16,
      color:'black',
      fontWeight:'600',
  },
});

