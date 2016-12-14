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


import AdvancedComponent from "./../components/AdvancedComponent"

class OrderInput extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id={this.props.id}
				 className="order-input-container">
				 <div className="order-input-title">Place Order</div>
				 <Divider />
				<TextField hintText="Client Name" underlineShow={false} />
			    <Divider />
			    <TextField hintText="Address" underlineShow={false} />
			    <Divider />
			    <TextField hintText="Client Phone" underlineShow={false} />
			    <Divider />
			    <TextField hintText="Order" underlineShow={false} />
			    <Divider />
			    <DatePicker className="due-date-picker" hintText="Due Date" />
			    <TimePicker className="time-picker" hintText="Time"/>
			    <TextField hintText="Vaucher Number" underlineShow={false} />
			    <Divider />
			    <RaisedButton className="place-order-button" label="Place Order" />
		    </div>
		);
	}
}

export default muiThemeable()(OrderInput);