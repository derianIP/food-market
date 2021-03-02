import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Header, Select, TextInput} from '../../components';
import {setLoading, signUpAction} from '../../redux/action';
import {useForm} from '../../utils';

const SignUpAddress = ({navigation}) => {
  const [form, setForm] = useForm({
    address: '',
    city: 'Bandung',
    houseNumber: '',
    phoneNumber: '',
  });

  const {registerReducer, photoReducer} = useSelector((state) => state);

  const dispatch = useDispatch();

  const onSubmit = () => {
    const data = {
      ...form,
      ...registerReducer,
    };

    dispatch(setLoading(true));
    dispatch(signUpAction(data, photoReducer, navigation));
  };

  return (
    <ScrollView contentContainerStyle={styles.ScrollView}>
      <View style={styles.page}>
        <Header
          title="Address"
          subTitle="Make sure it’s valid"
          onBack={true}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Phone No."
            placeholder="Type your phone number"
            value={form.phoneNumber}
            onChangeText={(value) => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Adress"
            placeholder="Type your address"
            value={form.address}
            onChangeText={(value) => setForm('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="House No."
            placeholder="Type your house number"
            value={form.houseNumber}
            onChangeText={(value) => setForm('houseNumber', value)}
          />
          <Gap height={16} />
          <Select
            label="City"
            value={form.city}
            onSelectChange={(value) => setForm('city', value)}
          />
          <Gap height={24} />
          <Button text="Sign Up Now" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  ScrollView: {flexGrow: 1},
  page: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 26,
    backgroundColor: 'white',
    marginTop: 24,
    flex: 1,
  },
});
