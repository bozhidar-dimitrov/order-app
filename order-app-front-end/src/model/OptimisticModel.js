export default class OptimisticModel {
	constructor(model, isSyncedWithTheServer = false) {
		this.model = model;
		this.isSyncedWithTheServer = isSyncedWithTheServer;
	}
}