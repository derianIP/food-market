import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PhotoProfile} from '../../../assets';
import {getData} from '../../../utils';

const HomeProfile = () => {
  const [photo, setPhoto] = useState(PhotoProfile);
  useEffect(() => {
    getData('userProfile').then((res) => {
      setPhoto({uri: res.profile_photo_url});
    });
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.appName}>FoodMarket</Text>
        <Text style={styles.desc}>Let’s get some foods</Text>
      </View>
      <Image style={styles.profile} source={photo} />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profile: {width: 50, height: 50},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
  },
  appName: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
});
