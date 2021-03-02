import axios from 'axios';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

export const getOrders = () => (dispatch) => {
  getData('token').then((resToken) => {
    axios
      .get(`${API_HOST.url}/transaction`, {
        headers: {
          Authorization: resToken,
        },
      })
      .then((res) => {
        dispatch({type: 'SET_ORDERS', value: res.data.data.data});
      })
      .catch((err) => {
        console.log('gagal get data orders', err.response);
      });
  });
};

export const getInProgress = () => (dispatch) => {
  getData('token').then((resToken) => {
    axios
      .all([
        axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
          headers: {
            Authorization: resToken,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
          headers: {
            Authorization: resToken,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
          headers: {
            Authorization: resToken,
          },
        }),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          const pending = res1.data.data.data;
          const success = res2.data.data.data;
          const onDeivery = res3.data.data.data;
          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...pending, ...success, ...onDeivery],
          });
        }),
      )
      .catch((err) => {
        console.log('gagal get data orders', err.response);
      });
  });
};

export const getPassOrders = () => (dispatch) => {
  getData('token').then((resToken) => {
    axios
      .all([
        axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
          headers: {
            Authorization: resToken,
          },
        }),
        axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
          headers: {
            Authorization: resToken,
          },
        }),
      ])
      .then(
        axios.spread((res1, res2) => {
          const cancelled = res1.data.data.data;
          const delivered = res2.data.data.data;
          dispatch({
            type: 'SET_PASS_ORDERS',
            value: [...cancelled, ...delivered],
          });
        }),
      )
      .catch((err) => {
        console.log('gagal get data orders', err.response);
      });
  });
};
