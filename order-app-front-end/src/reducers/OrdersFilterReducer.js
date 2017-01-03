import {UPDATE_ORDERS_FILTER} from './../actions/OrdersFilterCrud';

const ordersFilter = (state={}, action) => {
	switch (action.type) {
		case UPDATE_ORDERS_FILTER: {
			return onOrderListFilterChanged(action.filter);
		}
	default:
		return state;
	}
};

const onOrderListFilterChanged = (ordersToShowFilter) => {
    return {...ordersToShowFilter}
};

export default ordersFilter;