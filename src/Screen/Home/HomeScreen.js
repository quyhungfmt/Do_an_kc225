import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Boxmodule from './BoxModule';
import Inputbox from './InputModule';

const HomeScreen = ({ navigation }) => {
  const [nameModuleInput, setNameModuleInput] = useState('');
  const [listModule, setListModule] = useState([]);
  function Addmodule(name) {
    setListModule([...listModule, name]);
  }
  function deleteModule(name) {
    alert(name);
    setListModule([]);
  }
  function deleteModule2(name) {
    alert(name);
  }
  return (
    <View
      style={{
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'yellow',
      }}>
      <View
        style={{
          width: '100%',
          paddingTop: 40,
          marginBottom: 120,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <ScrollView>
          {listModule.map((item, index) => {
            return (
              <Boxmodule
                key={index}
                value={item}
                name={index + 1}
                del={deleteModule2}
              />
            );
          })}
        </ScrollView>
      </View>

      <Inputbox del={deleteModule} addModule={Addmodule} />

      {/* ====================
  const array = [2, 5, 9];
  console.log(array); // Output: [2, 5, 9]

  const index = array.indexOf(5);
  if (index > -1) {
    array.splice(index, 1);
  }

  console.log(array); // Output: [2, 9]
  ======================= */}
    </View>
  );
};

export default HomeScreen;
