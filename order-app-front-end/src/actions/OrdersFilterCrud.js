export const UPDATE_ORDERS_FILTER = 'UPDATE_ORDERS_FILTER';

export function updateFilter(filter) {
	return (dispatch) => {
		dispatch(updateFilterLocally(filter));
		dispatch(updateFilterOnTheServer(filter));
	}
};

const updateFilterLocally = (filter) => {
	return {
		type:UPDATE_ORDERS_FILTER,
		filter
	}
}

const updateFilterOnTheServer = (filter) => {
	return (dispatch)=> {
		//Update filter on the server
	}
}