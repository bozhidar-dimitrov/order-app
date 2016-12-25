import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import muiThemeable from 'material-ui/styles/muiThemeable';
import "./HomeScreen-Default.css"

import OrderInput from "./OrderInput";
import OrderList from "./OrderList";
import AdvancedComponent from "./../components/AdvancedComponent";

import Order from "./../model/Order";
import OptimisticModel from "./../model/OptimisticModel";
import OrderListFilter from "./../model/OrderListFilter";
import AdditionalPropTypes from "./../utils/AdditionalPropTypes";

class HomeScreen extends AdvancedComponent {
	static propTypes = {
		id:React.PropTypes.string.isRequired,
		orders:React.PropTypes.array.isRequired,
		onOrderMarkedAsAccepted:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onOrderMarkedMarkAsReady:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onOrderMarkedAsShipped:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onUpdateOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onDeleteOrder:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel)),
		onOrderListFilterChanged:AdditionalPropTypes.typedFunc(React.PropTypes.instanceOf(OptimisticModel))
	};

	constructor(props) {
		super(props);
		this.state = {
			showControlPanel:false,
			orderToEdit:null,
			replacingOrder:null,
			isOrderInputEmpty:true,
			isReplaceDataDialogOpen:false,
			isCloseOrderInputDialogOpen: false
		}
	}

	onLogin = (username, password) => {
		if (this.props.onLogin) {
			this.props.onLogin(username, password);
		}
	};

	openControlPanel = () => {
		this.setState({showControlPanel:true});
	};

	safeCloseControlPanel =() => {
		if (this.state.isOrderInputEmpty) {
			this.closeControlPanel();
		} else {
			this.setState({isCloseOrderInputDialogOpen:true});
		}
	};

	closeControlPanel = () => {
		this.setState({showControlPanel:false, orderToEdit:null, replacingOrder:null, isOrderInputEmpty:true});
	};

	getFloatingActionButton = () => {
			if (!this.state.showControlPanel) {
				return <FloatingActionButton 
					className="add-new-order-button"
					onTouchTap={this.openControlPanel}>
					<ContentAdd/>
				</FloatingActionButton>
			} else {
				return <FloatingActionButton 
					className="add-new-order-button-control-panel"
					onTouchTap={this.safeCloseControlPanel}>
					<HardwareKeyboardArrowLeft/>
				</FloatingActionButton>
			}
	}

	onEmptyChanged = (newValue) => {
		this.setState({isOrderInputEmpty:newValue});
	};
	
	onEditOrder = (order) => {
		console.log("On Edit Order: " + JSON.stringify(order));
		if (this.state.isOrderInputEmpty) {
			this.setState({orderToEdit:order, showControlPanel:true});
		} else {
			this.setState({isReplaceDataDialogOpen:true, replacingOrder:order, showControlPanel:true});
		}
	};

	handleReplaceClose = () => {
		this.setState({isReplaceDataDialogOpen:false});
	};

	handleReplaceOrder = () => {
		console.log("Replacing Order");
		this.setState((prevState, props)=>{
			console.log("Replacing Order:"+JSON.stringify(prevState.replacingOrder));
			console.log("Order To Edit:"+JSON.stringify(prevState.orderToEdit));
			return {orderToEdit:prevState.replacingOrder, replacingOrder:null, isReplaceDataDialogOpen:false};
		});
	};

	createReplaceDataDialogActions = () => {
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.handleReplaceClose}
	      />,
	      <FlatButton
	        label="Replace"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleReplaceOrder}
	      />,
	    ];

	    return actions;
	};

	handleOrderFormDialogCancel = () => {
		this.setState({isCloseOrderInputDialogOpen:false});
	};

	handleOrderFormDialogClose = () => {
		this.closeControlPanel();
		this.setState({isCloseOrderInputDialogOpen:false});
	};

	createCloseOrderFormDialogActions = () => {
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onTouchTap={this.handleOrderFormDialogCancel}
	      />,
	      <FlatButton
	        label="Close"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleOrderFormDialogClose}
	      />,
	    ];

	    return actions;
	};

	onUpdateOrder = (order) => {
		this.closeControlPanel();
		this.props.onUpdateOrder(order);
	};

	render() {

		const controlPanelClassName = this.state.showControlPanel ? "control-panel-slided" : "control-panel";
		const floatingActionButton = this.getFloatingActionButton();
		const replaceDataDialogActions = this.createReplaceDataDialogActions();
		const closeOrderFormDialogAction = this.createCloseOrderFormDialogActions();

		const orderListCallbacks = {
			onOrderMarkedAsAccepted:this.props.onOrderMarkedAsAccepted,
			onOrderMarkedMarkAsReady:this.props.onOrderMarkedMarkAsReady,
			onOrderMarkedAsShipped:this.props.onOrderMarkedAsShipped,
			onUpdateOrder:this.props.onUpdateOrder,
			onDeleteOrder:this.props.onDeleteOrder,
			onOrderListFilterChanged:this.props.onOrderListFilterChanged
		}

		return (	
			<Paper id = {this.props.id} className = "home-screen-container">
				<Dialog
		          title="Replace Order Data"
		          actions={replaceDataDialogActions}
		          modal={false}
		          open={this.state.isReplaceDataDialogOpen}
		          onRequestClose={this.handleReplaceClose}
		        >
		          The order form contains data. Do you want to replace it?.
		        </Dialog>
		        <Dialog
		          title="Close Order Form"
		          actions={closeOrderFormDialogAction}
		          modal={false}
		          open={this.state.isCloseOrderInputDialogOpen}
		          onRequestClose={this.handleReplaceClose}
		        >
		          The order form contains data. Do you really want to close it?.
		        </Dialog>

				<ReactCSSTransitionGroup 
					transitionName="home-screen-transition"
					className="home-screen-transition-group"
					transitionEnterTimeout={1000}
		          	transitionLeaveTimeout={1000}>
		         	{floatingActionButton}
				<Paper key="controlPanel" className = {controlPanelClassName} zDepth={2}>
					{this.state.showControlPanel && 
						<OrderInput id="app-order-input" 
						orderToEdit={this.state.orderToEdit} 
						onEmptyChanged={this.onEmptyChanged}
						onPlaceOrder={this.onUpdateOrder}/> }
				</Paper> 
				<Paper key="orders" className="orders" zDepth={2}>
					<OrderList id="app-order-list" {...orderListCallbacks} data={this.props.orders} onEditOrder={this.onEditOrder}/>
				</Paper>

				</ReactCSSTransitionGroup>
			</Paper>
		);
	}
}

export default muiThemeable()(HomeScreen);