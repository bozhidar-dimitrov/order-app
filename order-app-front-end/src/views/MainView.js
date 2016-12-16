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
			orders:[new Order(
				1,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"accepted"
			), new Order(
				2,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"ready"
			),new Order(
				3,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"shipped"
			), new Order(
				4,
				"ivan",
				"Mladost2",
				"123123123",
				"Some order",
				new Date(),
				"123142123",
				new Date(),
				"accepted"
			)]
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