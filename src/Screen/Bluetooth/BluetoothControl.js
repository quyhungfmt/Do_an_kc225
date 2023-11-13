/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, FlatList, TouchableOpacity, NativeModules, NativeEventEmitter } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import BleManager from 'react-native-ble-manager';
import { Buffer } from 'react-native-buffer';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const Bluetootl = ({navigation}) => {
    const peripheralId = '24:DC:C3:9A:16:2A';
    const serviceUUID = '0000EE00-0000-1000-8000-00805F9B34FB';
    const characteristicUUID = '0000EEF1-0000-1000-8000-00805F9B34FB';
    const [isconnect,setconnect] = useState(false);
    const [isScan,setScan] = useState(false);
    const [listScannable_device, setlist] = useState([]);
    const [connected_devices, setCnt_devices] = useState([]);
    const [led1,setled1] = useState(false);
    const [led2,setled2] = useState(false);
    const [led3,setled3] = useState(false);
    const [led4,setled4] = useState(false);


    //
    BleManager.start().then(() => {
        console.log('start');
    });
    //
    useEffect(() => {
        const eventdisconnect = bleManagerEmitter.addListener(
          'BleManagerDisconnectPeripheral',
          (args) => {
            console.log('ID: Thiết bị đã ngắt kết nối: ', args.peripheral);
            alert('ID: Thiết bị đã ngắt kết nối: ' + args.peripheral);
            let A = [...connected_devices];
            A = A.filter(obj => obj.id !== args.peripheral.replace(/:/g, ''));
            setCnt_devices(A);
            setconnect(false);
          }
        );
        return () => {
          eventdisconnect.remove();
        };
      },[]);

    useEffect(() => {
      startScan();
    },[]);



    //
    const connect_devices = (id,name) => {
        console.log(id);
        BleManager.connect(id)
        .then(() => {
            readled();
            console.log('Connected');
            alert('Connected');
            BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
            console.log('Connected peripherals: ' + peripheralsArray.length);
            let A = [...connected_devices];
            A.push({id:id.replace(/:/g, ''),name:name,UUID:id});
            setCnt_devices(A);
            setconnect(true);
            });
        })
        .catch((error) => {
            console.log('error connect: ' + error);
        });
    };
    //
    const disconnect = (UUID,id) => {
        console.log('UUID: ' + UUID);
        console.log('ID: ' + id);
        BleManager.disconnect(UUID)
        .then(() => {
            console.log(UUID);
            let A = [...connected_devices];
            A = A.filter(obj => obj.id !== id);
            setCnt_devices(A);
            setconnect(false);
            console.log('Disconnected');
            console.log(connected_devices);
        })
        .catch((error) => {
            console.log('error disconnect: ' + error);
        });
    };
    const readled = () => {
        BleManager.read(peripheralId, serviceUUID, characteristicUUID)
            .then((readData) => {
            let data = Buffer.from(readData);
            let conver = data.toString('ascii');
            console.log(conver);
            let arr = conver.split('').map(char => char === '1');
            setled1(arr[0]);
            setled2(arr[1]);
            setled3(arr[2]);
            setled4(arr[3]);
            console.log(arr);
            })
            .catch((error) => {
            console.log(error);
            });
    };
    const writeled = (ledpin,status) => {
        switch (ledpin) {
            case '4':
                status == 1 ? setled1(true) : setled1(false);
                break;
            case '5':
                status == 1 ? setled2(true) : setled2(false);
                break;
            case '16':
                status == 1 ? setled3(true) : setled3(false);
                break;
            case '17':
                status == 1 ? setled4(true) : setled4(false);
                break;
            default:
                break;
        }
        let data = ledpin + status;
        console.log('data:' + data);
        const buffer = Buffer.from(data.toString());
        let A = buffer.toJSON().data;
        BleManager.write(
            peripheralId,serviceUUID,characteristicUUID,
            A
          )
            .then(() => {
              console.log('Write: ' + data);
            })
            .catch((error) => {
              console.log(error);
            });
    };

    //
    const startScan = () => {
        BleManager.scan([], 2, true).then(() => {
            console.log('Scan started');
            setScan(true);
            setlist([]);
            setTimeout(() => {
                setScan(false);
                BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
                    console.log('Peripheral ID: ' + peripheralsArray.length);
                    let newdatas = [...peripheralsArray];
                    setlist(newdatas);
                  });
            }, 2000);
          });
    };

    const ListView = ({item}) =>  (
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Icon name="devices" size={22} color={'red'}/>
            <Text style={{
                marginLeft:10,
                fontSize:17,
                color:'#000000',
                }}>{item.id}</Text>
          <Icon onPress={() => {disconnect(item.UUID,item.id);}} name="cancel" size={22} color={'red'}/>
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
            color:'black',
        }}>
            {item.name ? item.name : 'No Name'}
        </Text>
        <Text style={styles.textHeader}>{item.id}</Text>
        <Icon onPress={() => {connect_devices(item.id,item.name);}} name="add" size={22} color={'red'}/>
    </View>
    );

    const List_connected_devices = () =>{
                return (
                    <View style={styles.connecteds_devices}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Text style={styles.text}>TÊN THIẾT BỊ</Text>
                        <Text style={styles.text}>NGẮT KẾT NỐI</Text>
                        </View>
                    <FlatList
                    style={{width:'100%',height:'80%'}}
                    data={connected_devices}
                    renderItem={ListView}
                    keyExtractor={connected_devices.id}
                    />
                  </View>
                );
            };
    const controler = () => {
        const Buttons = (fun,led) => {
            return (
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                width:'80%',
                justifyContent:'space-evenly',
                marginTop:50,
                }}>
                <TouchableOpacity
                onPress={fun}
                style={[styles.button,{backgroundColor:led ? 'green' : 'gray'}]}>
                    <Text style={{
                        fontWeight:'500',
                        color:led ? 'white' : 'black',
                    }}
                    >{led ? 'ON' : 'OFF' }</Text>
                </TouchableOpacity>
                <Icon type="font-awesome5" name="lightbulb" size={50} color={led ? '#ecf076ea' : 'gray'}/>
            </View>
        );};
        return (
            <View>
                {Buttons(() => {writeled('4',(led1 ? '0' : '1'));},led1)}
                {Buttons(() => {writeled('5',(led2 ? '0' : '1'));},led2)}
                {Buttons(() => {writeled('16',(led3 ? '0' : '1'));},led3)}
                {Buttons(() => {writeled('17',(led4 ? '0' : '1'));},led4)}
            </View>
        );
    };

    const listDevices = () => {
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
        return (
            <View style={styles.container2}>
                <View>
                <Text style={styles.textHeader}>THIẾT BỊ ĐÃ TÌM THẤY</Text>
                <Icon onPress={() => {startScan();}}type="ionicons"
                name={isScan ? 'sync' : 'refresh'} size={25} color={isScan ? '#f14d4d' : 'gray'}/>
                </View>
                <FlatList
                ListHeaderComponent={header}
                style={styles.flastlist}
                data={listScannable_device}
                renderItem={renderview}
                keyExtractor={datas => datas.id.toString()}
                />
            </View>
        );
    };
  return (
    <View style={styles.container}>
        <View style={styles.line}/>
            <View style={styles.container1}>
                <Text style={styles.textHeader} onPress={() => {readled();}}>
                    THIẾT BỊ ĐANG KẾT NỐI
                </Text>
                {isconnect ? List_connected_devices() : <Text>........</Text>}
            </View>
        <View style={styles.line}/>
            <View style={{
                backgroundColor:'#e5e5e5',
                width:'90%',
                flex:0.9,
                borderRadius:10,
            }}>
            {isconnect ? controler() : listDevices()}
            </View>
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
        height:200,
        alignItems:'center',
    },
    container2: {
        flex:1,
        width:'100%',
        alignItems:'center',
    },
    connecteds_devices: {
        width:'80%',
        alignItems:'center',
        justifyContent:'space-between',
    },
    textHeader: {
        color:'black',
        fontSize:18,
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
