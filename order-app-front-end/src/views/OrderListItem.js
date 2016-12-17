import React from 'react';
import "./OrderListItem-Default.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

import {grey400} from 'material-ui/styles/colors';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import MapsLocalShipping from 'material-ui/svg-icons/maps/local-shipping';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentClear from 'material-ui/svg-icons/content/clear';

import AdvancedComponent from "./../components/AdvancedComponent";
import AdditionalPropTypes from "./../utils/AdditionalPropTypes";
import Order, {OrderStatus} from "./../model/Order";

class OrderListItem extends AdvancedComponent {
	static propTypes = {
		order:React.PropTypes.object.isRequired,
		expandMode:React.PropTypes.string.isRequired,
		onExpand:React.PropTypes.func.isRequired,
		onOrderMarkedAsAccepted:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(Order)),
		onOrderMarkedMarkAsReady:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(Order)),
		onOrderMarkedAsShipped:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(Order)),
		onEditOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(Order)),
		onDeleteOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(Order)),
	};

	constructor(props) {
		super(props);
	}

	onOrderMarkedAsAccepted = (order) => {
		if(this.props.onOrderMarkedAsAccepted) {
			this.props.onOrderMarkedAsAccepted(order);
		}
	};

	onOrderMarkedMarkAsReady = (order) => {
		if(this.props.onOrderMarkedMarkAsReady) {
			this.props.onOrderMarkedMarkAsReady(order);
		}
	};

	onOrderMarkedAsShipped = (order) => {
		if(this.props.onOrderMarkedAsShipped) {
			this.props.onOrderMarkedAsShipped(order);
		}
	};

	onEditOrder = (order) => {
		if(this.props.onEditOrder) {
			var orderToDispatch = {...order}
			this.props.onEditOrder(orderToDispatch);
		}
	};

	onDeleteOrder = (order) => {
		if(this.props.onDeleteOrder) {
			this.props.onDeleteOrder(order);
		}
	};

	createListItemRightIconMenu = (element) => {
		const iconButtonElement = (
		  <IconButton
		    touch={true}
		    tooltip="more"
		    tooltipPosition="bottom-left"
		  >
		    <MoreVertIcon color={grey400} />
		  </IconButton>
		);

		const rightIconMenu = (
		  <IconMenu iconButtonElement={iconButtonElement}>
		    <MenuItem 
		    	leftIcon={this.getOrderStatusIcon("accepted")}
		    	onTouchTap={(e)=>this.onOrderMarkedAsAccepted(element)}
		    	>Mark as Accepted
		    </MenuItem>
		    <MenuItem leftIcon={this.getOrderStatusIcon("ready")}
		    		  onTouchTap={(e)=>this.onOrderMarkedMarkAsReady(element)}>
		    		  Mark as Ready
		    </MenuItem>
		    <MenuItem leftIcon={this.getOrderStatusIcon("shipped")}
		    		  onTouchTap={(e)=>this.onOrderMarkedAsShipped(element)}>
		    		  Mark as Shipped
		    </MenuItem>
		    <Divider/>
		    <MenuItem 
		    	leftIcon={<EditorModeEdit className="list-item-left-icon edit"/>} 
		    	onTouchTap={(e)=>this.onEditOrder(element)}>
		    	Edit
	    	</MenuItem>
		    <MenuItem 
		    	leftIcon={<ContentClear className="list-item-left-icon clear"/>}
		    	onTouchTap={(e)=>this.onDeleteOrder(element)}>
		    	Delete
		    </MenuItem>
		  </IconMenu>
		);

		return rightIconMenu;
	};

	createOrderTitle = (dueDate, timeDate) => {
		const date = dueDate.getDate() + '/' + dueDate.getMonth() +'/'+dueDate.getFullYear();
		const time = timeDate.getHours() + ':' + timeDate.getMinutes();
		const elementTitle = `${date} ${time}`;
		return <span 
				className="order-item-title">{elementTitle}
		</span>;
	};	

	getOrderStatusIcon = (elementStatus) => {
		switch (elementStatus) {
			case OrderStatus.ACCEPTED:
				return <ActionAssignment className="list-item-left-icon accepted"/>
			case OrderStatus.READY:
				return <ActionDone className="list-item-left-icon ready"/>
			case OrderStatus.SHIPPED:
				return <MapsLocalShipping className="list-item-left-icon shipped"/>
			default:
				throw new Error("Unrecognized element status:" + elementStatus);
		}
	};

	createOrderInfo = (element) => {
		return 	<div key="normal" className ="order-info-container">
					<span className ="order-info">
						<span className = "client-name-label order-info-label">Client Name:</span>
						<span className = "client-name order-info-value">{element.model.clientName}</span>
					</span>
					<span className ="order-info">
						<span className = "client-address-label order-info-label">Address:</span>
						<span className = "client-address order-info-value">{element.model.clientAddress}</span>
					</span>
					<span className ="order-info">
						<span className = "client-phone-label order-info-label">Phone:</span>
						<span className = "client-phone order-info-value">{element.model.clientPhone}</span>
					</span>
					<span className ="order-info">
						<span className = "vocher-number-label order-info-label">Voucher Number:</span>
						<span className = "voucher-number order-info-value">{element.model.voucherNumber}</span>
					</span>
					<span className ="order-info">
						<span className = "client-order-label order-info-label">Order:</span>
						<span className = "client-order order-info-value">{element.model.clientOrder}</span>
					</span>
				</div>
	};

	createListItem = (order) => {
		const orderId = order.id;

		const expandListItemFunction = () => {
			this.props.onExpand(order);
		}

		const rightIconMenu = this.createListItemRightIconMenu(order);
		const orderTitle = this.createOrderTitle(order.model.dueDate, order.model.time);
		if (this.props.expandMode === "opened") {
			return <ListItem 
							key={order.model.id} 
							className="order-item-opened" 
							primaryText={orderTitle} 
							secondaryText={this.createOrderInfo(order)}
							onTouchTap={expandListItemFunction}
							rightIconButton={rightIconMenu}
							leftIcon={this.getOrderStatusIcon(order.model.status)}>
					</ListItem>;
		} else {
			return	<ListItem 
							key={order.model.id} 
							className="order-item-normal" 
							primaryText={orderTitle} 
							secondaryText={order.model.clientOrder}
							rightIconButton={rightIconMenu}
							onTouchTap={expandListItemFunction}
							leftIcon={this.getOrderStatusIcon(order.model.status)}>
					</ListItem>;
		}
	};

	render() {
		return this.createListItem(this.props.order);
	}
}

export default muiThemeable()(OrderListItem);