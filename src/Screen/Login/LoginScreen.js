/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */


import {View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, Animated} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {styles} from './styles';
import { loginFirebaseAuth, validateEmail, validatePass } from './functionLogin';
import { Icon } from 'react-native-elements';
import { BackHandler } from 'react-native';
const LoginScreen = ({navigation}) => {
  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });
  const [loginAnimation,setloginAnimation] = useState(true);
  const [email, setemail] = useState('');
  const [passWord, setpassWord] = useState('');
  const [securePass, setsecurePass] = useState(true);
  const [validateBorderEmail,setvalidateBorderEmail] = useState('white');
  const [validateBorderPass,setvalidateBorderPass] = useState('white');

  const [validateColorEmail,setvalidateColorEmail] = useState('transparent');
  const [validateColorPass,setvalidateColorPass] = useState('transparent');

  const [validateEmailValue,setValidateEmailText] = useState('');
  const [validatePassValue,setvalidatePassText] = useState('');
  const animation = useRef(new Animated.Value(-1)).current;
  
  useEffect(() => {
    Animated.timing(animation,{
      toValue:1,
      duration:3000,
      useNativeDriver:true,
    }).start();
  },[animation]);
  return (
    <ImageBackground source={require('../../../assets/backgrounglogin.jpg')} style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    }}>
      <View style={{
          flex:1,
          alignItems:'center',
          }}>
          <View  style={styles.headerLogin}>
            <Animated.View style={{
              opacity:animation,
            }}>
            <Text style={styles.headerText}>
              Login
            </Text>
            </Animated.View>
          </View>
          {/* body login */}
          <View style={{flex:3,width:'100%',alignItems:'center'}}>
              <View style={styles.container}>
              <View style={styles.viewInput}>
              <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
              {/* icon */}
              <View style={styles.iconInput}>
               <Icon name='email' color={'black'}/>
              </View>
              <TextInput
               placeholder="Email"
               keyboardType="email-address"
               placeholderTextColor={'#fff'}
               maxLength={20}
               style={{
                ...styles.textInput,
                borderColor:validateBorderEmail,
               }}
               value={email}
               onChangeText={(text) => {
                validateEmail(text,setValidateEmailText,setvalidateColorEmail,setvalidateBorderEmail);
                setemail(text);
               }}
               />
              </View>
              <Text style={{
                ...styles.textValidate,
                color:validateColorEmail,
                borderColor:validateColorEmail,
                }}>{validateEmailValue}</Text>
              </View>

              <View style={styles.viewInput}>
              <View style={{width:'100%',flexDirection:'row',alignItems:'center',borderRadius:10}}>
              {/* icon */}
              <View style={styles.iconInput}>
              <Icon name='lock' color={'black'} size={22}/>
              </View>
              <TextInput
               placeholder="PassWord"
               maxLength={20}
               placeholderTextColor={'#fff'}
               secureTextEntry={securePass}
               style={{
                ...styles.textInput,
                borderColor:validateBorderPass,
               }}
               value={passWord}
               onChangeText={(text) => {
                validatePass(text,setvalidatePassText,setvalidateColorPass,setvalidateBorderPass);
                setpassWord(text);
               }}
               />
              {/* icon */}
              <View style={styles.IconSecurPass}>
                <Icon type='material' 
                name={securePass?'visibility-off':'visibility'} size={25}
                onPress={() => {
                  console.log(validatePass(passWord,setvalidatePassText,setvalidateColorPass,setvalidateBorderPass))
                  setsecurePass(!securePass);
                }}
                />
              </View>
              </View>
              <Text style={{
                ...styles.textValidate,
                color:validateColorPass,
                borderColor:validateColorPass,
              }}>{validatePassValue}</Text>
              </View>


              <TouchableOpacity
                style={styles.styleButtonLogin}
                onPress={() => {
                  if (validatePass(passWord,setvalidatePassText,setvalidateColorPass,setvalidateBorderPass) &&
                  validateEmail(email,setValidateEmailText,setvalidateColorEmail,setvalidateBorderEmail)
                  ){loginFirebaseAuth(email,passWord,navigation);}
                }}
                >
                  <Text style={{
                    color:'#fff',
                    fontSize:20,
                    fontWeight:'700',
                  }}>
                    Login
                  </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

    </ImageBackground>
  );
};

export default LoginScreen;
