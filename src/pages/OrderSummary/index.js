import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {
  Button,
  Gap,
  Header,
  ItemListFood,
  ItemValue,
  Loading,
} from '../../components';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

const OrderSummary = ({navigation, route}) => {
  const {item, transaction, userProfile} = route.params;
  const [paymentUrl, setPaymentUrl] = useState('http://google.com');
  const [onPayment, setOnPayment] = useState(false);

  const onCheckout = () => {
    const checkoutData = {
      food_id: item.id,
      user_id: userProfile.id,
      quantity: item.totalItem,
      total: transaction.totalPrice,
      status: 'PENDING',
    };

    getData('token').then((resToken) => {
      axios
        .post(`${API_HOST.url}/checkout`, checkoutData, {
          headers: {
            Authorization: resToken,
          },
        })
        .then((res) => {
          setPaymentUrl(res.data.data.payment_url);
          setOnPayment(true);
        })
        .catch((err) => {
          console.log('error chekcout', err);
        });
    });
  };

  const onNavChange = (state) => {
    const webTitle = 'Laravel';
    if (state.title === webTitle) {
      navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]});
    }
  };

  if (onPayment) {
    return (
      <>
        <Header
          title="Payment"
          subTitle="Pay your order"
          onBack
          onPress={() => setOnPayment(false)}
        />
        <WebView
          source={{uri: paymentUrl}}
          onNavigationStateChange={onNavChange}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
        />
      </>
    );
  }

  return (
    <ScrollView>
      <View>
        <Header
          title="Chekcout Summary"
          subTitle="You deserve better meal"
          onBack={true}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Text style={styles.label}>Item Ordered</Text>
          <ItemListFood
            image={{uri: item.picturePath}}
            title={item.name}
            price={item.price}
            item={item.totalItem}
            type="order-summary"
          />
          <Gap height={16} />
          <Text style={styles.label}>Details Transaction</Text>
          <ItemValue
            label={item.name}
            value={transaction.total}
            type="currency"
          />
          <ItemValue
            label="Driver"
            value={transaction.driver}
            type="currency"
          />
          <ItemValue label="Tax 10%" value={transaction.tax} type="currency" />
          <ItemValue
            label="Total Price"
            value={transaction.totalPrice}
            type="currency"
            color="#1ABC9C"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Deliver to:</Text>
          <ItemValue label="Name" value={userProfile.name} />
          <ItemValue label="Phone No." value={userProfile.phoneNumber} />
          <ItemValue label="Address" value={userProfile.address} />
          <ItemValue label="House No." value={userProfile.houseNumber} />
          <ItemValue label="City" value={userProfile.city} />
        </View>
        <View style={styles.button}>
          <Button text="Checkout now" onPress={onCheckout} />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

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
