import {OrderStatus} from './Order';

export default class OrderListFilter {
	constructor(statusesToShow, fromDate, toDate) {
		this.statusesToShow = statusesToShow;
		this.fromDate = fromDate;
		this.toDate = toDate;
	}
}