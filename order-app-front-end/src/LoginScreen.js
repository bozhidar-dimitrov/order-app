import React from 'react';
import AdvancedComponent from "./AdvancedComponent"
import LoginForm from './LoginForm';
import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable'
 
class LoginScreen extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		onLogin:React.PropTypes.func,
		errorMessage:React.PropTypes.string
	};

	constructor(props) {
		super(props, "./LoginScreen.css");
	}

	onLogin = (username, password) => {
		if (this.props.onLogin) {
			this.props.onLogin(username, password);
		}
	};

	render() {
		return (
			<Paper id = {this.props.id} className="login-screen-container">
				<LoginForm
					id="app-login-form"
					title={this.props.title}
					onLogin = {this.onLogin}
					errorMessage = {this.props.errorMessage}/>
			</Paper>
		);
	}
}

export default muiThemeable()(LoginScreen);