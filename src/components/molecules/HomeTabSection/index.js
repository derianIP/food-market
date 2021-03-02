import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodDataByTypes} from '../../../redux/action/home';
import ItemListFood from '../ItemListFood';

const NewTaste = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {newTaste} = useSelector((state) => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDataByTypes('new_food'));
  }, [dispatch]);
  return (
    <View style={styles.tab}>
      {newTaste.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FoodDetail', item)}>
            <ItemListFood
              key={item.id}
              rating={item.rate}
              image={{uri: item.picturePath}}
              title={item.name}
              price={item.price}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {popular} = useSelector((state) => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDataByTypes('popular'));
  }, [dispatch]);
  return (
    <View style={styles.tab}>
      {popular.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FoodDetail', item)}>
            <ItemListFood
              key={item.id}
              rating={item.rate}
              image={{uri: item.picturePath}}
              title={item.name}
              price={item.price}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Recommended = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {recommended} = useSelector((state) => state.homeReducer);
  useEffect(() => {
    dispatch(getFoodDataByTypes('recommended'));
  }, [dispatch]);
  return (
    <View style={styles.tab}>
      {recommended.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FoodDetail', item)}>
            <ItemListFood
              key={item.id}
              rating={item.rate}
              image={{uri: item.picturePath}}
              title={item.name}
              price={item.price}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.style}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused}) => (
      <Text style={styles.text(focused)}>{route.title}</Text>
    )}
  />
);

const HomeTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'New Taste'},
    {key: '2', title: 'Popular'},
    {key: '3', title: 'Recommended'},
  ]);

  const renderScene = SceneMap({
    1: NewTaste,
    2: Popular,
    3: Recommended,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({
  text: (focused) => ({
    color: focused ? '#020202' : '#8D92A3',
    margin: 8,
    fontFamily: 'Poppins-Medium',
  }),
  indicatorStyle: {
    backgroundColor: '#020202',
    height: 3,
    width: '12%',
    marginLeft: '5%',
  },
  tabStyle: {
    width: 'auto',
  },
  style: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  tab: {paddingTop: 8, paddingHorizontal: 24},
  tabView: {backgroundColor: 'white'},
});
