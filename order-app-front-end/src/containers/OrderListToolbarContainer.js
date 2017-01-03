import {updateFilter} from './../actions';
import { connect } from 'react-redux';
import OrderListToolbar from './../views/OrderListToolbar';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOrderListFilterChanged:(filter) => {
      dispatch(updateFilter(filter));
    }
  }
}

const OrderListToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListToolbar)

export default OrderListToolbarContainer