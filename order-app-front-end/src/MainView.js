import React, { Component } from 'react';
import './MainView.css'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable'

import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import StackContainer from './StackContainer';

class MainView extends Component {
	constructor(props) {
		super(props);

		this.LOGIN_SCREEN = "login-screen";
		this.HOME_SCREEN = "home_screen";

		this.state = {
			isDrawerOpen:false,
			isLoggedIn:true,
			loginErrorMessage:"",
			currentScreen:this.HOME_SCREEN,
			orders:[{
				"id":1,
				"clientName":"ivan",
				"clientAddress":"Mladost2",
				"clientPhone": "123123123",
				"clientOrder": "Some order",
				"dueDate":"21/01/2016",
				"voucherNumber": "123142123",
				"time":"17:30",
				"status": "accepted"
			},{
				"id":2,
				"clientName":"ivan",
				"clientAddress":"Mladost2",
				"clientPhone": "123123123",
				"clientOrder": "Some order",
				"dueDate":"21/01/2016",
				"voucherNumber": "123142123",
				"time":"17:30",
				"status": "ready"
			},{
				"id":3,
				"clientName":"ivan",
				"clientAddress":"Mladost2",
				"clientPhone": "123123123",
				"clientOrder": "Some order",
				"dueDate":"21/01/2016",
				"voucherNumber": "123142123",
				"time":"17:30",
				"status": "shipped"
			},{
				"id":4,
				"clientName":"ivan",
				"clientAddress":"Mladost2",
				"clientPhone": "123123123",
				"clientOrder": "Some order",
				"dueDate":"21/01/2016",
				"voucherNumber": "123142123",
				"time":"17:30",
				"status": "accepted"
			}]
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
							orders={this.state.orders}> 
						</HomeScreen>
					</StackContainer>
				</div>
			</div>
		);
	}
}

export default muiThemeable()(MainView);