/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/Home/HomeScreen';
import UserScreen from '../Screen/User/UserScreen';
import { Icon } from 'react-native-elements';
import { Alert, Text, View } from 'react-native';
import Team from '../Screen/User/Team';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../Components/firebaseapp';

const TabBar = ({navigation}) => {
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('List', jsonValue);
    } catch (e) {
    }
  };
  function LogOut() {
    signOut(auth).then(() => {
      console.log('done');
      storeData([]);
      navigation.navigate('Login');
    }).catch((error) => {
    });
  }
    React.useEffect( () =>{
    const listen = navigation.addListener('beforeRemove',(e) => {
      e.preventDefault();
      Alert.alert(
        'ĐĂNG XUẤT?',
        'Xác Nhận Đăng Xuất Khỏi Tài Khoản?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () =>{
              listen();
              LogOut();
            },
          },
        ]
      );
      return listen;
    });
  },[]);
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
          return <Icontab lable={'CONTROLS'} icon={'settings'} focused={focused}/>;
        }}}/>
        <tab.Screen name="Setting" component={UserScreen} options={{headerShown:false,tabBarIcon:({focused}) => {
          return <Icontab lable={'LIST_DEVICES'} icon={'storage'} focused={focused}/>;
        }}}/>
        <tab.Screen name="TEAM" component={Team} options={{headerShown:false,tabBarIcon:({focused}) => {
          return <Icontab lable={'TEAM_02'} icon={'groups'} focused={focused}/>;
        }}}/>
    </tab.Navigator>
  );
};

export default TabBar;
