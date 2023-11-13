/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { View, Text, TouchableOpacity, TextInput,StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';

const unit = ["°C","%","hPa"];
const charts_Color = ["255, 102, 36,","36, 116, 255,","255, 36, 237,"]
const Httprq = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
    const [inputIp,setInputIp] = useState('http://');
    const [ipserver,setip] = useState('');
    const [temperatureValue,setTemperatureVal] = useState(0);
    const [humidityValue,setHumidityVal] = useState(0);
    const [pressureValue,setPressureVal] = useState(0);
    const [red,setRed] = useState(0);
    const [blue,setBlue] = useState(0);
    const [green,setGreen] = useState(0);
    const [status,setStatus] = useState();
    const [statusget,setStatusget] = useState();
    
    const getData = async () => {
      console.log('getdata');
        const req = new XMLHttpRequest();
        var _url1 =  ipserver + '/data'; //'http://' +
        req.open('GET',_url1, true);
        req.onload = function () {
          setStatus(req.status);
          if (req.readyState == 4 && req.status == '200') {
            //Sent ok
            console.log(JSON.parse(req._response));
            let data = JSON.parse(req._response);
            console.log(data);
            setTemperatureVal(data[0].value);
            setHumidityVal(data[1].value);
            setPressureVal(data[2].value);
            // setdata(JSON.parse(req._response));
          }
        };
        req.onerror =function (e){
          console.log(e);
        }
        req.send();
      };
        useEffect(() => {
          const interval = setInterval(() => {
            getData();
          }, 10000);
          return () => clearInterval(interval);
        },[]);
        useEffect(()=> {
          pushData();
        },[red]);
        useEffect(()=> {
          pushData();
        },[green]);
        useEffect(()=> {
          pushData();
        },[blue]);

      const pushData = () => {
        console.log('push');
        const req = new XMLHttpRequest();
        const dataObj = {red: red,
                     green: green,
                     blue: blue};
        var _url1 = ipserver + '/led';
        req.open('POST',_url1, true);
        req.setRequestHeader('Content-type','application/json');
        req.onload = function () {
          setStatusget(req.status);
           if (req.readyState == 4 && req.status == '200') {
             console.log(JSON.parse(req.responseText));
           }
        };
        req.send(JSON.stringify(dataObj));

     };
      function sliderControl (lable,value,setvalue) {
        return(
          <View style={{
            alignItems:'center',
            marginTop:10,
          }}>
            <Text style={{
              fontSize:22,
              color:lable,
              width:200,
            }}>{lable}: {value}</Text>
            <Slider
            style={{
              width:200,
            }}
            minimumValue={0}
            maximumValue={255}
            step={1}
            thumbTintColor="white"
            minimumTrackTintColor={lable}
            maximumTrackTintColor="#e5e5e5"
            thumbStyle={{height:25,width:25,borderWidth:8,borderColor:'black'}}
            trackStyle={{height:20,padding:4,borderWidth:2,borderRadius:10}}
            onSlidingComplete={(val) => {
              setvalue(val);
            }}
            />
          </View>
        );
      }
      function chartSensor (lable,units,color,value,MaxVal) {
        const datas = {
          labels: ['xx'], 
          data: [value / MaxVal],
        };
        return(
          <View style={{
            backgroundColor:'#fff',
            alignItems:'center',
            borderRadius:10,
          }}>
            <Text style={{
              top:'58%',
              fontSize:18,
              fontWeight:'500',
              color:'black',
              }}>{value}{units}</Text>
            <Text style={{
              fontSize:20,
              fontWeight:'500',
              color:'black',
              }}>{lable}</Text>
          <ProgressChart
              data={datas}
              width={130}
              height={130}
              strokeWidth={15}
              radius={45}
              chartConfig={{
                backgroundGradientFrom: 'transparent',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: 'transparent',
                backgroundGradientToOpacity: 0,
                color: (opacity = 0) => `rgba(${(value<0)? '0,0,0,' : color}${opacity})`,
                strokeWidth: 1,
                barPercentage: 0.5,
                useShadowColorFromDataset: false,
              }}
              hideLegend={true}/>
          </View>
        );
      }
  return (
    <View style={{
      flex:1,
    }}>
        {/* hearder */}
      <View style={{
          flex:1,
          justifyContent:'space-evenly',
          alignItems:'center',
      }}>
        <Text style={{
          width:'100%',
          textAlign:'center',
          fontSize:20,
          color:'black',
        }}>
          Nhập Địa Chỉ IP Server</Text>
            <View style={{
              flexDirection:'row',
              }}>
            <TextInput
            style={styles.inputIp}
            value={inputIp}
            keyboardType="numeric"
            onBlur={()=>setInputIp('http://')}
            onChangeText={(text) => {setInputIp(text);}}/>
            <TouchableOpacity
            style={styles.button}
            onPress={()=>{setip(inputIp);}}>
              <Text>SET</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={()=>{setip('');}}>
              <Text>DEL</Text>
            </TouchableOpacity>
            </View>
            <Text style={{
              fontSize:18,
              fontWeight:'500',
              color:'black',
            }}>URL Hiện Tại: {ipserver}</Text>
      </View>
      {/* charts */}
      <View style={{
        backgroundColor:'black',
        paddingBottom:10,
        paddingTop:10,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-evenly',
      }}>
          {chartSensor('Temperature',unit[0],charts_Color[0],temperatureValue,130)}
          {chartSensor('Humidity',unit[1],charts_Color[1],humidityValue,100)}
          {chartSensor('Pressure',unit[2],charts_Color[2],pressureValue,50)}
      </View>
      {/* controler */}
        <View style={{
          flex:2,
          borderWidth:1,
          borderRadius:10,
          backgroundColor:'#e5e5e5',
          alignItems:'center',
        }}>
          <TouchableOpacity
          onPress={() => {
            getData();
          }}
          style={styles.buttonHTTP}>
            <Text style={styles.textBtHTTP}>
              {(statusget == '200')?'GET':'ERROR'}
            </Text>
          </TouchableOpacity>
          {sliderControl('red',red,setRed)}
          {sliderControl('blue',blue,setBlue)}
          {sliderControl('green',green,setGreen)}
          <TouchableOpacity
            onPress={() => {
              pushData();
            }}
            style={styles.buttonHTTP}>
            <Text style={styles.textBtHTTP}>
              Push ALL
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Httprq;
const styles = StyleSheet.create({
  button: {
    width:70,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e5e5e5',
    borderWidth:1,
    borderRadius:10,
    marginLeft:10,
  },
  inputIp:{
    height:40,
    flex:1,
    borderWidth:1,
    borderRadius:5,
    marginLeft:10,
  },
  buttonHTTP:{
    width:100,
    height:40,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    margin:10,
  },
  textBtHTTP:{
    fontSize:18,
    color:'white',
    fontWeight:'500',
  },
});
