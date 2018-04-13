import core from './core'
import BaseFactory from './BaseFactory'

class TransactionFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		return await core.get('transactions').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('transaction', { id }) )
	}
}

export default class Transaction extends TransactionFactory {
	constructor (...args) {
		super(...args)
	}
}
