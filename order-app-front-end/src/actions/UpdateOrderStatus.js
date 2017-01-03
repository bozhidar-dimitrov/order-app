export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS"; 

export function updateOrderStatus(order, status) {
  return (dispatch) => {
    dispatch(updateOrderStatusLocally(order, status));
    dispatch(updateOrderStatusOnTheServer(order, status));
  }
};

export function updateOrderStatusOnTheServer(order, status) {
  return (dispatch) => {
    console.log("Sending data to server for delete");
  };
}

export function updateOrderStatusLocally(order, status) {
  return {
    type: UPDATE_ORDER_STATUS,
    order,
    status
  }
}