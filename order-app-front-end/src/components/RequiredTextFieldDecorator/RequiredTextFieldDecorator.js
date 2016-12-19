import React from 'react';
import "./RequiredTextFieldDecorator-Default.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

import AdvancedComponent from "./../AdvancedComponent"
import TextField from 'material-ui/TextField';

class RequiredTextFieldDecorator extends AdvancedComponent {
	constructor(props) {
		super(props);
	}

	onValueChanged = (e) => {
		if (!e.target.value) {
			e.target.errorMessage = this.props.errorMessage;
		} else {
			e.target.errorMessage = "";
		}
		this.props.onChange(e);
	}

	render() {
		var textComponent = React.Children.only(this.props.children);
		// if (!(textComponent instanceof TextField)) {
		// 	throw Error("The only child component of RequiredTextFieldDecorator should be of type TextField");
		// }

		return (
			<div className="required-text-field">
				{textComponent}
		    </div>
		);
	}
}

export default muiThemeable()(RequiredTextFieldDecorator
);