import React from 'react';
import "./OrderListToolbar-Default.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

import ToggleButton from './../components/ToggleButton';
import DatePicker from 'material-ui/DatePicker';
import AdvancedComponent from "./../components/AdvancedComponent"
import AdditionalPropTypes from "./../utils/AdditionalPropTypes";
import {OrderStatus} from "./../model/Order";
import OrderListFilter from "./../model/OrderListFilter";

class OrderListToolbar extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string,
		onOrderListFilterChanged:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OrderListFilter))
	};

	constructor(props) {
		super(props);

		const currentDate = new Date();
		const oneDayBeforeCurrentDate = new Date();
		oneDayBeforeCurrentDate.setDate(currentDate.getDate()-1);
		const oneDayAfterCurrentDate = new Date();
		oneDayAfterCurrentDate.setDate(currentDate.getDate()+1);
		
		this.state = {
			acceptedToggled:true,
			readyToggled:true,
			shippedToggled:true,
			fromDate: oneDayBeforeCurrentDate,
			toDate: oneDayAfterCurrentDate
		}
	}

	componentDidMount() {
		this.onFilterChanged();
	}

	onFilterChanged = () => {
		if (this.props.onOrderListFilterChanged) {
			let statusesToShow = [];
			if (this.state.acceptedToggled) {
				statusesToShow.push(OrderStatus.ACCEPTED);
			}

			if (this.state.readyToggled) {
				statusesToShow.push(OrderStatus.READY);
			}

			if (this.state.shippedToggled) {
				statusesToShow.push(OrderStatus.SHIPPED);
			}

			const filter = new OrderListFilter(statusesToShow, this.state.fromDate, this.state.toDate);
			this.props.onOrderListFilterChanged(filter);		
		}
	};

	setStateAndCallOnFilterChanged = (stateSetter) => {
		this.setState(stateSetter, ()=>{
			this.onFilterChanged();
		});
	};

	onAcceptedOrderButtonToggle = (e) => {
		this.setStateAndCallOnFilterChanged((prevState, props) => {
			return {acceptedToggled: !prevState.acceptedToggled}
		});
	};

	onReadyOrderButtonToggle = (e) => {
		this.setStateAndCallOnFilterChanged((prevState, props) => {
			return {readyToggled: !prevState.readyToggled}
		});
	};

	onShippedOrderButtonToggle = (e) => {
		this.setStateAndCallOnFilterChanged((prevState, props) => {
			return {shippedToggled: !prevState.shippedToggled}
		});
	};

	onFromDateChanged = (e, date) => {
		this.setStateAndCallOnFilterChanged((prevState, props) => {
			return {fromDate:date};
		});
	};

	onToDateChanged = (e, date) => {
		this.setStateAndCallOnFilterChanged((prevState, props) => {
			return {toDate:date};
		});
	};

	render() {
		const normalButtonStyle = {
			color:"rgba(150, 150, 150, 1)"
		};

		const toggleButtonStyle = {
			color:this.props.muiTheme.palette.primary1Color
		};

		return (
			<div id={this.props.id} className="order-list-toolbar">
					<div className="button-bar">
						<ToggleButton 
							className="accepted-order-button"
							isToggled={this.state.acceptedToggled} 
							normal={{
								label:"Accepted",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}
							onToggle={this.onAcceptedOrderButtonToggle}
							/>
						<ToggleButton 
							className="ready-orders-button"  
							isToggled={this.state.readyToggled} 
							normal={{
								label:"Ready",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}
							onToggle={this.onReadyOrderButtonToggle}
							/>
						<ToggleButton 
							className="delivered-orders-button" 
							isToggled={this.state.shippedToggled}
							normal={{
								label:"Shipped",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}
							onToggle={this.onShippedOrderButtonToggle}
							/>
					</div>
					<div className = "dateToolbar">
						<DatePicker className="from-date-picker" 
							hintText="From Date" 
							defaultDate={this.state.fromDate}
							onChange={this.onFromDateChanged}
							/>
						<DatePicker className="to-date-picker" 
							hintText="To Date" 
							defaultDate={this.state.toDate}
							onChange={this.onToDateChanged}
							/>
					</div>
				</div>
		);
	}
}

export default muiThemeable()(OrderListToolbar);