import core from './core'
import BaseFactory from './BaseFactory'

class CenterFactory extends BaseFactory {
	static async getAll () {
		return await core.get('centers').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('center', { id }) )
	}
}

export default class Center extends CenterFactory {
	constructor (source) {
		super()

		for (var prop in source)
			if (source.hasOwnProperty(prop))
				this[prop] = source[prop]
	}
}
