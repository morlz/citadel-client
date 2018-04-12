import core from './core'
import BaseFactory from './BaseFactory'

class CoruceFactory extends BaseFactory {
	static async getAll () {
		return await core.get('coruces').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('coruce', { id }) )
	}
}

export default class Coruce extends CoruceFactory {
	constructor (source) {
		super()

		for (var prop in source)
			if (source.hasOwnProperty(prop))
				this[prop] = source[prop]
	}
}
