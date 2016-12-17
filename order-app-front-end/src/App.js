import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './views/MainView';

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

  onOrderMarkedAsAccepted = (order) => {
  	
  };

  onOrderMarkedMarkAsReady = (order) => {

  };

  onOrderMarkedAsShipped = (order) => {
  	
  };

  onUpdateOrder = (order) => {

  	let includesElement = false;
  	let orders = this.state.orders.map((element)=>{
  		if (element.model.id !== order.model.id) {
  			return element;
  		} else {
  			includesElement = true;
  			return order;
  		}
  	});

  	if (!includesElement) {
  		const newOrder = {...order.model, id:orders.length+1, status:OrderStatus.ACCEPTED};
  		const newOptimisticModel = new OptimisticModel(newOrder, false);
  		orders = [...orders, newOptimisticModel];
  	}
  	console.log("Orders:", JSON.stringify(orders));
  	this.setState({orders});
  };

  onDeleteOrder = (order) => {
  	console.debug("Deleting Order:" + JSON.stringify(order));
  	const orders = this.state.orders.filter((element)=> {element.model.id !== order.model.id});
  	this.setState({orders});
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
