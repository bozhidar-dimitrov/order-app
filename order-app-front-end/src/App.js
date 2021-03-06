import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './views/MainView';
import uuid from 'uuid/v4';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import orderApp from './reducers';

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
			), true)],
      ordersToShowFilter:null
  	}
  };

  componentWillMount() {
     let preloadedState = {'orders':[]}
     this.store = this.configureStore(preloadedState);
  }

  configureStore = (preloadedState) => {
    return createStore(orderApp, {orders:[]},  applyMiddleware(
      thunkMiddleware
    ))
  };

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

  containsOrderWithId = (orders, id) => {
    const elementWithTheSameId = orders.find((element)=>{return element.model.id == id});
    return (elementWithTheSameId != undefined);
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
  };

  onUpdateOrder = (order) => {
    console.log("Updating order " + JSON.stringify(order));
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
      console.log("New Orders" + JSON.stringify(orders));
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

  updateFilterOnServer = () => {
    //TO be implemented
  };

  onOrderListFilterChanged = (ordersToShowFilter) => {
    console.log(JSON.stringify(ordersToShowFilter));
    this.setState({ordersToShowFilter});
    this.updateFilterOnServer(ordersToShowFilter);
  };

  filterOrders = (orders) => {
    let resultOrders = this.state.orders;
    if (this.state.ordersToShowFilter) {
      resultOrders = orders.filter((element)=>{
        return (
          this.state.ordersToShowFilter.statusesToShow.includes(element.model.status) 
          && (element.model.dueDate >= this.state.ordersToShowFilter.fromDate)
          && (element.model.dueDate <= this.state.ordersToShowFilter.toDate)); 
      });
    }
    return resultOrders;
  }

  render() {
  	const mainViewCallbacks = {
  		onOrderMarkedAsAccepted:this.onOrderMarkedAsAccepted,
  		onOrderMarkedMarkAsReady:this.onOrderMarkedMarkAsReady,
  		onOrderMarkedAsShipped:this.onOrderMarkedAsShipped,
  		onUpdateOrder:this.onUpdateOrder,
  		onDeleteOrder:this.onDeleteOrder,
  		onOrderListFilterChanged:this.onOrderListFilterChanged
  	}
    return (
    	<MuiThemeProvider>
        <Provider store={this.store}>
      		<MainView id="app-main-view"
      			title="Order App"
      			orders={this.filterOrders(this.state.orders)}
      			{...mainViewCallbacks}/>
        </Provider>
    	</MuiThemeProvider>

    );
  }
}

export default App;
