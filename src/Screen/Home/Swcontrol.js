/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Switch } from 'react-native-elements';
import { getDatabase, onValue, ref, update } from 'firebase/database';

const Swcontrol = ({path,title}) => {
    const [data,setData] = useState(false);
    const database = ref(getDatabase(),path);
    const [read,setRead] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        onValue(database,(snapshot) => {
          const val = snapshot.val();
          val ? setData(true) : setData(false);
          console.log('get sw');
          setRead(true);
        });
      }, 1000);
      return () => clearTimeout(timer);
    },[]);
      return (
        <View style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          width: '40%',
        }}>
          <Switch style={{
            transform: [
              { rotate: '-90deg' },
            ],
          }}
            value={data}
            thumbColor={data ? 'white' : 'black'}
            trackColor={{ true: 'black', false: 'white' }}
            onValueChange={() => {
              setData(!data);
              const updates = {};
              updates[path ] = data ? 0 : 1;
              update(ref(getDatabase()),updates)
              .then(() => {
                console.log('done');
              })
              .catch((error) => {
                console.log(error);
                alert('Tài Khoản Không Có Quyền Điều Khiển!!');
                setRead(false)
              });
            }}
          />
          <Text style={{
            fontSize: 18,
            color: 'black',
          }}>
            {title} : {data ? 'BẬT' : 'TẮT'}
          </Text>
        </View>
      )
}

export default Swcontrol;

const styles = StyleSheet.create({})