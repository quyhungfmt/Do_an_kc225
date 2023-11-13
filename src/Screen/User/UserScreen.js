/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../Components/firebaseapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, getDatabase, ref } from 'firebase/database';
import { Icon } from 'react-native-elements';

const UserScreen = ({ navigation }) => {
  const COlor = '#5a5ece';
  const [list, setlist] = useState([]);
  const [val, isval] = useState(true);
  const user = getAuth().currentUser;
  const userEmail = user.email;
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('List', jsonValue);
    } catch (e) {
    }
  };
  function LogOut() {
    signOut(auth).then(() => {
      console.log('done')
      storeData([]);
    }).catch((error) => {
    });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getList(user.uid);
      } else {
        console.log('Người dùng chưa đăng nhập');
      }
    });
  }, []);
  function getList(useruid) {
    console.log('get list')
    console.log(useruid)
    get(ref(getDatabase(), '/IOT/ListModule/' + useruid))
      .then((snapshot) => {
        const data = snapshot.val();
        if (data != null) {
          console.log('data' + data);
          const key = Object.keys(data);
          console.log('key' + key);
          setlist(key);
          isval(true);
        }
        else {
          isval(false);
        }
      })
      .catch((e) => {
        isval(false);
      })
  }
  function head() {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        <Text style={{
          width: '50%',
          fontSize: 18,
          color: "black",
          textDecorationLine: 'underline',
          fontWeight:'700',
        }}>STT</Text>
        <Text style={{
          fontSize: 18,
          color: "black",
          textDecorationLine: 'underline',
          fontWeight:'700',
        }}>TÊN THIẾT BỊ</Text>
      </View>
    )
  }
  function render({ item, index }) {
    return (
      <View style={{
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        borderBottomWidth: 2,
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor:'white',
      }}>
        <Text style={{
          fontSize: 22,
          width: '20%',
          textAlign: 'center',
          color: "black",
        }}>{index + 1}</Text>

        <Text style={{
          fontSize: 22,
          width: '30%',
          textAlign: 'center',
          color: "black"
        }}>{item}</Text>

      </View>
    );
  }
  return (
    <View style={{
      // justifyContent:'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor:'#e5e5e5',
    }}>
      <View style={{
        backgroundColor: '#56afd2',
        width: '100%',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth:2,
        borderBottomColor:'#0d669d'
      }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: 'white'
          }}>Danh Sách Thiết Bị Được Quản Lí Bởi:</Text>
        <Text style={{
          fontSize: 20,
          color: "white",
          fontWeight: '600'
        }}>Email: {userEmail}</Text>
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '30%',
          justifyContent: 'space-around',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'white',
          marginTop: 10,
        }}
          onPress={() => {
            LogOut();
          }}
        >
          <Text style={{
            fontSize: 18,
            color: 'yellow',
            fontWeight: '600'
          }}>LogOut</Text>
          <Icon name='logout' size={28} color={'yellow'} />
        </TouchableOpacity>
      </View>
      {val && <FlatList
        ListHeaderComponent={head}
        style={{
          width: "100%",
          marginTop: 10,
        }}
        data={list}
        renderItem={(item, index) => render(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
      }
      {!val && <Text style={{
        marginTop: 20,
        color: 'gray',
        fontSize: 22,
      }}>CHƯA CÓ DỮ LIỆU</Text>}

    </View>
  );
};

export default UserScreen;
