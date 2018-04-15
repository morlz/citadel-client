import core from './core'
import BaseFactory from './BaseFactory'

class TransactionFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getByUser (id) {
		let res = await core.get('userCash', { id })
		if (!Array.isArray(res)) return []
		return res.map(el => new this(el)) || []
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
