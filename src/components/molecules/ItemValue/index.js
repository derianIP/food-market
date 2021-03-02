import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Number from '../Number';

const ItemValue = ({label, value, color = '#020202', type}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {type === 'currency' ? (
        <Number number={value} style={styles.value(color)} />
      ) : (
        <Text style={styles.value(color)}>{value}</Text>
      )}
    </View>
  );
};

export default ItemValue;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#8D92A3'},
  value: (color) => ({
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: color,
  }),
});
