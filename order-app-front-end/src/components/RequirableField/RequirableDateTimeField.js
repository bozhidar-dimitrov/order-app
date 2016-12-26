import React from 'react';
import "./RequirableDateTimeField-Default.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

import RequirableFieldBase from "./RequirableFieldBase"
import TextField from 'material-ui/TextField';

const RequirableDateTimeField = (WrappedField) => {
return class RequirableDateTimeFieldClass extends RequirableFieldBase {

	onValueChanged = (e, date) => {
		this.updateState(date);
		this.props.onChange(e, date);
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

export default RequirableDateTimeField;