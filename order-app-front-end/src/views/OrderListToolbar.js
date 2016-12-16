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
		const oneDayAfterCurrentDate = new Date();
		oneDayAfterCurrentDate.setDate(currentDate.getDate()+1);
		this.state = {
			acceptedToggled:true,
			readyToggled:true,
			shippedToggled:false,
			fromDate: currentDate,
			toDate: oneDayAfterCurrentDate
		}
	}

	onFilterChanged = () => {
		if (this.props.onOrderListFilterChanged) {
			let statusesToShow = [];
			if (this.state.acceptedToggled) {
				statusesToShow.append(OrderStatus.ACCEPTED);
			}

			if (this.state.readyToggled) {
				statusesToShow.append(OrderStatus.READY);
			}

			if (this.state.shippedToggled) {
				statusesToShow.append(OrderStatus.SHIPPED);
			}

			const filter = new OrderListFilter(statusesToShow, this.state.fromDate, this.state.toDate);
			this.props.onOrderListFilterChanged(filter);		
		}
	}

	onAcceptedOrderButtonToggle = (e) => {
		this.setState((prevState, props) => {
			return {acceptedToggled: !prevState.acceptedToggled}
		})
		this.onFilterChanged();
	};

	onReadyOrderButtonToggle = (e) => {
		this.setState((prevState, props) => {
			return {readyToggled: !prevState.readyToggled}
		})
		this.onFilterChanged();
	};

	onShippedOrderButtonToggle = (e) => {
		this.setState((prevState, props) => {
			return {shippedToggled: !prevState.shippedToggled}
		})
		this.onFilterChanged();
	};

	onFromDateChanged = (e, date) => {
		this.setState({fromDate:date});
		this.onFilterChanged();
	};

	onToDateChanged = (e, date) => {
		this.setState({toDate:date})
		this.onFilterChanged();
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
								label:"Delivered",
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