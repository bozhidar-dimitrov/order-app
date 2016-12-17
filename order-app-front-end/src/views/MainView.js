import React, { Component } from 'react';
import './MainView-Default.css'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable'

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import StackContainer from './../components/StackContainer';
import Order from './../model/Order';
import OptimisticModel from './../model/OptimisticModel';
import OrderListFilter from './../model/OrderListFilter';
import AdditionalPropTypes from "./../utils/AdditionalPropTypes";

class MainView extends Component {
	static propTypes = {
		orders:React.PropTypes.arrayOf(React.PropTypes.instanceOf(OptimisticModel)),
		onOrderMarkedAsAccepted:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onOrderMarkedMarkAsReady:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onOrderMarkedAsShipped:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onUpdateOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onDeleteOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onOrderListFilterChanged:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel))
	}

	constructor(props) {
		super(props);

		this.LOGIN_SCREEN = "login-screen";
		this.HOME_SCREEN = "home_screen";

		this.state = {
			isDrawerOpen:false,
			isLoggedIn:true,
			loginErrorMessage:"",
			currentScreen:this.HOME_SCREEN
		}
	}

	onLogin = (username, password) => {
		//TODO - Implement server connection
		if (username=="admin" && password=="123") {
			this.setState({
							isLoggedIn:true,
							currentScreen:this.HOME_SCREEN
						});
		} else {
			this.setState({loginErrorMessage:"Invalid credentails"});
		}
	};

	onLogout = () => {
		this.setState({
			isLoggedIn:false,
			currentScreen:this.LOGIN_SCREEN
		});
	}

	openMainMenu = () => {
		this.setState({
			isDrawerOpen:true
		});
	};

	closeMainMenu = () => {
		this.setState({
			isDrawerOpen:false
		})
	};

	getAppBar = () => {
		if (!this.state.isLoggedIn) {
			return <AppBar
					id="main-application-bar"
				    title = {this.props.title}
				    onLeftIconButtonTouchTap = {this.openMainMenu}
				    showMenuIconButton = {this.state.isLoggedIn}
				    iconClassNameRight = "muidocs-icon-navigation-expand-more"
				  />
		} else {
			const logoutButton = <FlatButton 
				    				  	label="Logout" 
				    				  	onTouchTap = {this.onLogout}
				    			 />
			return <AppBar
					id="main-application-bar"
				    title = {this.props.title}
				    onLeftIconButtonTouchTap = {this.openMainMenu}
				    showMenuIconButton = {this.state.isLoggedIn}
				    iconElementRight={logoutButton}/>
		}
	};

	render() {
		const appBar = this.getAppBar();

		const homeScreenCallbacks = {
			onOrderMarkedAsAccepted:this.props.onOrderMarkedAsAccepted,
			onOrderMarkedMarkAsReady:this.props.onOrderMarkedMarkAsReady,
			onOrderMarkedAsShipped:this.props.onOrderMarkedAsShipped,
			onUpdateOrder:this.props.onUpdateOrder,
			onDeleteOrder:this.props.onDeleteOrder,
			onOrderListFilterChanged:this.props.onOrderList
		}

		return (
			<div 
				id = {this.props.id}
				className="main-view">
				{appBar}
				<Drawer 
					open = {this.state.isDrawerOpen}>
					<AppBar 
						id="drawer-app-bar"
						title = "Back" 
						onTitleTouchTap = {this.closeMainMenu}
						showMenuIconButton = {false} 
						className = "menu-bar-title" />
				    <MenuItem>Orders</MenuItem>
				    <MenuItem>Accounting</MenuItem>
				</Drawer>
				<div id = "main-content">
					<StackContainer selectedStackItemKey = {this.state.currentScreen}>
						<LoginScreen 
						id = "app-login-screen"
						key = {this.LOGIN_SCREEN}
						title = "Please Enter Your Credentials"
						errorMessage  ={this.state.loginErrorMessage}
						onLogin = {this.onLogin}/>
						<HomeScreen 
							id="app-home-screen"
							key={this.HOME_SCREEN}
							orders={this.props.orders}
							{...homeScreenCallbacks}
							> 
						</HomeScreen>
					</StackContainer>
				</div>
			</div>
		);
	}
}

export default muiThemeable()(MainView);