import {LogBox} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screen/Login/LoginScreen';
import TabBar from './src/bottomBar/TabBar';
import SplashScreen from './src/Screen/SplashScreen';
const App = () => {
  LogBox.ignoreAllLogs();

  const stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
    <stack.Navigator>
      <stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}}/>
      <stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <stack.Screen name="tabBar" component={TabBar} options={{headerShown:false}}/>
    </stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
// import { FlatList, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { Image } from 'react-native-elements';

// const App = () => {
//   const DATA = [
//     {
//       id: 1, path: require('./assets/icon.png'),
//       hoten: 'NGUYỄN QUÝ HƯNG',
//       lop: 'KTĐK & TĐH',
//       khoa: 'Tự động hóa',
//       sothich: 'Ăn, Ngủ',
//       sotruong: 'Ngủ',
//     },
//     {
//       id: 2, path: require('./assets/icon.png'),
//       hoten: 'NGUYỄN TIẾN THÀNH',
//       lop: 'KTĐK & TĐH',
//       khoa: 'Tự động hóa',
//       sothich: 'Ăn và Ngủ',
//       sotruong: 'Ngủ',
//     },
//     {
//       id: 3, path: require('./assets/icon.png'),
//       hoten: 'NGUYỄN TRƯỜNG GIANG',
//       lop: 'KTĐK & TĐH',
//       khoa: 'Tự động hóa',
//       sothich: 'Ăn, Ngủ',
//       sotruong: 'Ngủ',
//     },
//     {
//       id: 4, path: require('./assets/icon.png'),
//       hoten: 'VÕ THANH SANG',
//       lop: 'KTĐK & TĐH',
//       khoa: 'Tự động hóa',
//       sothich: 'Ngủ và Ăn',
//       sotruong: 'Ngủ',
//     },
//     {
//       id: 5, path: require('./assets/icon.png'),
//       hoten: 'VÕ VĂN HUỆ',
//       lop: 'KTĐK & TĐH',
//       khoa: 'Tự động hóa',
//       sothich: 'Ăn, Ngủ',
//       sotruong: 'Ngủ',
//     },
//     {
//       id: 6, path: require('./assets/icon.png'),
//       hoten: 'BÙI THỊ HUỲNH NHƯ',
//       lop: 'KTĐK & TĐH',
//       khoa: 'Tự động hóa',
//       sothich: 'Ngủ và Ăn',
//       sotruong: 'Ngủ',
//     },
//   ];
//   const [selectedId, setSelectedId] = useState(null);
//   const Item = ({ item, onPress, backgroundColor }) => (
//     <View style={[styles.flatlist, backgroundColor]}>
//       <Image
//         transitionDuration={500}
//         source={item.path}
//         style={{ width: 60, height: 60, }}
//         onPress={onPress}
//       />
//       <View style={{ flex: 1, }}>
//         <Text style={{ flex: 1, marginLeft: 20, }}>
//           Họ và tên: {item.hoten}</Text>
//         <Text style={{ flex: 1, marginLeft: 20, }}>Lớp: {item.lop}</Text>
//         <Text style={{ flex: 1, marginLeft: 20, }}>Khoa: {item.khoa}</Text>
//         <Text style={{ flex: 1, marginLeft: 20, }}>Sở thích: {item.sothich}</Text>
//         <Text style={{ flex: 1, marginLeft: 20, }}>Sở trường: {item.sotruong}</Text>
//       </View>
//     </View>
//   );
//   const renderItem = ({ item }) => {
//     const backgroundColor = (item.id % 2 != 0) ? "lightblue" : "lightgray";
//     return (
//       <Item
//         item={item}
//         onPress={() => {
//           setSelectedId(item.id);
//         }}
//         backgroundColor={{ backgroundColor }}
//       />
//     );
//   };
//   return (
//     <View style={styles.Container}>
//       <View style={styles.header}>
//         <Image
//           transitionDuration={500}
//           source={require('./assets/icon.png')}
//           style={{ width: 60, height: 60 }}
//           onPress={() => alert('Xin chào, Chúng tôi là Nhóm 1!')}
//         />
//         <Text style={styles.h_text}>LABO2-ND2-PHẦN TỬ GIAO DIỆN CƠ BẢN</Text>

//       </View>
//       <View style={styles.list_view}>
//         <FlatList data={DATA} renderItem={renderItem}></FlatList>
//       </View>
//     </View>
//   )
// }

// export default App;

// const styles = StyleSheet.create({
//   h_text: {
//     color: 'blue',
//     textAlign: 'center',
//     fontSize: 20,
//     width: 300,
//     marginLeft: 15,
//   },
//   Container: {
//     flex: 1,
//   },
//   header: {
//     flex: 0.7,
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingLeft: 10,
//     backgroundColor: 'lightgray',
//     borderRadius: 10,
//     margin: 1,
//   },
//   list_view: {
//     flex: 4,
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     borderWidth: 2,
//     borderColor: 'blue',
//     borderRadius: 8,
//     margin: 1,
//   },
//   flatlist: {
//     padding:10,
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//     margin:2,
//     borderRadius:10
//   }

// })








// thay lệnh const backgroundColor = (item.id % 2 != 0) ? "lightblue" : "lightgray";
// thành lệnh const backgroundColor = (item.id % 2 != 0) ? "lightyellow" : "lightblue";
