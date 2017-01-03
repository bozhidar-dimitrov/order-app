import { combineReducers } from 'redux';
import orders from './OrdersReducer';
import ordersFilter from './OrdersFilterReducer';

const orderApp = combineReducers({
  orders,
  ordersFilter
});

export default orderApp;