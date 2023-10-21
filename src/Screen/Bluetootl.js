/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */


import { View, Text, StyleSheet, FlatList, TouchableOpacity, NativeModules, NativeEventEmitter } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const Bluetootl = ({navigation}) => {

    const [isconnect,setconnect] = useState(false);
    const [isScan,setScan] = useState(true);
    const [blt,setblt_devices] = useState('đ');
    const datas = [
        
    ];
    bleManagerEmitter.addListener(
        "BleManagerDiscoverPeripheral",
        (args) => {
          console.log('Discovered new peripheral!');
          console.log('Peripheral ID:', args.id);
          console.log('Peripheral name:', args.name);
        }
      );
      
      // Bắt đầu quá trình quét
      BleManager.scan([], 5, true).then(() => {
        console.log("Scan started");
      });
    
    const header = () => (
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            }}>
            <Text style={styles.text}>
                TÊN THIẾT BỊ
            </Text>
            <Text style={styles.text}>KẾT NỐI</Text>
        </View>
    );
    const renderview = ({item}) => (
    <View style={{
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        marginTop:2,
    }}>
        <Text style={{
            fontSize:18,
            fontWeight:'600',
        }}>
            {item.tentb}
        </Text>
        <Icon name="add" size={22} color={'red'}/>
    </View>
    );
    const connecting_devices = (name) =>{
        return (
        <View style={styles.Connecting_devices}>
                    <View>
                        <Text style={styles.text}>TÊN THIẾT BỊ</Text>
                        <View style={{flexDirection:'row'}}>
                            <Icon name="devices" size={22} color={'red'}/>
                            <Text style={{
                                marginLeft:10,
                                fontSize:17,
                                color:'#000000',
                                }}>{name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>NGẮT KẾT NỐI</Text>
                        <Icon name="cancel" size={22} color={'red'}/>
                    </View>
                </View>
    )};
    const controler = () => {
        const Buttons = (fun) => {
            return (
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                width:'80%',
                justifyContent:'space-evenly',
                marginTop:80,
                }}>
                <TouchableOpacity
                onPress={fun}
                style={styles.button}>
                    <Text>tắt</Text>
                </TouchableOpacity>
                <Icon type='font-awesome5' name='lightbulb' size={50} color={'yellow'}/>
            </View>
        );};
        return (
            <View>
                {Buttons(() => {alert('1')})}
                {Buttons(() => {alert('1')})}
                {Buttons(() => {alert('1')})}
                {Buttons(() => {alert('1')})}
            </View>
        );
    };
    const startScan = () => {
        // const handleDiscoverPeripheral = (peripheral) => {
        //     console.log('Got ble peripheral', peripheral);
        //     if (peripheral.name) {
        //         datas.push(peripheral.name);
        //     }
        //     console.log('l');
        //         datas.forEach((device) => {
        //             console.log(device.name);
        //           });
        // };
        
        BleManager.scan([], 5, true).then(() => {
            // Success code
            console.log("Scan started");
          });

        // BleManager.scan([],5, true).then(() => {
        //         console.log('Scanning...');
        //         BleManager.on('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    };
    
    const listDevices = () => {

        return (
            <View style={styles.container2}>
                <View>
                <Text>THIẾT BỊ ĐÃ TÌM THẤY</Text>
                <Icon onPress={() => {startScan();}} name='add' size={20} color={'black'}/>
                </View>
                <FlatList
                ListHeaderComponent={header}
                style={styles.flastlist}
                data={datas}
                renderItem={renderview}
                keyExtractor={datas => datas.id}
                />
            </View>
        );
    };
  return (
    <View style={styles.container}>
        <View style={styles.line}/>
            <View style={styles.container1}>
                <Text>
                    THIẾT BỊ ĐANG KẾT NỐI
                </Text>
                {isconnect ? connecting_devices(blt) : <Text>........</Text>}
            </View>
        <View style={styles.line}/>
            {isconnect ? controler() : listDevices()}
    </View>
  );
};

export default Bluetootl;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
    },
    container1: {
        width:'100%',
        height:80,
        alignItems:'center',
    },
    container2: {
        flex:1,
        width:'100%',
        alignItems:'center',
    },
    Connecting_devices: {
        width:'80%',
        flexDirection:'row',
        height:60,
        alignItems:'center',
        justifyContent:'space-between',
    },
    text:{
        color:'black',
        borderBottomWidth:1,
        textAlign:'center',
        marginBottom:5,
    },
    line: {
        height:1,
        width:'90%',
        backgroundColor:'gray',
        marginTop:10,
        marginBottom:5,
    },
    flastlist: {
        width:'90%',
        padding:10,
    },
    button:{
        width:70,
        height:70,
        borderRadius:50,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
    },
});


// Để yêu cầu quyền truy cập vị trí trong React Native, bạn có thể thực hiện theo các bước sau:

// Nhập các module cần thiết từ react-native1:
// JavaScript
// AI-generated code. Review and use carefully. More info on FAQ.

// import { PermissionsAndroid } from 'react-native';
// Tạo một hàm để yêu cầu quyền1:
// JavaScript
// AI-generated code. Review and use carefully. More info on FAQ.

// async function requestLocationPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Ứng dụng cần quyền truy cập vị trí",
//         message: "Ứng dụng cần quyền truy cập vị trí để thực hiện chức năng này.",
//         buttonNeutral: "Hỏi lại sau",
//         buttonNegative: "Hủy",
//         buttonPositive: "Đồng ý"
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("Bạn đã cho phép ứng dụng truy cập vị trí");
//     } else {
//       console.log("Bạn đã từ chối quyền truy cập vị trí");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }