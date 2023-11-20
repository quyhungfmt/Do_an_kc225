/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { LogBox } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screen/Login/LoginScreen';
import TabBar from './src/bottomBar/TabBar';
import SplashScreen from './src/Screen/SplashScreen';
// // const App = () => {
// //   LogBox.ignoreAllLogs();

// //   const stack = createNativeStackNavigator();
// //   return (
// //    <NavigationContainer>
// //     <stack.Navigator>
// //       <stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}}/>
// //       <stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
// //       <stack.Screen name="tabBar" component={TabBar} options={{headerShown:false}}/>
// //     </stack.Navigator>
// //   </NavigationContainer>
// //   );
// // };


// import { View, Text } from 'react-native'
// import React from 'react'

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
  )
}

export default App

// import React, { useState, useEffect } from 'react';
// import {
//   Text, View, StyleSheet, FlatList,
//   NativeModules, PermissionsAndroid, NativeEventEmitter,
//   Platform,
// } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { Image, Input, Button } from 'react-native-elements';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import BleManager from 'react-native-ble-manager';
// import { Buffer } from 'react-native-buffer';
// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const App = () => {

//   LogBox.ignoreAllLogs();
//   function ComunicationScreen() {
//     const [pwm, setPWM] = useState(0);
//     const [button, setButton] = useState(0);
//     const [counter, setCounter] = useState(0);
//     const [connectedDeviceID, setConnectedDeviceID] = useState(' ');
//     const [connectedServiceUUID, setConnectedServiceUUID] = useState(' ');
//     const [connectedCharUUID1, setConnectedCharUUID1] = useState(' ');
//     const [connectedCharUUID2, setConnectedCharUUID2] = useState(' ');
//     const [connectedCharUUID3, setConnectedCharUUID3] = useState(' ');
//     const [isConnected, setIsConnected] = useState(false);
//     const ReadData = () => {
//       console.log(connectedDeviceID)
//       console.log(connectedServiceUUID)
//       console.log(connectedCharUUID3)
//       BleManager.read(connectedDeviceID, connectedServiceUUID, connectedCharUUID3)
//         .then((readData) => {
//           let data = Buffer.from(readData);
//           let conver = data.toString('ascii');
//           console.log(conver);
//           global.counter = conver + " mV"
//         })
//         .catch((error) => {
//           console.log(error);
//           console.log(connectedDeviceID)
//           console.log(connectedServiceUUID)
//           console.log(connectedCharUUID3)
//         });
//     };
//     const writeLed = (deviceID, serviceUUID, charUUID, value) => {
//       //In để kiểm tra
//       console.log(value);
//       const buffer = Buffer.from(value.toString());
//       let A = buffer.toJSON().data;
//       BleManager.write(deviceID, serviceUUID, charUUID,
//         A) // Ghi chuỗi ASCII của các số
//         .then(() => {
//           // Success code
//         })
//         .catch((error) => {
//           // Failure code
//           console.log(error);
//         });
//     };
//     // Định nghĩa lại hàm để nạp vào sự kiện của Button, có thể gọi hàm writeLed trực tiếp
//     const writePWM = () => {
//       writeLed(connectedDeviceID, connectedServiceUUID, connectedCharUUID2, parseInt(pwm));
//     }
//     //ĐỊnh thời cập nhật biến toàn cục, một ví dụ trao đổi thông tin giữa các màn hình
//     setInterval(() => {
//       if (!isConnected) {
//         setConnectedDeviceID(global.connectedID);
//         setConnectedServiceUUID(global.connectedServiceUUID);
//         setConnectedCharUUID1(global.connectedCharUUID1);
//         setConnectedCharUUID2(global.connectedCharUUID2);
//         setConnectedCharUUID3(global.connectedCharUUID3);
//         setIsConnected(global.isConnected);
//       }
//       if (isConnected) {
//         // Cho các dữ liệu trao đổi khi đã kết nối với GATT server
//         setButton(global.rData);
//         setCounter(global.counter);
//       }
//     }, 100);
//     return (
//       <View style={styles.Container}>
//         <View style={styles.header}>
//           <Image
//             transitionDuration={100}
//             source={!isConnected
//               ? require('./assets/0305-logo-ctu.png')
//               : require('./assets/0305-logo-ctu.png')}
//             style={{ width: 50, height: 50, marginRight: 10, }}
//           />
//           <View style={{
//             flex: 0, alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//             <Text style={styles.h_text}>LABO3-ND2-Comunication Screen</Text>
//             {(isConnected) && <Text style={{ marginTop: 10, }}>
//               Connected to {connectedDeviceID}
//             </Text>}
//             {(!isConnected) && <Text style={{ marginTop: 10, }}>No connected device</Text>}
//           </View>
//         </View>
//         <View style={styles.input}>
//           <View style={styles.content}>
//             <Input
//               label="PWM Value:"
//               leftIcon={<Icon name="cancel" size={25} />}
//               placeholder="0..255"
//               color='blue' keyboardType="numeric"
//               value={pwm}
//               onChangeText={(pwm) => {
//                 setPWM(pwm);
//               }}
//               labelStyle={{ color: 'blue' }}
//               inputStyle={{ color: 'blue', textAlign: 'center' }}
//               containerStyle={{ width: '65%', }}
//             />
//             <Button
//               title='Write'
//               containerStyle={{
//                 width: '33%',
//                 marginLeft: 1,
//                 paddingRight: 5,
//               }}
//               onPress={writePWM}
//             />
//           </View>
//           <View style={styles.content}>
//             <Text style={{ fontSize: 24, width: '65%', paddingLeft: 10, }}>
//               Boot Button State:
//             </Text>
//             <Text style={{ fontSize: 24, color: 'blue', width: '33%' }}>
//               {button == 49 ? 'TRUE' : 'FALSE'}
//             </Text>
//           </View>
//           <View style={styles.content}>
//             <Button onPress={() => { ReadData() }} title={"Read Voltage"} />
//             <Text style={{
//               fontSize: 26, color: 'blue', width: '48%',
//               textAlign: 'center'
//             }}>
//               {counter} {/*Gọi sẵn để kiểm tra kết quả việc tạo characteristic 3*/}
//             </Text>
//           </View>
//         </View>
//       </View >
//     );
//   };
//   const FindDeviceScreen = ({ navigation }) => {
//     const [selectedId, setSelectedId] = useState(null);
//     const [isScanning, setIsScanning] = useState(false);
//     const [isConnected, setIsConnected] = useState(false);
//     const [list, setList] = useState([]);
//     const peripherals = new Map();
//     const [connectedID, setConnectedID] = useState(" ");
//     const DATA = [
//       {
//         id: 1,
//         path: require('./assets/0305-logo-ctu.png'), // SV cần tìm và lưu hình vào thư mục imgs
//       },
//     ];
//     const startScan = () => {
//       if (!isScanning) {
//         BleManager.scan([], 1, true).then((results) => {
//           console.log('Scanning...');
//           setIsScanning(true);
//         }).catch(err => {
//           console.error(err);
//         });
//       }
//     }
//     // Xử lý sự kiện ngừng quyét
//     const handleStopScan = () => {
//       console.log('Scan is stopped');
//       setIsScanning(false);
//     }
//     // Xử lý sự kiện ngắt kết nối
//     const handleDisconnectedPeripheral = (data) => {
//       let peripheral = peripherals.get(data.peripheral);
//       if (peripheral) {
//         peripheral.connected = false;
//         setIsConnected(false);
//         global.isConnected = false;
//         peripherals.set(peripheral.id, peripheral);
//         // Xóa danh sách thiết bị và gọi quét lại
//         setList([]);
//         startScan();
//       }
//     }
//     const retrieveConnected = () => {
//       BleManager.getConnectedPeripherals([]).then((results) => {
//         if (results.length == 0) {
//           console.log('No connected peripherals')
//         }
//         console.log(results);
//         for (var i = 0; i < results.length; i++) {
//           var peripheral = results[i];
//           console.log(results[i]);
//           peripheral.connected = true;
//           peripherals.set(peripheral.id, peripheral);
//           setList(Array.from(peripherals.values()));
//         }
//       });
//     }
//     // Device found handler
//     const handleDiscoverPeripheral = (peripheral) => {
//       console.log('Got ble peripheral', peripheral);
//       if (!peripheral.name) {
//         peripheral.name = 'NO NAME';
//       }
//       peripherals.set(peripheral.id, peripheral);
//       setList(Array.from(peripherals.values()));
//     }
//     //Đọc và xử lý dữ liệu từ GATT server
//     const handleUpdateValueForCharacteristic = (data) => {
//       // Mã lệnh thay đổi tùy theo ứng dụng
//       // Đọc mã ASCII từ GATT gửi vể (trạng thái phím), VD: 0 gửi 48, 1 gửi 49
//       if (data.characteristic == global.connectedCharUUID1) {
//         global.rData = data.value;
//         // In kiểm tra dữ liệu nhận, có thể đổi ký số dạng ASCII thành chuỗi số
//         // bằng hàm String.fromCharCode, bỏ chú thích để thử
//         // console.log(String.fromCharCode(data.value));
//         console.log(data.value);
//       }
//       // Viết code cho trường hợp yêu cầu thêm characteristic 3
//       // bỏ chú thích để sử dụng lệnh gợi ý
//       if (data.characteristic == global.connectedCharUUID3) {
//         let datas = Buffer.from(data.value);
//         let conver = datas.toString('ascii');
//         console.log(data.value);
//         console.log(conver);
//         global.counter = conver;
//       }
//     }
//     // Cài đặt các sự kiện và quyền truy cập vị trí, quét tìm thiết bị
//     useEffect(() => {
//       BleManager.start({ showAlert: false });
//       bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
//       bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
//       bleManagerEmitter.addListener('BleManagerDisconnectPeripheral',
//         handleDisconnectedPeripheral);
//       bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic',
//         handleUpdateValueForCharacteristic);
//       if (Platform.OS === 'android' && Platform.Version >= 23) {
//         PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
//           .then((result) => {
//             if (result) {
//               console.log("Permission is OK");
//             } else {
//               PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
//                 .then((result) => {
//                   if (result) {
//                     console.log("User accept");
//                   } else {
//                     console.log("User refuse");
//                   }
//                 });
//             }
//           });
//         // Yêu cầu người sử dụng cấp phép SCAN
//         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)
//           .then((result) => {
//             if (result) {
//               console.log("BLE Scan is OK");
//             }
//           })
//       }
//       return (() => {
//       })
//     }, [])
//     const ble_connect = (peripheral) => {
//       if (peripheral) {
//         BleManager.connect(peripheral.id).then(() => {
//           setConnectedID(peripheral.id);
//           setIsConnected(true);
//           // Cập nhật các biến toàn cục sử dụng cho các màn hình
//           global.isConnected = true;
//           global.connectedID = peripheral.id;
//           setTimeout(() => {
//             ///* Test read current RSSI value */
//             BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
//               console.log('Retrieved peripheral services', peripheral);
//               BleManager.readRSSI(peripheral.id).then((rssi) => {
//                 let p = peripherals.get(peripheral.id);
//                 if (p) {
//                   p.rssi = rssi;
//                   peripherals.set(peripheral.id, p);
//                   setList(Array.from(peripherals.values()));
//                 }
//               });
//             });
//             BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
//               const UUID_CONST = "-0000-1000-8000-00805f9b34fb";
//               if (peripheralData.characteristics[5].service.length <= 4) {
//                 // Sử dụng cho short UUID
//                 ser_uuid = "0000" + peripheralData.characteristics[4].service + UUID_CONST;
//                 char_uuid1 = "0000" + peripheralData.characteristics[4].characteristic
//                   + UUID_CONST;
//                 char_uuid2 = "0000" + peripheralData.characteristics[5].characteristic
//                   + UUID_CONST;
//                 // TƯơng tự cho uuid3 khi yêu cầu
//                 char_uuid3 = "0000" + peripheralData.characteristics[6].characteristic
//                   + UUID_CONST;
//               } else {
//                 // Sử dụng cho long UUID
//                 ser_uuid = peripheralData.characteristics[5].service;
//                 char_uuid1 = peripheralData.characteristics[4].characteristic;
//                 char_uuid2 = peripheralData.characteristics[5].characteristic;
//                 // TƯơng tự cho uuid3 khi yêu cầu
//                 char_uuid3 = peripheralData.characteristics[6].characteristic;
//               }
//               // Lưu các biến toàn cục
//               global.connectedServiceUUID = ser_uuid;
//               global.connectedCharUUID1 = char_uuid1;
//               global.connectedCharUUID2 = char_uuid2;
//               // TƯơng tự cho uuid3 khi yêu cầu
//               global.connectedCharUUID3 = char_uuid3;
//               // Notify để nhận các dữ liệu gửi liên tục về client
//               setTimeout(() => {
//                 BleManager.startNotification(peripheral.id, ser_uuid, char_uuid1)
//                   .then()
//                   .catch((error) => {
//                     console.log('Notification error', error);
//                   });
//                 // BleManager.startNotification(peripheral.id, ser_uuid, char_uuid3)
//                 //   .then()
//                 //   .catch((error) => {
//                 //     console.log('Notification error3', error);
//                 //   });
//                 // TƯơng tự cho uuid3 khi yêu cầu
//               }, 1500)
//             });
//           }, 900);
//         }).catch((error) => {
//           console.log('Connection error', error);
//         });
//       }
//     }

