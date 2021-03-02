import React from 'react';
import {Text} from 'react-native';
import NumberFormat from 'react-number-format';
const Number = ({number, type, style}) => {
  if (type === 'decimal') {
    return (
      <NumberFormat
        value={number}
        displayType="text"
        decimalScale={1}
        fixedDecimalScale
        renderText={(value) => <Text style={style}>{value}</Text>}
      />
    );
  }
  return (
    <NumberFormat
      value={number}
      displayType="text"
      thousandSeparator="."
      decimalSeparator=","
      prefix="IDR "
      renderText={(value) => <Text style={style}>{value}</Text>}
    />
  );
};

export default Number;
