import React from 'react';
import "./RequireableTextField-Default.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

import AdvancedComponent from "./../AdvancedComponent"
import TextField from 'material-ui/TextField';

class RequireableTextField extends AdvancedComponent {
	static get EMPTY_CLASSNAME() {
		return "empty";
	}	

	static get NOT_EMPTY_CLASSNAME() {
		return "not-empty";
	}

	static get DEFAULT_ERROR_MESSAGE() {
		return "The field is required";
	};

	static propTypes = {
		messageOnEmptyField:React.PropTypes.string,
	};

	static defaultProps = {
		messageOnEmptyField:"This field is required"
	};

	constructor(props) {
		super(props);
		this.textField = null;

		this.state = {
			errorText:this.props.messageOnEmptyField,
			textFieldClassName:RequireableTextField.EMPTY_CLASSNAME
		}
	}

	onValueChanged = (e) => {
		console.log("Value Changed:" + e.target.value);
		this.updateState(e.target.value);
		this.props.onChange(e);
	}

	updateState = (value) => {
		let errorText = this.props.messageOnEmptyField;
		let textFieldClassName = RequireableTextField.EMPTY_CLASSNAME;
		if (value) {
			errorText = "";
			textFieldClassName = RequireableTextField.NOT_EMPTY_CLASSNAME;
		}

		this.setState({errorText, textFieldClassName});
		
	};

	componentWillReceiveProps(newProps) {
		this.updateState(newProps.value);
	}

	render() {
		var newProps = {...this.props};
		delete newProps["onChange"];
		delete newProps["messageOnEmptyField"];
		delete newProps["muiTheme"];

		var componentClassName = `${this.props.className} ${this.state.textFieldClassName}`;

		return (
			<TextField 
			{...newProps} 
			onChange={this.onValueChanged} 
			errorText={this.state.errorText} 
			className={componentClassName} />
		);
	}
}

export default muiThemeable()(RequireableTextField);