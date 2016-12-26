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

import {RequirableTextField} from "./../components/RequirableField";
import {RequirableDateTimeField} from "./../components/RequirableField";

import AdditionalPropTypes from "./../utils/AdditionalPropTypes";
import AdvancedComponent from "./../components/AdvancedComponent"
import OptimisticModel from "./../model/OptimisticModel";
import Order from "./../model/Order";

const RequirableTextFieldComponent = RequirableTextField(TextField);
const RequirableDataPicker = RequirableDateTimeField(DatePicker);
const RequirableTimePicker = RequirableDateTimeField(TimePicker);


class OrderInput extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		orderToEdit:React.PropTypes.instanceOf(OptimisticModel),
		onEmptyChanged:AdditionalPropTypes.typedFunc(React.PropTypes.boolean),
		onPlaceOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
	};

	static get ACTION_BUTTON_PLACE_ORDER(){return "Place Order"};
	static get ACTION_BUTTON_EDIT_ORDER(){return "Save Changes"};

	constructor(props) {
		super(props);
		this.updateStateFromProps(props, (newState)=>{
			this.state = newState;
			console.log(JSON.stringify(newState));
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

	createEmptyOptimisticModel = () => {
		return new OptimisticModel(new Order("","","","","",null,"",null,""), false);
	};

	updateStateFromProps = (props, stateSetter) => {
		let order = undefined;
		let containsEmptyData = true;
		let actionButtonLabel = OrderInput.ACTION_BUTTON_PLACE_ORDER;
		if (props.orderToEdit) {
			order = Object.assign(new OptimisticModel(), props.orderToEdit);
			containsEmptyData = this.containsEmptyData(order);
			actionButtonLabel = OrderInput.ACTION_BUTTON_EDIT_ORDER;
		} else {
			order = this.createEmptyOptimisticModel();
		}
		const correctlyFilled = this.checkCorrectlyFilled(order);

		stateSetter({order, containsEmptyData, actionButtonLabel, correctlyFilled});
	};

	checkCorrectlyFilled(order) {
		return (order.model.clientName 
			&& order.model.clientPhone 
			&& order.model.clientOrder 
			&& order.model.dueDate
			&& order.model.time
		);
	}

	containsEmptyData = (order) => {
		return (!(order.model.clientName 
			|| order.model.clientAddress 
			|| order.model.clientPhone 
			|| order.model.clientOrder 
			|| order.model.dueDate
			|| order.model.voucherNumber
			|| order.model.time
			));
	};

	onPlaceOrder = () => {
		if (this.props.onPlaceOrder) {
			var order = {...this.state.order};
			console.log("Placing Order:" + JSON.stringify(order));
			this.props.onPlaceOrder(order);
		}
	};

	changeOrderProperty = (propertyName, value) => {
		const prevIsEmptyData = this.state.containsEmptyData;

		this.setState((prevState, props)=>{
			let newOrder = {};
			newOrder[propertyName] = value;
			newOrder = {...prevState.order.model, ...newOrder};
			let newOptimisticModel = {...prevState.order, model:newOrder};
			console.log(JSON.stringify(newOptimisticModel));
			const isEmptyData = this.containsEmptyData(newOptimisticModel);
			const correctlyFilled = this.checkCorrectlyFilled(prevState.order);
			return {order:newOptimisticModel, containsEmptyData:isEmptyData, correctlyFilled}
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
	 	return <RequirableDataPicker 
	    	className="due-date-picker input-field" 
	    	hintText="Due Date:" 
	    	floatingLabelText="Due Date:"
	    	onChange={this.onDateChanged}
	    	underlineShow={false} 
	    	value={this.state.order.model.dueDate}/>;
	};

	createTimePickerInput = () => {
	    return <RequirableTimePicker 
	    	format="24hr"
	    	className="input-field time-picker"
	    	hintText="Delivery Time:"
	    	floatingLabelText="Delivery Time:"
	    	onChange={this.onTimeChanged}
	    	underlineShow={false} 
	    	value={this.state.order.model.time}/>;
	};

	render() {
		return (
			<div id={this.props.id}
				 className="order-input-container">
				 <div className="order-input-title">Place Order</div>
				 <Divider />
				<RequirableTextFieldComponent hintText="Enter Client Name" 
					floatingLabelText="Client Name:"
					className="input-field"
					underlineShow={false} 
					value={this.state.order.model.clientName}
					onChange={this.onClientNameChanged}/>
			    <Divider />
			    <RequirableTextFieldComponent hintText="Enter Address" 
			    	floatingLabelText="Address:"
			    	multiLine={true}
			    	className="input-field multiline-textfield"
			    	underlineShow={false} 
			    	value={this.state.order.model.clientAddress}
			    	onChange={this.onClientAddressChanged}/>
			    <Divider />
			    <RequirableTextFieldComponent hintText="Enter Phone" 
			    	floatingLabelText="Phone:" 
			    	className="input-field"
			    	underlineShow={false}
			    	value={this.state.order.model.clientPhone}
			    	onChange={this.onClientPhoneChanged} />
			    <Divider />
			    {this.creaetDatePickerInput()}
			    <Divider />
			    {this.createTimePickerInput()}
			    <Divider />
			    <TextField 
			    	hintText="Enter Vaucher Number:" 
			    	floatingLabelText="Vaucher Number:"
			    	className="input-field"
			    	underlineShow={false}
			    	onChange={this.onVoucherNumberChanged} 
			    	value={this.state.order.model.voucherNumber}/>
			    <Divider />
			    <RequirableTextFieldComponent hintText="Enter Order" 
			    	floatingLabelText="Order:" 
			    	className="input-field multiline-textfield"
			    	multiLine={true}
			    	underlineShow={false} 
			    	onChange={this.onClientOrderChanged}
			    	value={this.state.order.model.clientOrder}/>
			    <Divider />
			    <RaisedButton 
			    	primary={true}
			    	disabled = {!this.state.correctlyFilled}
			    	className="place-order-button" 
			    	label={this.state.actionButtonLabel}
			    	onTouchTap={this.onPlaceOrder}/>
		    </div>
		);
	}
}

export default muiThemeable()(OrderInput);