import { connect } from 'react-redux';
import OrderList from './../views/OrderList';
import {OrderStatus} from './../model/Order';
import {updateOrderStatus} from './../actions/UpdateOrderStatus';

 const filterOrders = (orders, filter) => {
    let resultOrders = orders;
    if (filter) {
      resultOrders = orders.filter((element)=>{
        return (
          filter.statusesToShow.includes(element.model.status) 
          && (element.model.dueDate >= filter.fromDate)
          && (element.model.dueDate <= filter.toDate)); 
      });
    }
    return resultOrders;
  }

const mapStateToProps = (state, ownProps) => {
	return {
		data:filterOrders(state.orders, state.ordersFilter)
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    onOrderMarkedAsAccepted:(order)=>{
      dispatch(updateOrderStatus(order, OrderStatus.ACCEPTED));
    },
    onOrderMarkedMarkAsReady:(order)=> {
      dispatch(updateOrderStatus(order, OrderStatus.READY));
    },
    onOrderMarkedAsShipped:(order)=> {
      dispatch(updateOrderStatus(order, OrderStatus.SHIPPED));
    }
	}
}

const OrderListContainer = connect(mapStateToProps, mapDispatchToProps)
(OrderList);

export default OrderListContainer;