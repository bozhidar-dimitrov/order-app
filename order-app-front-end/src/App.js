import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './views/MainView';
import uuid from 'uuid/v4';

import Order, {OrderStatus} from "./model/Order";
import OptimisticModel from "./model/OptimisticModel";
import OrderListFilter from "./model/OrderListFilter";

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  		orders:[new OptimisticModel(new Order(
				1,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"accepted"
			), true),new OptimisticModel(new Order(
				2,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"ready"
			), true), new OptimisticModel(new Order(
				3,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"shipped"
			), true), new OptimisticModel(new Order(
				4,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"accepted"
			), true)]
  	}
  }

  markOrderByIdWithStatus = (orders, orderId, status) => {
    const result = orders.map((element)=>{
      if (element.model.id !== orderId) {
        return element;
      } else {
        const shippedElement = Object.assign(new OptimisticModel(), element);
        shippedElement.model.status = status;
        return shippedElement;
      }
    });
    return result;
  };

  updateOrderStatus = (order, status) => {
    const orders = this.markOrderByIdWithStatus(this.state.orders, order.model.id, status);
    this.setState({orders});
  };

  onOrderMarkedAsAccepted = (order) => {
  	this.updateOrderStatus(order, OrderStatus.ACCEPTED);
  };

  onOrderMarkedMarkAsReady = (order) => {
    this.updateOrderStatus(order, OrderStatus.READY);
  };

  onOrderMarkedAsShipped = (order) => {
    this.updateOrderStatus(order, OrderStatus.SHIPPED);
  };

  updateOrder = (orders, order) => {
    let newOrders = orders.map((element)=>{
      if (element.model.id !== order.model.id) {
        return element;
      } else {
        return order;
      }
    });

    return newOrders;
  };

  insertOrder = (orders, order) => {
    const newOrders = [...orders, order];
    return newOrders;
  };

  deleteOrder = (orders, order) => {
    const newOrders = orders.filter((element)=> {
      return (element.model.id != order.model.id);
    });
    return newOrders;
  }

  containsOrderWithId = (orders, id) => {
    const elementWithTheSameId = orders.find((element)=>{return element.model.id == id});
    return (elementWithTheSameId != undefined);
  }

  onUpdateOrder = (order) => {
    let orders = null;
    if (this.containsOrderWithId(this.state.orders, order.model.id)) {
      const newOrder = Object.assign(new OptimisticModel(), order, {isSyncedWithTheServer:false});
      orders = this.updateOrder(this.state.orders, newOrder);
      this.setState({orders}, () =>{
          this.updateOrderInTheServer(newOrder);
      });
    } else {
      const temporaryId = uuid();
      const orderCopy = Object.assign(new Order(), order.model, {"id":temporaryId, "status":OrderStatus.ACCEPTED}); 
      const newOrder =  new OptimisticModel(orderCopy, false);
      orders = this.insertOrder(this.state.orders, newOrder);
      this.setState({orders}, () =>{
          this.insertOrderInTheServer(newOrder);
      });
    }
  };

  //TODO - Replace with actual implementation
  updateOrderInTheServer = (order) => {
    window.setTimeout(()=> {
      const updatedOrder = Object.assign(new OptimisticModel(), order, {isSyncedWithTheServer:true});
      const orders = this.updateOrder(this.state.orders, updatedOrder);
      this.setState({orders});
    }, 3000);
  };

  //TODO Replace with actual implementation
  insertOrderInTheServer = (order) => {
    window.setTimeout(()=> {
      const updatedOrder = Object.assign(new OptimisticModel(), order, {isSyncedWithTheServer:true});
      const orders = this.updateOrder(this.state.orders, updatedOrder);
      this.setState({orders});
    }, 3000);
  };

  deleteOrderInTheServer = (order) => {
    window.setTimeout(()=> {
      const orders = this.deleteOrder(this.state.orders, order);
      this.setState({orders});
    }, 3000);
  };

  onDeleteOrder = (order) => {
  	var newOptimisticModel = Object.assign(new OptimisticModel(), {...order}, {isSyncedWithTheServer:false});
    var orders = this.updateOrder(this.state.orders, newOptimisticModel);
    this.setState({orders});
    this.deleteOrderInTheServer(newOptimisticModel);
  };

  onOrderListFilterChanged = (onOrderListFilter) => {
    
  };

  render() {
	const mainViewCallbacks = {
		onOrderMarkedAsAccepted:this.onOrderMarkedAsAccepted,
		onOrderMarkedMarkAsReady:this.onOrderMarkedMarkAsReady,
		onOrderMarkedAsShipped:this.onOrderMarkedAsShipped,
		onUpdateOrder:this.onUpdateOrder,
		onDeleteOrder:this.onDeleteOrder,
		onOrderListFilterChanged:this.onOrderList
	}

    return (
    	<MuiThemeProvider>
    		<MainView id="app-main-view"
    			title="Order App"
    			orders={this.state.orders}
    			{...mainViewCallbacks}/>
      	</MuiThemeProvider>
    );
  }
}

export default App;
