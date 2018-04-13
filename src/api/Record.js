import core from './core'
import BaseFactory from './BaseFactory'

class RecordFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		return await core.get('records').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('record', { id }) )
	}
}

export default class Record extends RecordFactory {
	constructor (...args) {
		super(...args)
	}
}
