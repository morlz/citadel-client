import core from './core'
import BaseFactory from './BaseFactory'

class CategoryFactory extends BaseFactory {
	static async getAll () {
		return await core.get('categories').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('category', { id }) )
	}
}

export default class Category extends CategoryFactory {
	constructor (source) {
		super()

		for (var prop in source)
			if (source.hasOwnProperty(prop))
				this[prop] = source[prop]
	}
}
