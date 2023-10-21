/* eslint-disable no-unused-vars */
import {LogBox} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screen/Login/LoginScreen';
import TabBar from './src/bottomBar/TabBar';
import SplashScreen from './src/Screen/SplashScreen';
import Bluetootl from './src/Screen/Bluetootl';

const App = () => {
  LogBox.ignoreAllLogs();
  const stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
    <stack.Navigator>
      <stack.Screen name="splash" component={Bluetootl} options={{headerShown:false}}/>
      {/* <stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}}/> */}
      <stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <stack.Screen name="tabBar" component={TabBar} options={{headerShown:false}}/>
    </stack.Navigator>
  </NavigationContainer>
  );





  
};

export default App;

