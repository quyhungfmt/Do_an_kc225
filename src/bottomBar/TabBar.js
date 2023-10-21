import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/Home/HomeScreen';
import UserScreen from '../Screen/User/UserScreen';
import Bluetootl from '../Screen/Bluetootl';

const TabBar = ({navigation}) => {
 const tab = createBottomTabNavigator();

  return (
    <tab.Navigator>
        <tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <tab.Screen name="User" component={UserScreen} options={{headerShown:false}}/>
        <tab.Screen name="Ble" component={Bluetootl} options={{headerShown:false}}/>
    </tab.Navigator>
  );
};

export default TabBar;
