import React from "react";
import AdvancedComponent from "./../AdvancedComponent";

export default class RequirableFieldBase extends AdvancedComponent{
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
			textFieldClassName:RequirableFieldBase.EMPTY_CLASSNAME
		}
	}

	onValueChanged = (e) => {
		console.log("Value Changed:" + e.target.value);
		this.updateState(e.target.value);
		this.props.onChange(e);
	};

	updateState = (value) => {
		let errorText = this.props.messageOnEmptyField;
		let textFieldClassName = RequirableFieldBase.EMPTY_CLASSNAME;
		if (value) {
			errorText = "";
			textFieldClassName = RequirableFieldBase.NOT_EMPTY_CLASSNAME;
		}

		this.setState({errorText, textFieldClassName});
	};

	componentWillReceiveProps(newProps) {
		this.updateState(newProps.value);
	}
}