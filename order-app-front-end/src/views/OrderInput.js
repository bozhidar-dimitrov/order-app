import React from 'react';
import "./OrderInput-Default.css";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AdditionalPropTypes from "./../utils/AdditionalPropTypes";
import AdvancedComponent from "./../components/AdvancedComponent"
import Order from "./../model/Order";

class OrderInput extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		orderToEdit:React.PropTypes.instanceOf(Order),
		onEmptyChanged:AdditionalPropTypes.typedFunc(React.PropTypes.boolean),
		onPlaceOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(Order))
	};

	constructor(props) {
		super(props);
		this.updateStateFromProps(props, (newState)=>{
			this.state = newState
		});
	}

	componentWillReceiveProps(nextProps) {
		var prevIsEmptyData = this.state.containsEmptyData;
		if (nextProps.orderToEdit !== this.props.orderToEdit) {
			this.updateStateFromProps(nextProps, (newState) => {
				this.setState(newState, ()=>{
					if (prevIsEmptyData != this.state.containsEmptyData) {
						this.props.onEmptyChanged(this.state.containsEmptyData)
					}
				});
			});
		}
	}

	componentDidMount() {
		this.props.onEmptyChanged(this.state.containsEmptyData);
	}

	updateStateFromProps = (props, stateSetter) => {
		let order = undefined;
		let containsEmptyData = true;
		if (props.orderToEdit) {
			order = {...props.orderToEdit};
			containsEmptyData = this.containsEmptyData(order);
		} else {
			order = new Order("","","","","",null,"",null,"");
		}

		stateSetter({order, containsEmptyData});
	};

	containsEmptyData = (order) => {
		return (!(order.clientName 
			|| order.clientAddress 
			|| order.clientPhone 
			|| order.clientOrder 
			|| order.dueDate
			|| order.voucherNumber
			|| order.time
			));
	};

	onPlaceOrder = () => {
		if (this.props.onPlaceOrder) {
			const order = {...this.state.order};
			this.props.onPlaceOrder(order);
		}
	};

	changeOrderProperty = (propertyName, value) => {
		const prevIsEmptyData = this.state.containsEmptyData;

		this.setState((prevState, props)=>{
			let newOrder = {};
			newOrder[propertyName] = value;
			newOrder = {...prevState.order, ...newOrder};
			const isEmptyData = this.containsEmptyData(newOrder);
			return {order:newOrder, containsEmptyData:isEmptyData}
		}, () => { //Called after state is changed
			if (prevIsEmptyData != this.state.containsEmptyData) {
				this.props.onEmptyChanged(this.state.containsEmptyData)
			}	
		});
	};

	onClientNameChanged = (event) => {
		this.changeOrderProperty("clientName", event.target.value);
	};

	onClientAddressChanged = (event) => {
		this.changeOrderProperty("clientAddress", event.target.value);
	};

	onClientPhoneChanged = (event) => {
		this.changeOrderProperty("clientPhone", event.target.value);
	};

	onClientOrderChanged = (event) => {
		this.changeOrderProperty("clientOrder", event.target.value);
	};

	onDateChanged = (event, date) => {
		this.changeOrderProperty("dueDate", date);
	};

	onTimeChanged = (event, date) => {
		this.changeOrderProperty("time", date);
	};

	onVoucherNumberChanged = (event) => {
		this.changeOrderProperty("voucherNumber", event.target.value);
	};

	creaetDatePickerInput = () => {
	 	return <DatePicker 
	    	className="due-date-picker" 
	    	hintText="Due Date" 
	    	onChange={this.onDateChanged}
	    	value={this.state.order.dueDate}/>;
	};

	createTimePickerInput = () => {
	    return <TimePicker 
	    	format="24hr"
	    	className="time-picker" 
	    	hintText="Time"
	    	onChange={this.onTimeChanged}
	    	value={this.state.order.time}/>;
	};

	render() {
		return (
			<div id={this.props.id}
				 className="order-input-container">
				 <div className="order-input-title">Place Order</div>
				 <Divider />
				<TextField hintText="Client Name" 
					underlineShow={false} 
					value={this.state.order.clientName}
					onChange={this.onClientNameChanged}/>
			    <Divider />
			    <TextField hintText="Address" 
			    	underlineShow={false} 
			    	value={this.state.order.clientAddress}
			    	onChange={this.onClientAddressChanged}/>
			    <Divider />
			    <TextField hintText="Client Phone" 
			    	underlineShow={false}
			    	value={this.state.order.clientPhone}
			    	onChange={this.onClientPhoneChanged} />
			    <Divider />
			    <TextField hintText="Order" 
			    	underlineShow={false} 
			    	onChange={this.onClientOrderChanged}
			    	value={this.state.order.clientOrder}/>
			    <Divider />
			    {this.creaetDatePickerInput()}
			    {this.createTimePickerInput()}
			    <TextField 
			    	hintText="Vaucher Number" 
			    	underlineShow={false}
			    	onChange={this.onVoucherNumberChanged} 
			    	value={this.state.order.voucherNumber}/>
			    <Divider />
			    <RaisedButton 
			    	className="place-order-button" 
			    	label="Place Order"
			    	onTouchTap={this.onPlaceOrder}/>
		    </div>
		);
	}
}

export default muiThemeable()(OrderInput);