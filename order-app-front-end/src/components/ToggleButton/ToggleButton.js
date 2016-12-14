import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import './ToggleButton-Default.css';

import FlatButton from 'material-ui/FlatButton';
import AdvancedComponent from "./../AdvancedComponent"

class ToggleButton extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string,
		onToggle:React.PropTypes.func,
		normal:React.PropTypes.object,
		toggle:React.PropTypes.object,
		isToggled:React.PropTypes.bool
	};

	constructor(props) {
		super(props);

		this.state = {
			isToggled:props.isToggled
		}
	}

	handleTouchTap = () => {
		this.setState((prevState, props) => {
			return {isToggled:!prevState.isToggled}
		});

		if (this.props.onToggle) {
			this.props.onToggle();
		}
	};

	createButton = () => {
		var defaultToggleStyle = {
				color: this.props.muiTheme.palette.alternateTextColor,
				backgroundColor:this.props.muiTheme.palette.primary1Color,
			}	

			var toggleStyle = this.props.toggleStyle ? this.props.toggleStyle : defaultToggleStyle; 


		const normalProps = {...this.props.normal};
		const toggleProps = {...this.props.normal, style:toggleStyle, ...this.props.toggle}; 

		if (this.state.isToggled) {
			
			return <FlatButton 	
						id={this.props.id} 
						className="toggle-button toggled" 
						style={toggleStyle}
						{...toggleProps}
						onTouchTap={this.handleTouchTap}/>
		} else {
			return <FlatButton 	
						id={this.props.id}
						className="toggle-button normal"
						{...normalProps}
						onTouchTap={this.handleTouchTap}/>
		}
	};

	render() {
		return this.createButton();				
	}
}

export default muiThemeable()(ToggleButton);