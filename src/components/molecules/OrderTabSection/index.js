import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress, getPassOrders} from '../../../redux/action';
import ItemListFood from '../ItemListFood';

const InProgress = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {inProgress} = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getInProgress());
  }, [dispatch]);

  return (
    <View style={styles.tab}>
      {inProgress.map((order) => {
        return (
          <ItemListFood
            onPress={() => navigation.navigate('OrderDetail', order)}
            key={order.id}
            image={{uri: order.food.picturePath}}
            title={order.food.name}
            price={order.total}
            item={order.quantity}
            type="in-progress"
          />
        );
      })}
    </View>
  );
};

const PastOrders = () => {
  const dispatch = useDispatch();
  const {passOrders} = useSelector((state) => state.orderReducer);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getPassOrders());
  }, [dispatch]);

  return (
    <View style={styles.tab}>
      {passOrders.map((order) => {
        return (
          <ItemListFood
            onPress={() => navigation.navigate('OrderDetail', order)}
            key={order.id}
            image={{uri: order.food.picturePath}}
            title={order.food.name}
            price={order.total}
            item={order.quantity}
            date={order.created_at}
            status={order.status}
            type="past-orders"
          />
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

const OrderTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Pass Orders'},
  ]);

  const renderScene = SceneMap({
    1: InProgress,
    2: PastOrders,
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

export default OrderTabSection;

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
