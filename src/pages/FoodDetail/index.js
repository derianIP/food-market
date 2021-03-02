import React, {useEffect} from 'react';
import {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IcBackWhite} from '../../assets';
import {Button, Counter, Number, Rating} from '../../components';
import {getData} from '../../utils';

const FoodDetail = ({navigation, route}) => {
  const {
    id,
    name,
    description,
    ingredients,
    price,
    picturePath,
    rate,
  } = route.params;

  const [totalItem, setTotalItem] = useState(1);
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    getData('userProfile').then((user) => {
      setUserProfile(user);
    });
  }, []);

  const onCounterChange = (value) => {
    setTotalItem(value);
  };

  const onOrder = () => {
    const total = price * totalItem;
    const tax = (10 / 100) * total;
    const driver = 50000;
    const totalPrice = total + tax + driver;

    const data = {
      item: {
        id,
        name,
        price,
        picturePath,
        totalItem,
      },
      transaction: {
        total,
        tax,
        driver,
        totalPrice,
      },
      userProfile,
    };
    navigation.navigate('OrderSummary', data);
  };
  return (
    <View style={styles.page}>
      <ImageBackground source={{uri: picturePath}} style={styles.cover}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <View style={styles.back}>
            <IcBackWhite />
          </View>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.productContainer}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Rating rating={rate} />
            </View>
            <Counter onValueChange={onCounterChange} />
          </View>
          <Text style={styles.desc}>{description}</Text>
          <Text style={styles.label}>Ingredients:</Text>
          <Text style={styles.igredients}>{ingredients}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPrice}>Total Price:</Text>
            <Number number={price * totalItem} style={styles.price} />
          </View>
          <View style={styles.button}>
            <Button text="Order Now" onPress={onOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  page: {flex: 1},
  cover: {height: 330},
  back: {
    marginLeft: 11,
    marginTop: 24,
    width: 24,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  contentContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 26,
    paddingHorizontal: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
  },
  content: {flex: 1},
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {fontSize: 16, fontFamily: 'Poppins-Medium', color: '#020202'},
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    marginBottom: 4,
  },
  igredients: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 27,
  },
  priceContainer: {flex: 1},
  totalPrice: {fontSize: 13, fontFamily: 'Poppins-Regular', color: '#8D92A3'},
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  button: {width: 163},
});
