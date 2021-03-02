import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcMin, IcPlus} from '../../../assets';

const Counter = ({onValueChange}) => {
  const [counter, setCounter] = useState(1);

  const onCounter = (type) => {
    let result = counter;
    if (type === 'plus') {
      result = counter + 1;
    } else if (type === 'minus') {
      if (counter > 1) {
        result = counter - 1;
      }
    }
    setCounter(result);
    onValueChange(result);
  };

  useEffect(() => {
    onValueChange(counter);
  }, []);
  return (
    <View style={styles.page}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => onCounter('minus')}>
        <IcMin />
      </TouchableOpacity>
      <Text style={styles.value}>{counter}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={() => onCounter('plus')}>
        <IcPlus />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  page: {flexDirection: 'row', alignItems: 'center'},
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    paddingHorizontal: 10,
  },
});
