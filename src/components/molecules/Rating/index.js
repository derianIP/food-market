import React from 'react';
import {StyleSheet, View} from 'react-native';
import Number from '../Number';
import {IcStartOff, IcStartOn} from '../../../assets';

const Rating = ({rating}) => {
  const renderStar = () => {
    let star = [];
    for (let i = 0; i <= 5; i++) {
      if (i <= rating) {
        star.push(<IcStartOn key={i} />);
      } else {
        star.push(<IcStartOff key={i} />);
      }
    }
    return star;
  };
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.rating}>{renderStar()}</View>
      <Number number={rating} type="decimal" style={styles.ratingNumber} />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rating: {flexDirection: 'row', marginRight: 4, justifyContent: 'center'},
  ratingContainer: {flexDirection: 'row'},
  ratingNumber: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
});
