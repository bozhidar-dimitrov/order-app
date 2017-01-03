import Order, {OrderStatus} from "./../model/Order";
import OptimisticModel from './../model/OptimisticModel';
import uuid from 'uuid/v4';

export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export function updateOrder(order) {
	return (dispatch) => {
		let orderCopy = null;
		if (!order.model.id) {
			const temporaryId = uuid();
      		orderCopy = Object.assign(new Order(), order.model, {"id":temporaryId, status: OrderStatus.ACCEPTED}); 
		} else {
			let status = order.model.status ? order.model.status : OrderStatus.ACCEPTED;
			orderCopy = Object.assign(new Order(), order.model, {status}); 
		}
  		const orderToUpdate =  new OptimisticModel(orderCopy, false);
		dispatch(updateOrderLocally(orderToUpdate));
		dispatch(updateOrderOnTheServer(orderToUpdate));
	}
}

export function updateOrderLocally(order) {
	return {
		type: UPDATE_ORDER,
		order
	}
}

export function updateOrderOnTheServer(order) {
	return (dispatch) => {
		window.setTimeout(()=> { //TODO - replace with actual implementation
	      const updatedOrder = Object.assign(new OptimisticModel(), order, {isSyncedWithTheServer:true});
	      dispatch(updateOrderLocally(updatedOrder));
	    }, 3000);
	};
}

export function deleteOrder(order) {
	return (dispatch) => {
		dispatch(deleteOrderLocally(order));
		dispatch(deleteOrderOnTheServer(order));
	}
}

export function deleteOrderLocally(order) {
	return {
		type: DELETE_ORDER,
		order
	}
}

export function deleteOrderOnTheServer(order) {
	return (dispatch) => {
		window.setTimeout(()=> { //TODO replace with actual implementation
	      dispatch(deleteOrderLocally(order)); 
	    }, 3000);
	};
}