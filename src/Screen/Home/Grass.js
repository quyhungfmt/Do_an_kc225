/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { child, get, getDatabase, ref } from 'firebase/database';

const Grass = ({path}) => {
    const [Grass, setGrass] = useState(0);
    const [Humidity, setHumidity] = useState(0);
    const [Temperature, setTemperature] = useState(0);
    const [SoilMS, setSoilMS] = useState(0);
    const [text, setText] = useState('');
    // let CTemperature = (Temperature == 0)? '0' : (Temperature < 20) ? '1' : (Temperature > 33) ? '3' : '2';
    // let CHumidity = (Humidity == 0)? '0' : (Humidity < 60) ? '1' : (Humidity > 85) ? '3' : '2';
    // let CSoilMS = (SoilMS == 0)? '0' : (SoilMS < 65) ? '1' : (SoilMS > 80) ? '3' : '2';
    // let CGrass = (Grass == 0)? '0' : (Grass < 40) ? '1' : (Grass > 70) ? '3' : '2';
    useEffect(() => {
        const interval = setInterval(() => {
            get(child(ref(getDatabase()), 'IOT/' + path))
            .then((snapshot) => {
                const data = snapshot.val();
                if (snapshot.exists()){
                    setGrass(data.Ugly_Grass);
                    setHumidity(data.Humidity);
                    setTemperature(data.Temperature);
                    setSoilMS(data.SoilMS);
                    if (data.Temperature == 0 && data.Humidity == 0 && data.Ugly_Grass == 0 && data.SoilMS == 0){
                        setText('Chưa Có Dữ Liệu');
                    }
                    else if( data.Ugly_Grass > 40 && (data.Temperature > 35 || data.SoilMS < 35)) {
                        setText('Cần Tưới Nước');
                    }
                    else {
                        setText('Cỏ Đang Phát Triển TỐT');
                    }
                }
            })
            .catch((er) => {
                console.log('error ' + er);
            });
        }, 2000);
        return () => clearInterval(interval);
      }, []);

    return (
        <View>
            <Text style={styles.rendertext1}>
                Chất Lượng Cỏ: {100 - Grass}%
            </Text>
            <Text style={styles.rendertext2}>
                Đề Xuất Chăm Sóc  : {text}
            </Text>
        </View>
    )
}

export default Grass;