import core from './core'
import BaseFactory from './BaseFactory'
import moment from 'moment'

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

	get dateText () {
		return moment(this.updated_at).format('YYYY-MM-DD') + ' ' + moment(this.updated_at).format('dddd')
	}

	get timeText () {
 		return moment(this.updated_at).format('hh:mm:ss')
	}

	get textFromNow () {
		return moment(this.updated_at).fromNow()
	}
}
