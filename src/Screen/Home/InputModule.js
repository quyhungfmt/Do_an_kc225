/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import { View, Text, Animated, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { LinearGradient } from 'react-native-svg';
const Inputbox = (props) => {
  const [openadd, setopenadd] = useState(false);
  const [isvalueIn, setisvalueIn] = useState(true);
  const [nameModuleInput, setNameModuleInput] = useState('');
  const removeModule = () => {
    props.remove();
  };
  const addModule = () => {
    if (nameModuleInput === '') { setisvalueIn(false); }
    else {
      props.addModule(nameModuleInput);
      Keyboard.dismiss();
      setNameModuleInput('');
    }
  };
  const animation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: openadd ? 1 : 0,
      duration: 100,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [openadd, animation]);
  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
    }}>
      <Animated.View
      style={[
        styles.box,
        {
          bottom: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 140],
          }),
          right: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-80, 70],
          }),
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        },
      ]}
      pointerEvents={openadd ? 'auto' : 'none'}
      >
        <TextInput
          placeholderTextColor={isvalueIn ? 'gray' : 'red'}
          value={nameModuleInput}
          onChangeText={(text) => {
            setNameModuleInput(text);
            setisvalueIn(true);
          }}
          style={{ ...styles.InputAdd, borderColor: isvalueIn ? 'transparent' : 'red' }}
          placeholder={isvalueIn ? 'ModuleName' : 'Vui Lòng Nhập Tên Module'} />
        <TouchableOpacity onPress={() => { removeModule(); }} style={{ ...styles.buttonadd_delete, shadowColor: 'red', left: 25 }}>
          <Text style={{
            color: 'black',
          }}>
            Delete ALL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { addModule(); }} style={{ ...styles.buttonadd_delete, shadowColor: 'blue', right: 25 }}>
          <Text style={{
            color: 'black',
          }}>
            Add Modue
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{
        ...styles.buttonAdd,
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-45deg'],
            }),
          },
        ],
      }}>
        <TouchableOpacity
          onPress={() => {
            setopenadd(!openadd);
          }}
        >
          <Icon style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: 'rgba(90, 188, 221, 0.744)',
          }} name="add" size={44} color={'white'} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Inputbox;
