export default class OptimisticModel {
	constructor(model, isSyncedWithTheServer) {
		this.model = model;
		this.isSyncedWithTheServer = isSyncedWithTheServer;
	}
}