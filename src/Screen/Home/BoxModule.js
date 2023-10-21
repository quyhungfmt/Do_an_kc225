import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Boxmodule = (props) => {
    const [index,setindex] = useState(props.name);
    function vs() {
        props.del(index);
    }
  return (
    <View>
      <Text>{props.value}</Text>
      <Text>{props.name}</Text>
      <TouchableOpacity onPress={() => {vs();}}>
      <Text>
          DeletModule
       </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Boxmodule