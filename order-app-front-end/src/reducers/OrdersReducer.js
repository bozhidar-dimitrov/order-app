import {ADD_ORDER, UPDATE_ORDER, DELETE_ORDER, CREATE_ORDER} from "./../actions/OrdersCrud";
import {UPDATE_ORDER_STATUS} from "./../actions/UpdateOrderStatus";
import Order, {OrderStatus} from "./../model/Order";
import OptimisticModel from "./../model/OptimisticModel";

const orders = (state=[], action) => {
	switch (action.type) {
		case ADD_ORDER: {
			
		}
    case UPDATE_ORDER_STATUS: {
      return updateOrderStatus(state, action.order, action.status)
    }

		case UPDATE_ORDER: {
			console.log("Updating order");
			return onUpdateOrder(state, action.order);
		}

		case DELETE_ORDER: {
			return onDeleteOrder(state, action.order);
		}

		default: {
			return state;
		}
	}
};

const updateOrder = (orders, order) => {
    let newOrders = orders.map((element)=>{
      if (element.model.id !== order.model.id) {
        return {...element};
      } else {
        return {...order};
      }
    });

    return newOrders;
};		

const containsOrderWithId = (orders, id) => {
  const elementWithTheSameId = orders.find((element)=>{return element.model.id == id}); 
  return (elementWithTheSameId != undefined);
};

const insertOrder = (orders, order) => {
    const newOrders = [...orders, order];
	return newOrders;
};

const deleteOrder = (orders, order) => {
    const newOrders = orders.filter((element)=> {
      return (element.model.id != order.model.id);
    });
    return [...newOrders];
};

const onUpdateOrder = (state, order) => {
    console.log("Updating order " + JSON.stringify(order));
    let orders = null;
    if (containsOrderWithId(state, order.model.id)) {
      orders = updateOrder(state, order);
    } else {
      orders = insertOrder(state, order);
    };

	return orders;
};

const onDeleteOrder = (state, order) => {
    var orders = deleteOrder(state, order);
    return orders;
};

const updateOrderStatus = (orders, order, status) => {
  const shippedElement = Object.assign(new OptimisticModel(), order);
  shippedElement.model.status = status;
  return onUpdateOrder(orders, order);
};

export default orders;