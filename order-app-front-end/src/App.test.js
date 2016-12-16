import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OrderListFilter from './model/OrderListFilter';

it('renders without crashing', () => {
  	const filter = new OrderListFilter("accepted", "10/15/2016", "11/21/2015");
  	const otherFilter = {...filter};
  	console.log(filter._toDate);
  	console.log(JSON.stringify(otherFilter));

  	const testDate = new Date();

  	console.log(testDate.getHours());

  	const div = document.createElement('div');
 	ReactDOM.render(<App />, div);
});
