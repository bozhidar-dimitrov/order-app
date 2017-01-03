import {updateOrder, deleteOrder} from './../actions';
import HomeScreen from './../views/HomeScreen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUpdateOrder: (order) => {
      dispatch(updateOrder(order));
      ownProps.onUpdateOrder(order);
    },
    onDeleteOrder: (order) => {
      dispatch(deleteOrder(order));
      ownProps.onDeleteOrder(order);
    }
  }
}

const HomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)

export default HomeScreenContainer