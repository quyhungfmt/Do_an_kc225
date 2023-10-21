import { View, Text, Animated, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
const Inputbox = (props) => {
    const [openadd, setopenadd] = useState(false);
    const [isvalueIn, setisvalueIn] = useState(true);
    const [nameModuleInput,setNameModuleInput] = useState("");
    const deleteModule = () => {
        props.del(nameModuleInput);
    }
    const addModule = () => {
      if(nameModuleInput === '')
        setisvalueIn(false);
      else
        {
          props.addModule(nameModuleInput);
          Keyboard.dismiss();
          setNameModuleInput('');
        }
    }
    const animation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: openadd? 1: 0,
      duration:300,
      friction:2,
      useNativeDriver:false,
    }).start();
  },[openadd,animation]);
  return (
    <View style={{
        position:'absolute',
        bottom:0,
        right:10,
    }}> 
      <Animated.View style={[
          styles.box,
          {
            bottom: animation.interpolate({
              inputRange: [0,1],
              outputRange: [40,120]
            }),
            right: animation.interpolate({
              inputRange: [0,1],
              outputRange: [-80,70]
            }),

            transform: [
              {scale: animation.interpolate({
                inputRange: [0,1],
                outputRange: [0,1]
              })}
            ]
          }
          ]}>
          <TextInput 
          placeholderTextColor={isvalueIn? 'gray':'red'} 
          value={nameModuleInput} 
          onChangeText={(text)=>{
          setNameModuleInput(text);
          setisvalueIn(true);
          }} 
          style={{...styles.InputAdd,borderColor:isvalueIn?'transparent':'red'}}
          placeholder={isvalueIn? 'ModuleName' : 'Vui Lòng Nhập Tên Module'} />
          <TouchableOpacity onPress={() => {deleteModule()}} style={{...styles.buttonadd_delete,shadowColor:'red',left:25}}>
            <Text>
              DeletModule
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {addModule()}} style={{...styles.buttonadd_delete,shadowColor:'blue',right:25}}>
            <Text>
              AddModue
            </Text>
          </TouchableOpacity>
          </Animated.View>
  
            <Animated.View style={{
                ...styles.buttonAdd,
                transform: [
                    {
                        rotate: animation.interpolate( {
                            inputRange: [0,1],
                            outputRange: ['0deg', '-45deg'],
                        })
                }
              ]
            }}>
                        <TouchableOpacity 
                        onPress={() => {
                          setopenadd(!openadd)
                        }}
                        >
            <Image source={require('../../../assets/icon.png')}
            style={{
                height:50,
                width:50,
            }}
            />
        </TouchableOpacity>
            </Animated.View>
    </View>
  )
}

export default Inputbox
