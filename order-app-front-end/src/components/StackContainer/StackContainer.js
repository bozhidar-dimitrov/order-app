import React from 'react';
import AdvancedComponent from "./../AdvancedComponent"
import muiThemeable from 'material-ui/styles/muiThemeable'
import "./StackContainer-Default.css";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class StackContainer extends AdvancedComponent {
	static propTypes = {
		selectedStackItemKey:React.PropTypes.string
	};

	constructor(props) {
		super(props);
	}

	render() {
		var itemToShow = this.props.children.find((element, index, array) => {
			return element.key == this.props.selectedStackItemKey;
		});
		var indexOfItem = this.props.children.indexOf(itemToShow);
		var itemToShow = <div 
							style={{zIndex:indexOfItem}}
							key={this.props.selectedStackItemKey} 
							className="stackItem">{itemToShow}</div>;
		return (
			<div 
				className="stack-container"
			>
				<ReactCSSTransitionGroup
				  className="stack-container-transition-group"
		          transitionName="stack"
		          transitionEnterTimeout={1000}
		          transitionLeaveTimeout={1000}>
		          {itemToShow}
	        	</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default muiThemeable()(StackContainer);