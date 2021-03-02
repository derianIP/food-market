import axios from 'axios';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';
import {API_HOST} from '../../config';

export const signUpAction = (registerData, photoReducer, navigation) => (
  dispatch,
) => {
  axios
    .post(`${API_HOST.url}/register`, registerData)
    .then((res) => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const userProfile = res.data.data.user;

      storeData('token', token);

      if (photoReducer.isUploadPhoto) {
        const photoForUplaod = new FormData();
        photoForUplaod.append('file', photoReducer);

        axios
          .post(`${API_HOST.url}/user/photo`, photoForUplaod, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resUpload) => {
            userProfile.profile_photo_url = `http://foodmarket-backend.buildwithangga.id/storage/${resUpload.data.data[0]}`;
            storeData('userProfile', userProfile);
            navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
          })
          .catch((errUpload) => {
            console.log('upload gagal', errUpload.response);
            navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
          });
      } else {
        storeData('userProfile', userProfile);
        navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
      }

      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.message);
    });
};

export const loginAction = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/login`, form)
    .then((res) => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const userProfile = res.data.data.user;
      storeData('token', token);
      storeData('userProfile', userProfile);
      dispatch(setLoading(false));
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.message);
    });
};
