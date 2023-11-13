/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/Home/HomeScreen';
import UserScreen from '../Screen/User/UserScreen';
import { Icon } from 'react-native-elements';
import { Alert, Text, View } from 'react-native';
import SplashScreen from '../Screen/SplashScreen';
import Team from '../Screen/User/Team';

const TabBar = ({navigation}) => {
    React.useEffect( () =>
    navigation.addListener('beforeRemove',(e) => {
      e.preventDefault();
      Alert.alert(
        'ĐĂNG XUẤT?',
        'Xác Nhận Đăng Xuất Khỏi Tài Khoản?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () =>{},
          },
        ]
      );
    }),[]
    );
 const tab = createBottomTabNavigator();
  const Icontab = ({icon,lable,focused}) => {
    return (
      <View style={{
        backgroundColor:focused ? '#e5e5e5' : 'white',
        width:'100%',
        alignItems:'center',
        borderRadius:10,
      }}>

        <Icon name={icon} size={22} color={focused ? 'blue' : 'gray'} />
        <Text style={{
          fontSize:13,
          fontWeight:'700',
          color:focused ? 'blue' : 'gray',
        }}>
          {lable}
        </Text>
      </View>
    );
  };
  return (
    <tab.Navigator
    screenOptions={() => ({
      tabBarHideOnKeyboard:true,
      tabBarShowLabel:false,
    })}
    >
        <tab.Screen name="Home" component={HomeScreen} options={{headerShown:false,tabBarIcon: ({focused}) => {
          return <Icontab lable={'HOME'} icon={'home'} focused={focused}/>;
        }}}/>
        <tab.Screen name="Setting" component={UserScreen} options={{headerShown:false,tabBarIcon:({focused}) => {
          return <Icontab lable={'SETTING'} icon={'storage'} focused={focused}/>;
        }}}/>
        <tab.Screen name="TEAM" component={Team} options={{headerShown:false,tabBarIcon:({focused}) => {
          return <Icontab lable={'TEAM_02'} icon={'groups'} focused={focused}/>;
        }}}/>
    </tab.Navigator>
  );
};

export default TabBar;
