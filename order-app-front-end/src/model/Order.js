export class OrderStatus {
	static get ACCEPTED() {
		return "accepted";	
	} 

	static get READY() {
		return "ready";
	}
	
	static get SHIPPED() {
		return "shipped";
	}

	static get LIST_OF_ALL_STATUSES() {
		return [OrderStatus.ACCEPTED, OrderStatus.READY, OrderStatus.SHIPPED]
	}
}

export default class Order {
	constructor(id, clientName, clientAddress, clientPhone, clientOrder, dueDate, voucherNumber, time, status) {
		this.id = id;
		this.clientName = clientName;
		this.clientAddress = clientAddress;
		this.clientPhone = clientPhone;
		this.clientOrder = clientOrder;
		this.dueDate = dueDate;
		this.voucherNumber = voucherNumber;
		this.time = time;
		this.status = status;
	}
}