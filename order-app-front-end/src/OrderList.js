import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

import OrderListItem from './OrderListItem';
import OrderListToolbar from './OrderListToolbar';
import AdvancedComponent from "./AdvancedComponent";
import Caption from "./Caption";

class OrderList extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		data:React.PropTypes.array.isRequired,
		onOrderMarkedAsAccepted:React.PropTypes.func,
		onOrderMarkedMarkAsReady:React.PropTypes.func,
		onOrderMarkedAsShipped:React.PropTypes.func,
		onEditOrder:React.PropTypes.func,
		onDeleteOrder:React.PropTypes.func
	};

	constructor(props) {
		super(props, "./OrderList-Default.css");

		this.state = {
			listItemMode:{}
		}
	}

	componentWillMount() {
		var newListItemMode = {};
		this.props.data.forEach((element)=>{
			newListItemMode[element.id] = "normal";
		});

		this.setState({listItemMode:newListItemMode});
	}

	onListItemExpanded = (order) => {
		const orderId = order.id;

		var newListItemMode = {}
			for(var key in this.state.listItemMode){
				if (key == orderId) {
			  		newListItemMode[key] = (this.state.listItemMode[key] === "opened") ? "normal" : "opened";
			  	} else {
			  		newListItemMode[key] = this.state.listItemMode[key];
			  	}				
			}

		this.setState({listItemMode:newListItemMode});
	};

	createListItems = () => {
		const listItemCallbacks = {
			onOrderMarkedAsAccepted:this.props.onOrderMarkedAsAccepted,
			onOrderMarkedMarkAsReady:this.props.onOrderMarkedMarkAsReady,
			onOrderMarkedAsShipped:this.props.onOrderMarkedAsShipped,
			onEditOrder:this.props.onEditOrder,
			onDeleteOrder:this.props.onDeleteOrder
		}

		const items = this.props.data.map((order)=> {
			const mode = this.state.listItemMode[order.id];
			console.log(mode);
			return <OrderListItem 
					key={order.id}
					expandMode={mode}
					onExpand={this.onListItemExpanded}
					order={order} 
					{...listItemCallbacks}/>;
		});

		return items;
	};

	createOrderListToolbar = (orderListToolbar) => {
		return <OrderListToolbar />;
	};

	render() {
		const listItems = this.createListItems(this.props.data);
		const orderListToolbar = this.createOrderListToolbar();

		return (
			<div id={this.props.id}
				 className="order-list-container">
					{orderListToolbar}
					<List className="order-list">
					<Subheader>Orders</Subheader>
					<ReactCSSTransitionGroup 
						transitionName="list-item-mode-transition"
						className="list-item-mode-transition-group"
						transitionEnterTimeout={500}
      					transitionLeaveTimeout={500}>
						{listItems}
					</ReactCSSTransitionGroup>
					</List>
							
		    </div>
		);
	}
}

export default muiThemeable()(OrderList);