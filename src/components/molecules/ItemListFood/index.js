import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Number from '../Number';
import Rating from '../Rating';

const ItemListFood = (props) => {
  const {
    image,
    title,
    price,
    item,
    rating,
    type,
    date,
    status,
    onPress,
  } = props;
  const renderContent = () => {
    switch (type) {
      case 'product':
        return (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Rating rating={rating} />
          </>
        );
      //product
      case 'order-summary':
        return (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Text style={styles.item}>{item} Item</Text>
          </>
        );
      case 'in-progress':
        return (
          <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item} Items</Text>
                <View style={styles.dot} />
                <Number number={price} style={styles.price} />
              </View>
            </View>
          </TouchableOpacity>
        );
      case 'past-orders':
        const formatedDate = new Date(date).toDateString();
        return (
          <TouchableOpacity
            style={styles.contentContainer}
            activeOpacity={0.7}
            onPress={onPress}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item} Items</Text>
                <View style={styles.dot} />
                <Number number={price} style={styles.price} />
              </View>
            </View>
            <View>
              <Text style={styles.date}>{formatedDate}</Text>
              <Text style={styles.status(status)}>{status}</Text>
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Rating rating={rating} />
          </>
        );
    }
  };
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      {renderContent()}
    </View>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({
  image: {width: 60, height: 60, borderRadius: 8, marginRight: 12},
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  priceContainer: {flexDirection: 'row', alignItems: 'center'},
  price: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#8D92A3',
    marginHorizontal: 5,
  },
  item: {fontFamily: 'Poppins-Regular', fontSize: 12, color: '#8D92A3'},
  date: {fontSize: 10, fontFamily: 'Poppins-Regular', color: '#8D92A3'},
  status: (status) => ({
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: status === 'CANCELLED' ? '#D9435E' : '#1ABC9C',
  }),
});
