const initStateOrders = {
  orders: [],
  inProgress: [],
  passOrders: [],
};

export const orderReducer = (state = initStateOrders, action) => {
  if (action.type === 'SET_ORDERS') {
    return {
      ...state,
      orders: action.value,
    };
  }

  if (action.type === 'SET_IN_PROGRESS') {
    return {
      ...state,
      inProgress: action.value,
    };
  }

  if (action.type === 'SET_PASS_ORDERS') {
    return {
      ...state,
      passOrders: action.value,
    };
  }

  return state;
};
