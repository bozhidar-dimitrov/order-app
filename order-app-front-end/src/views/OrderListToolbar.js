import React from 'react';
import "./OrderListToolbar-Default.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

import ToggleButton from './../components/ToggleButton';
import DatePicker from 'material-ui/DatePicker';
import AdvancedComponent from "./../components/AdvancedComponent"

class OrderListToolbar extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

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
							isToggled={true} 
							normal={{
								label:"Accepted",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}/>
						<ToggleButton 
							className="ready-orders-button"  
							isToggled={false}
							normal={{
								label:"Ready",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}
							/>
						<ToggleButton 
							className="delivered-orders-button" 
							isToggled={false}
							normal={{
								label:"Delivered",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}/>
					</div>
					<div className = "dateToolbar">
						<DatePicker className="from-date-picker" hintText="From Date" />
						<DatePicker className="to-date-picker" hintText="To Date" />
					</div>
				</div>
		);
	}
}

export default muiThemeable()(OrderListToolbar);