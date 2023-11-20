/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */

import { View, ActivityIndicator, Image, Switch, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Components/firebaseapp';
import { ImageBackground } from 'react-native';

const SplashScreen = ({navigation}) => {
    useEffect(() => {
      setTimeout(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            navigation.navigate('tabBar');
            console.log('Người dùng đã đăng nhập:', user);
          } else {
              navigation.navigate('Login');
            console.log('Người dùng chưa đăng nhập splass');
          }
        });
      }, 2000);
      }, []);
return (
  <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center'    ,
      backgroundColor:'#afe0ef',
      }}>
      <ImageBackground
        source={require('../../assets/0305-logo-ctu.png')}
        style={{
          width: 150,
          height: 150,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
        imageStyle={{ 
          opacity: 0.5,
          borderWidth:1,
          borderRadius:150,
          borderColor:'blue'
        }}
      ></ImageBackground>
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

