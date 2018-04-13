import core from './core'
import BaseFactory from './BaseFactory'

class UserFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		return await core.get('users').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('user', { id }) )
	}
}

export default class User extends UserFactory {
	constructor (...args) {
		super(...args)
	}
}
