import core from './core'
import BaseFactory from './BaseFactory'

class CategoryFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		let data = await core.get('category')
		return data.map(el => new this(el)) || []
	}

	static async getOne (id) {
		return new this( await core.get('category', { id }) )
	}
}

export default class Category extends CategoryFactory {
	constructor (...args) {
		super(...args)
	}
}
