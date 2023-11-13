/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import { View, Text, ScrollView, FlatList, TouchableOpacity, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import Inputbox from './InputModule';
import Chartkit from '../../Components/chartkit';
import { get, getDatabase, onValue, ref, update } from 'firebase/database';
import { Icon } from 'react-native-elements';
import Swcontrol from './Swcontrol';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { styles } from './styles';
import Grass from './Grass';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../Components/firebaseapp';

const HomeScreen = ({ navigation }) => {
  const [listModule, setListModule] = useState([]);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('List', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('List');
      if (value !== null) {
        console.log(JSON.parse(value));
        let data = JSON.parse(value);
        setListModule(data);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getData();
      } else {
        setListModule([]);
      }
    });
  }, []);
  // thiếu kt xem tồn tại tên cũ k
  function Addmodule(name) {
    const user = auth.currentUser;
    get(ref(getDatabase(), '/IOT/ListModule/' + user.uid))
      .then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const key = Object.keys(data);
        console.log('Danh sách thiết bị :', key);
        let isval = listModule.some((value) => {
          return value.name == name;
        });
        if (isval) {
          alert(name + ' :Đã Tồn Tại!!');
        }
        else if (data !== null && name in data) {
          const index = key.indexOf(name);
          console.log(index);
          setListModule([...listModule, { id: index, name: name }]);
          storeData([...listModule, { id: index, name: name }]);
        } else { alert('Không có thiết bị đang quản lí nào có mã : ' + name); }
      })
      .catch((e) => {
        alert('Có Lỗi Khi lấy danh sách thiết bị quản lí');
      });
  }
  function removeModule(name) {
    let AR = listModule.filter(obj => {
      return obj.name != name;
    });
    setListModule(AR);
    storeData(AR);
  }
  function removeALL() {
    setListModule([]);
    storeData([]);
  }
  const views = ({ item }) => {
    return (
      <View style={styles.renderView}>
        <View style={styles.renderViewHeader}>
          <Text style={styles.renderDevicesName}>
            Tên Thiết Bị: {item.name}
          </Text>
          <Icon onPress={() => { removeModule(item.name); }} name="delete-forever" size={24} color={'#cf6320'} />
        </View>
        <View style={styles.renderviewChart}>
          <Chartkit lable={'Nhiệt Độ'} color={0} units={0} path={item.name + '/Temperature'} MaxVal={100} />
          <Chartkit lable={'Độ Ẩm'} color={1} units={1} path={item.name + '/Humidity'} MaxVal={100} />
          <Chartkit lable={'Độ Ẩm Đất'} color={2} units={1} path={item.name + '/SoilMS'} MaxVal={100} />
        </View>
        {/*  */}
        <Grass path={item.name} />
        <View style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
          <Swcontrol path={'IOT/' + item.name + '/DataDC'} title={'Máy Bơm'} />
          <Swcontrol path={'IOT/' + item.name + '/DataLED'} title={'LED'} />
        </View>
      </View>
    );
  };
  return (
    <View
      style={styles.returnView1}>
      <FlatList
        data={listModule}
        renderItem={views}
        keyExtractor={(item, index) => item.id.toString()}
      />
      <Inputbox remove={removeALL} addModule={Addmodule} />
    </View>
  );
};

export default HomeScreen;
{/* ====================
  const array = [2, 5, 9];
  console.log(array); // Output: [2, 5, 9]

  const index = array.indexOf(5);
  if (index > -1) {
    array.splice(index, 1);
  }

  console.log(array); // Output: [2, 9]
  =======================

test2 CTt4M42aOVPjQqlkT2hgrBCeXE12
nhom2 YZZlB49oSLhvl3FRR2Ts0xBCOuL2

*/}
