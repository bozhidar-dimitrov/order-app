import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AdvancedComponent from "./AdvancedComponent"

class Caption extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		children:React.PropTypes.element.isRequired,
		caption:React.PropTypes.string.isRequired
	};

	constructor(props) {
		super(props, "./Caption-Default.css");
	}

	render() {
		return (
			<div id={this.props.id}
				className="component-caption-container">
				{this.props.children}
				<span className="component-caption-text">
					{this.props.caption}
				</span>
		    </div>
		);
	}
}

export default muiThemeable()(Caption);