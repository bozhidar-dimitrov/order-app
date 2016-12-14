import AdvancedComponent from "./../AdvancedComponent";
import muiThemeable from 'material-ui/styles/muiThemeable'
import  "./LoginForm-Default.css";

import React from 'react';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class LoginForm extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		onLogin:React.PropTypes.func,
		errorMessage:React.PropTypes.string
	};

	constructor(props) {
		super(props);
	}

	onLogin = () => {
		if (this.props.onLogin) {
			this.props.onLogin(this.usernameInput.getValue(), this.passwordInput.getValue());
		}
	};

	onKeyDown = (event) => {
		if(event.key == "Enter") {
			this.onLogin();
		} 
	}

	render() {
		return (
			<div 
				id={this.props.id}
				className="login-form"
				onKeyDown={this.onKeyDown}>
				<span 
					className="login-form-title">{this.props.title}
				</span>
				<TextField 
					ref={(input) => { this.usernameInput = input; }}
					className="login-form-username"
				    hintText="Username"
				    onKeyDown={this.onKeyDown}
				   />
				<TextField 
					ref={(input) => { this.passwordInput = input; }}
					className="login-form-password"
			      	hintText="Password"
			      	type="Password"
			      	onKeyDown={this.onKeyDown}
			    />
			    <span 
			    	className="login-form-error-message">{this.props.errorMessage}
			    </span>
			    <RaisedButton 
			    	className="login-form-login-button"
			    	label="Login" 
			    	primary={true}
			    	onTouchTap={this.onLogin}
			    	/>
			</div>
		);
	}
}

export default muiThemeable()(LoginForm);