/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressChart } from 'react-native-chart-kit';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
const Chartkit = ({ lable, color, units, path, MaxVal }) => {
  const charts_Color = ['255, 102, 36,', '36, 116, 255,', '255, 36, 237,'];
  const unit = ['°C', '%', 'hPa'];
  const [value, setvalue] = useState(0);
  const [Read, setRead] = useState(true);
  const datas = {
    labels: ['xx'],
    data: [ (value > MaxVal) ? 1 : ((value < 0) ? 0 : value / MaxVal)],
  };
  const dbRef = ref(getDatabase());
  useEffect(() => {
    const interval = setInterval(() => {
      get(child(dbRef, 'IOT/' + path))
        .then((snapshot) => {
          const data = snapshot.val();
          (snapshot.exists()) ? setvalue(data) : setvalue(0);
          setRead(true);
        })
        .catch((er) => {
          console.log('error ' + er);
          setvalue(0);
          setRead(false);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={{
      backgroundColor: '#fff',
      alignItems: 'center',
      borderRadius: 10,
      height: 130,
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
      }}>{Read ? lable : 'NULL'}</Text>
      <ProgressChart
        data={datas}
        width={100}
        height={100}
        strokeWidth={10}
        radius={35}
        chartConfig={{
          backgroundGradientFrom: 'transparent',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: 'transparent',
          backgroundGradientToOpacity: 0,
          color: (opacity = 0) => `rgba(${(value < 0) ? '0,0,0,' : charts_Color[color]}${opacity})`,
          strokeWidth: 1,
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
        }}
        hideLegend={true} />
      <Text style={{
        fontSize: 15,
        fontWeight: '800',
        bottom: '45%',
        color: 'black',
      }}>{value}{unit[units]}</Text>
    </View>
  );
};
export default Chartkit;
