import React from 'react';
import "./RequirableTextField-Default.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

import RequirableFieldBase from "./RequirableFieldBase"
import TextField from 'material-ui/TextField';

const RequirableTextField = (WrappedField) => {
return class RequirableTextFieldClass extends RequirableFieldBase {

	onValueChanged = (e) => {
		this.updateState(e.target.value);
		this.props.onChange(e);
	};

	render() {
		let newProps = {...this.props};
		delete newProps["onChange"];
		delete newProps["messageOnEmptyField"];
		delete newProps["muiTheme"];

		let componentClassName = `${this.props.className} ${this.state.textFieldClassName}`;

		return (
			<WrappedField 
			{...newProps} 
			onChange={this.onValueChanged} 
			errorText={this.state.errorText} 
			className={componentClassName} />
		);
	}
}};

export default RequirableTextField;