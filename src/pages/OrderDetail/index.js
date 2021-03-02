import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {setLoading} from '../../redux/action';
import {getData} from '../../utils';

const OrderDetail = ({navigation, route}) => {
  const order = route.params;
  const dispatch = useDispatch();

  const onCancel = () => {
    const status = {
      status: 'CANCELLED',
    };
    dispatch(setLoading(true));
    getData('token').then((resToken) => {
      axios
        .post(
          `http://foodmarket-backend.buildwithangga.id/api/transaction/${order.id}`,
          status,
          {
            headers: {
              Authorization: resToken,
            },
          },
        )
        .then((res) => {
          dispatch(setLoading(false));
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        })
        .catch((err) => {
          console.log('gagal cancel order ', err.response);
          dispatch(setLoading(false));
        });
    });
  };
  return (
    <ScrollView>
      <View>
        <Header
          title="Order Detail"
          subTitle="You deserve better meal"
          onBack={true}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Text style={styles.label}>Item Ordered</Text>
          <ItemListFood
            image={{uri: order.food.picturePath}}
            title={order.food.name}
            price={order.food.price}
            item={order.quantity}
            type="order-summary"
          />
          <Gap height={16} />
          <Text style={styles.label}>Details Transaction</Text>
          <ItemValue
            label={order.food.name}
            value={order.food.price * order.quantity}
            type="currency"
          />
          <ItemValue label="Driver" value={50000} type="currency" />
          <ItemValue label="Tax 10%" value={(10 / 100) * order.total} />
          <ItemValue
            label="Total Price"
            value={order.total}
            type="currency"
            color="#1ABC9C"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Deliver to:</Text>
          <ItemValue label="Name" value={order.user.name} />
          <ItemValue label="Phone No." value={order.user.phoneNumber} />
          <ItemValue label="Address" value={order.user.address} />
          <ItemValue label="House No." value={order.user.houseNumber} />
          <ItemValue label="City" value={order.user.city} />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Order Status:</Text>
          <ItemValue
            label={`#${order.id}`}
            value={order.status}
            color={order.status === 'CANCELLED' ? '#D9435E' : '#1ABC9C'}
          />
        </View>
        <View style={styles.button}>
          {order.status === 'PENDING' && (
            <Button
              text="Cancel My Order"
              onPress={onCancel}
              color="#D9435E"
              textColor="white"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 12,
  },
  button: {marginVertical: 24, marginHorizontal: 24},
});