//     //Kết nối đến BLE sử dụng ID hay MAC address
//     const ble_disconnect = (deviceID) => {
//       setIsConnected(false);
//       global.isConnected = false;
//       BleManager.disconnect(deviceID)
//         .then(() => {
//           // Success code
//           console.log("Disconnected");
//         })
//         .catch((error) => {
//           // Failure code
//           console.log(error);
//         });
//     }
//     // Render Flat list
//     const Item = ({ item, onPress, backgroundColor }) => (
//       <View style={[styles1.flatlist, backgroundColor]}>
//         <Image
//           transitionDuration={100}
//           source={require('./assets/0305-logo-ctu.png')}
//           style={{ width: 30, height: 30, }}
//           onPress={() => ble_connect(item)}
//         />
//         <View style={{ flex: 1, }}>
//           <Text style={{ flex: 1, marginLeft: 20, }}>RSSI: {item.rssi}</Text>
//           <Text style={{ flex: 1, marginLeft: 20, }}>Device name: {item.name}</Text>
//           <Text style={{ flex: 1, marginLeft: 20, }}>MAC: {item.id}</Text>
//         </View>
//       </View>
//     );
//     const renderItem = ({ item }) => {
//       const backgroundColor = "lightblue";
//       return (
//         <Item
//           item={item}
//           onPress={() => {
//             setSelectedId(item.id);
//           }}
//           backgroundColor={{ backgroundColor }}
//         />
//       );
//     };
//     // Render màn hình ứng dụng giao tiếp
//     return (
//       <View style={styles1.Container}>
//         <View style={styles1.header}>
//           <Image
//             transitionDuration={100}
//             source={require('./assets/0305-logo-ctu.png')}
//             style={{ width: 60, height: 60 }}
//             onPress={() => { }}
//           />
//           <Text style={styles1.h_text}>LABO3-ND2-Find BLE Device Screen</Text>
//         </View>
//         <View style={styles1.cmd_view}>
//           <Button
//             title='Scan'
//             containerStyle={{
//               width: '24%',
//               margin: 5,
//             }}
//             onPress={() => { startScan() }}
//           />
//           <Button
//             title='Disconnect'
//             containerStyle={{
//               width: '24%',
//               margin: 5,
//             }}
//             onPress={() => { ble_disconnect(connectedID) }}
//           />
//           {isConnected ?
//             <Text style={{ flex: 1, marginLeft: 10, }}>Connected</Text> :
//             <Text style={{ flex: 1, marginLeft: 10, }}>Disconnected</Text>
//           }
//         </View>
//         <View style={styles1.l_view}>
//           {(!isConnected) &&
//             <FlatList
//               data={list}
//               renderItem={renderItem}
//               keyExtractor={(item) => item.id}
//               extraData={selectedId}
//             />
//           }
//           {
//             (isConnected) &&
//             <Text>Connected to {connectedID}</Text>
//           }
//         </View>
//       </View>
//     )
//   }
//   // ////
//   const styles = StyleSheet.create({
//     Container: {
//       flex: 1,
//     },
//     header: {
//       flex: 0.5,
//       alignItems: 'center',
//       flexDirection: 'row',
//       paddingLeft: 10,
//       backgroundColor: 'lightgrey',
//       margin: 5,
//       borderRadius: 8,
//     },
//     input: {
//       flex: 3,
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//     },
//     content: {
//       flex: 0,
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexDirection: 'row',
//       backgroundColor: 'lightgray',
//       marginBottom: 5,
//       borderRadius: 8,
//       height: 100,
//       width: '100%'//
//     },
//     h_text: {
//       flex: 0,
//       fontSize: 20,
//       textAlign: 'center',
//       color: 'blue',
//     },
//     h_logo: {
//       flex: 2,
//     },
//   });
//   const styles1 = StyleSheet.create({
//     Container: {
//       flex: 1,
//     },
//     header: {
//       flex: 0.7,
//       alignItems: 'center',
//       flexDirection: 'row',
//       paddingLeft: 10,
//       backgroundColor: 'lightgray',
//       borderRadius: 10,
//     },
//     cmd_view: {
//       flex: 0.5,
//       backgroundColor: 'lightblue',
//       justifyContent: 'flex-start',
//       alignItems: 'center',
//       flexDirection: 'row',
//       borderRadius: 10,
//     },
//     l_view: {
//       flex: 4,
//       alignItems: 'flex-start',
//       justifyContent: 'center',
//       flexDirection: 'row',
//     },
//     h_text: {
//       flex: 1,
//       fontSize: 20,
//       textAlign: 'center',
//       color: 'blue',
//     },
//     h_logo: {
//       flex: 1,
//     },
//     l_image: {
//       flex: 1,
//     },
//     t_text: {
//       flex: 1,
//     },
//     flatlist: {
//       flex: 1,
//       fontSize: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'row',
//       color: 'blue',
//       padding: 10,
//       backgroundColor: 'lightblue',
//       marginTop: 3,
//       borderRadius: 10,
//     }
//   });
//   const Tab = createBottomTabNavigator();
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             if (route.name === 'Communication') {
//               iconName = 'bluetooth'
//               color = focused
//                 ? 'blue'
//                 : 'gray';
//             } else if (route.name === 'FindDevice') {
//               iconName = 'search'
//               color = focused
//                 ? 'blue'
//                 : 'gray';
//             }
//             // You can return any component that you like here!
//             return <Icon name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Communication" component={ComunicationScreen} />
//         <Tab.Screen name="FindDevice" component={FindDeviceScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;







// // import { FlatList, StyleSheet, Text, View } from 'react-native'
// // import React, { useState } from 'react'
// // import { Image } from 'react-native-elements';

// // const App = () => {
// //   const DATA = [
// //     {
// //       id: 1, path: require('./assets/icon.png'),
// //       hoten: 'NGUYỄN QUÝ HƯNG',
// //       lop: 'KTĐK & TĐH',
// //       khoa: 'Tự động hóa',
// //       sothich: 'Ăn, Ngủ',
// //       sotruong: 'Ngủ',
// //     },
// //     {
// //       id: 2, path: require('./assets/icon.png'),
// //       hoten: 'NGUYỄN TIẾN THÀNH',
// //       lop: 'KTĐK & TĐH',
// //       khoa: 'Tự động hóa',
// //       sothich: 'Ăn và Ngủ',
// //       sotruong: 'Ngủ',
// //     },
// //     {
// //       id: 3, path: require('./assets/icon.png'),
// //       hoten: 'NGUYỄN TRƯỜNG GIANG',
// //       lop: 'KTĐK & TĐH',
// //       khoa: 'Tự động hóa',
// //       sothich: 'Ăn, Ngủ',
// //       sotruong: 'Ngủ',
// //     },
// //     {
// //       id: 4, path: require('./assets/icon.png'),
// //       hoten: 'VÕ THANH SANG',
// //       lop: 'KTĐK & TĐH',
// //       khoa: 'Tự động hóa',
// //       sothich: 'Ngủ và Ăn',
// //       sotruong: 'Ngủ',
// //     },
// //     {
// //       id: 5, path: require('./assets/icon.png'),
// //       hoten: 'VÕ VĂN HUỆ',
// //       lop: 'KTĐK & TĐH',
// //       khoa: 'Tự động hóa',
// //       sothich: 'Ăn, Ngủ',
// //       sotruong: 'Ngủ',
// //     },
// //     {
// //       id: 6, path: require('./assets/icon.png'),
// //       hoten: 'BÙI THỊ HUỲNH NHƯ',
// //       lop: 'KTĐK & TĐH',
// //       khoa: 'Tự động hóa',
// //       sothich: 'Ngủ và Ăn',
// //       sotruong: 'Ngủ',
// //     },
// //   ];
// //   const [selectedId, setSelectedId] = useState(null);
// //   const Item = ({ item, onPress, backgroundColor }) => (
// //     <View style={[styles.flatlist, backgroundColor]}>
// //       <Image
// //         transitionDuration={500}
// //         source={item.path}
// //         style={{ width: 60, height: 60, }}
// //         onPress={onPress}
// //       />
// //       <View style={{ flex: 1, }}>
// //         <Text style={{ flex: 1, marginLeft: 20, }}>
// //           Họ và tên: {item.hoten}</Text>
// //         <Text style={{ flex: 1, marginLeft: 20, }}>Lớp: {item.lop}</Text>
// //         <Text style={{ flex: 1, marginLeft: 20, }}>Khoa: {item.khoa}</Text>
// //         <Text style={{ flex: 1, marginLeft: 20, }}>Sở thích: {item.sothich}</Text>
// //         <Text style={{ flex: 1, marginLeft: 20, }}>Sở trường: {item.sotruong}</Text>
// //       </View>
// //     </View>
// //   );
// //   const renderItem = ({ item }) => {
// //     const backgroundColor = (item.id % 2 != 0) ? "lightblue" : "lightgray";
// //     return (
// //       <Item
// //         item={item}
// //         onPress={() => {
// //           setSelectedId(item.id);
// //         }}
// //         backgroundColor={{ backgroundColor }}
// //       />
// //     );
// //   };
// //   return (
// //     <View style={styles.Container}>
// //       <View style={styles.header}>
// //         <Image
// //           transitionDuration={500}
// //           source={require('./assets/icon.png')}
// //           style={{ width: 60, height: 60 }}
// //           onPress={() => alert('Xin chào, Chúng tôi là Nhóm 1!')}
// //         />
// //         <Text style={styles.h_text}>LABO2-ND2-PHẦN TỬ GIAO DIỆN CƠ BẢN</Text>

// //       </View>
// //       <View style={styles.list_view}>
// //         <FlatList data={DATA} renderItem={renderItem}></FlatList>
// //       </View>
// //     </View>
// //   )
// // }

// // export default App;

// // const styles = StyleSheet.create({
// //   h_text: {
// //     color: 'blue',
// //     textAlign: 'center',
// //     fontSize: 20,
// //     width: 300,
// //     marginLeft: 15,
// //   },
// //   Container: {
// //     flex: 1,
// //   },
// //   header: {
// //     flex: 0.7,
// //     alignItems: 'center',
// //     flexDirection: 'row',
// //     paddingLeft: 10,
// //     backgroundColor: 'lightgray',
// //     borderRadius: 10,
// //     margin: 1,
// //   },
// //   list_view: {
// //     flex: 4,
// //     alignItems: 'flex-start',
// //     justifyContent: 'center',
// //     flexDirection: 'row',
// //     borderWidth: 2,
// //     borderColor: 'blue',
// //     borderRadius: 8,
// //     margin: 1,
// //   },
// //   flatlist: {
// //     padding:10,
// //     flexDirection:'row',
// //     justifyContent:'center',
// //     alignItems:'center',
// //     margin:2,
// //     borderRadius:10
// //   }

// // })








// // thay lệnh const backgroundColor = (item.id % 2 != 0) ? "lightblue" : "lightgray";
// // thành lệnh const backgroundColor = (item.id % 2 != 0) ? "lightyellow" : "lightblue";
