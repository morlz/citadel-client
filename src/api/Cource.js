import core from './core'
import BaseFactory from './BaseFactory'

class CoruceFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		return await core.get('coruces').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('coruce', { id }) )
	}
}

export default class Coruce extends CoruceFactory {
	constructor (...args) {
		super(...args)
	}
}
