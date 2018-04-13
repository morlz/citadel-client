import core from './core'
import BaseFactory from './BaseFactory'

class CenterFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		let data = await core.get('center')
		return data.map(el => new this(el)) || []
	}

	static async getOne (id) {
		return new this( await core.get('center', { id }) )
	}
}

export default class Center extends CenterFactory {
	constructor (...args) {
		super(...args)
	}
}
