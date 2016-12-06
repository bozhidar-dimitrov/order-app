import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

import {grey400} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import MapsLocalShipping from 'material-ui/svg-icons/maps/local-shipping';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentClear from 'material-ui/svg-icons/content/clear';

import ToggleButton from './ToggleButton';
import AdvancedComponent from "./AdvancedComponent";
import Caption from "./Caption";

class OrderList extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		data:React.PropTypes.array.isRequired
	};

	constructor(props) {
		super(props, "./OrderList-Default.css");

		this.state = {
			listItemMode:{}
		}
	}

	componentDidMount() {
		var newListItemMode = {};
		this.props.data.forEach((element)=>{
			newListItemMode[element.id] = "normal";
		});

		this.setState({listItemMode:newListItemMode});
	}

	createElementInfo = (element) => {
		return 	<div key="normal" className ="order-info-container">
					<span className ="order-info">
						<span className = "client-name-label order-info-label">Client Name:</span>
						<span className = "client-name order-info-value">{element.clientName}</span>
					</span>
					<span className ="order-info">
						<span className = "client-address-label order-info-label">Address:</span>
						<span className = "client-address order-info-value">{element.clientAddress}</span>
					</span>
					<span className ="order-info">
						<span className = "client-phone-label order-info-label">Phone:</span>
						<span className = "client-phone order-info-value">{element.clientPhone}</span>
					</span>
					<span className ="order-info">
						<span className = "vocher-number-label order-info-label">Voucher Number:</span>
						<span className = "voucher-number order-info-value">{element.voucherNumber}</span>
					</span>
					<span className ="order-info">
						<span className = "client-order-label order-info-label">Order:</span>
						<span className = "client-order order-info-value">{element.clientOrder}</span>
					</span>
				</div>
	};

	createElementTitle = (elementTitle) => {
		return <span 
				className="order-item-title">{elementTitle}
		</span>;
	};	

	createElementEditMode = (elementStatus) => {
		const allOptions = ["accepted", "ready", "shipped"];
		const availableOptions = allOptions.filter((status)=>status != elementStatus);
		const statusOptions = availableOptions.map((status)=>{
			const captionId = `${elementStatus}-caption`;
			return <Caption id={captionId} 
							className="edit-mode-button"
							caption={status}>{this.getOrderStatusIcon(status)}</Caption> 
		});


		return <div key="opened" className="order-item-edit-mode-container">
					{statusOptions}
					<Caption id="edit-caption" className="edit-mode-button" caption="edit">
						<EditorModeEdit className="list-item-left-icon edit"/>
					</Caption>
					<Caption id="delete-caption" className="edit-mode-button" caption="delete">
						<ContentClear className="list-item-left-icon clear"/>
					</Caption>
			  </div>
	};


	createElementNormalTitle = (dueDate, time, order) => {
		return this.createElementTitle(`${dueDate} ${time} ${order}`);
	};

	createElementOpenedTitle = (dueDate, time) => {
		return this.createElementTitle(`${dueDate} ${time}`);
	};

	getOrderStatusIcon = (elementStatus) => {
		switch (elementStatus) {
			case 'accepted':
				return <ActionAssignment className="list-item-left-icon accepted"/>
			case 'ready':
				return <ActionDone className="list-item-left-icon ready"/>
			case 'shipped':
				return <MapsLocalShipping className="list-item-left-icon shipped"/>
			default:
				throw new Error("Unrecognized element status:" + elementStatus);
		}
	};


	createListItemRightIconMenu = () => {
		const iconButtonElement = (
		  <IconButton
		    touch={true}
		    tooltip="more"
		    tooltipPosition="bottom-left"
		  >
		    <MoreVertIcon color={grey400} />
		  </IconButton>
		);

		const rightIconMenu = (
		  <IconMenu iconButtonElement={iconButtonElement}>
		    <MenuItem leftIcon={this.getOrderStatusIcon("accepted")}>Mark as Accepted</MenuItem>
		    <MenuItem leftIcon={this.getOrderStatusIcon("ready")}>Mark as Ready</MenuItem>
		    <MenuItem leftIcon={this.getOrderStatusIcon("shipped")}>Mark as Shipped</MenuItem>
		    <Divider/>
		    <MenuItem leftIcon={<EditorModeEdit className="list-item-left-icon edit"/>}>Edit</MenuItem>
		    <MenuItem leftIcon={<ContentClear className="list-item-left-icon clear"/>}>Delete</MenuItem>
		  </IconMenu>
		);

		return rightIconMenu;
	}

	createListItems = () => {
		const items = this.props.data.map((element)=> {
			const elementId = element.id;

			const openEditModeFunction = ()=>{
				var newListItemMode = {}
				for(var key in this.state.listItemMode){
					if (key == elementId) {

				  		newListItemMode[key] = (this.state.listItemMode[key] === "opened") ? "normal" : "opened";
				  	} else {
				  		newListItemMode[key] = this.state.listItemMode[key];
				  	}
				  		 					
				}

			this.setState({listItemMode:newListItemMode});
			}

			const rightIconMenu = this.createListItemRightIconMenu();
			const elementTitle = this.createElementOpenedTitle(element.dueDate, element.time);
			if (this.state.listItemMode[element.id] === "opened") {
				return <ListItem 
								key={element.id} 
								className="order-item-opened" 
								primaryText={elementTitle} 
								secondaryText={this.createElementInfo(element)}
								onTouchTap={openEditModeFunction}
								rightIconButton={rightIconMenu}
								leftIcon={this.getOrderStatusIcon(element.status)}>
						</ListItem>;
			} else {
				return	<ListItem 
								key={element.id} 
								className="order-item-normal" 
								primaryText={elementTitle} 
								secondaryText={element.clientOrder}
								rightIconButton={rightIconMenu}
								onTouchTap={openEditModeFunction}
								leftIcon={this.getOrderStatusIcon(element.status)}>
						</ListItem>;
			}
		});

		return items;
	};

	createOrderListToolbar = (orderListToolbar) => {
		const normalButtonStyle = {
			color:"rgba(150, 150, 150, 1)"
		};

		const toggleButtonStyle = {
			color:this.props.muiTheme.palette.primary1Color
		};

		return <div className="order-list-toolbar">
					<div className="button-bar">
						<ToggleButton 
							className="accepted-order-button"
							isToggled={true} 
							normal={{
								label:"Accepted",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}/>
						<ToggleButton 
							className="ready-orders-button"  
							isToggled={true}
							normal={{
								label:"Ready",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}
							/>
						<ToggleButton 
							className="delivered-orders-button" 
							isToggled={true}
							normal={{
								label:"Delivered",
								style:normalButtonStyle
							}}
							toggle= {{
								style:toggleButtonStyle
							}}/>
					</div>
					<div className = "dateToolbar">
						<DatePicker className="from-date-picker" hintText="From Date" />
						<DatePicker className="to-date-picker" hintText="To Date" />
					</div>
				</div>
	}

	render() {
		const listItems = this.createListItems(this.props.data);
		const orderListToolbar = this.createOrderListToolbar();
		return (
			<div id={this.props.id}
				 className="order-list-container"
				>
					{orderListToolbar}
					<List className="order-list">
					<Subheader>Orders</Subheader>
					<ReactCSSTransitionGroup 
						transitionName="list-item-mode-transition"
						className="list-item-mode-transition-group"
						transitionEnterTimeout={500}
      					transitionLeaveTimeout={500}>
						{listItems}
					</ReactCSSTransitionGroup>
					</List>
							
		    </div>
		);
	}
}

export default muiThemeable()(OrderList);