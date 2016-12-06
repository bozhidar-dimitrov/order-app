import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import muiThemeable from 'material-ui/styles/muiThemeable';


import OrderInput from "./OrderInput";
import OrderList from "./OrderList";
import AdvancedComponent from "./AdvancedComponent";

class HomeScreen extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		orders:React.PropTypes.array.isRequired
	};

	constructor(props) {
		super(props, "./HomeScreen.css");
		this.state = {
			showControlPanel:false
		}
	}

	onLogin = (username, password) => {
		if (this.props.onLogin) {
			this.props.onLogin(username, password);
		}
	};

	openControlPanel = () => {
		this.setState({showControlPanel:true});
	};

	closeControlPanel = () => {
		this.setState({showControlPanel:false});
	};

	getFloatingActionButton = () => {
		if (!this.state.showControlPanel) {
			return <FloatingActionButton 
				className="add-new-order-button"
				onTouchTap={this.openControlPanel}>
				<ContentAdd/>
			</FloatingActionButton>
		} else {
			return <FloatingActionButton 
				className="add-new-order-button-control-panel"
				onTouchTap={this.closeControlPanel}>
				<HardwareKeyboardArrowLeft/>
			</FloatingActionButton>
		}
}

	render() {

		const controlPanelClassName = this.state.showControlPanel ? "control-panel-slided" : "control-panel";
		const floatingActionButton = this.getFloatingActionButton();
		return (	
			<Paper id = {this.props.id} className="home-screen-container">
				<ReactCSSTransitionGroup 
					transitionName="home-screen-transition"
					className="home-screen-transition-group"
					transitionEnterTimeout={1000}
		          	transitionLeaveTimeout={1000}>
		         	{floatingActionButton}
				<Paper key="controlPanel" className={controlPanelClassName} zDepth={2}>
					{this.state.showControlPanel && 
						<OrderInput id="app-order-input"/> }
				</Paper> 
				<Paper key="orders" className="orders" zDepth={2}>
					<OrderList id="app-order-list" data={this.props.orders}/>
				</Paper>

				</ReactCSSTransitionGroup>
			</Paper>
		);
	}
}

export default muiThemeable()(HomeScreen);