import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Rating from '../Rating';

const FoodCard = ({image, name, rating, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.content}>
          <Text style={styles.text}> {name} </Text>
          <Rating rating={rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    overflow: 'hidden',
    marginRight: 24,
  },
  image: {width: 200, height: 140, resizeMode: 'cover'},
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginLeft: -3,
  },
  content: {padding: 12},
});
