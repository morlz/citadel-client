import core from './core'
import BaseFactory from './BaseFactory'
import moment from 'moment'
import Lesson from './Lesson'


class RecordFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getByUser (id) {
		let res = await core.get('getRegsByUser', { id })
		if (!Array.isArray(res)) return []
		return res.map(el => new this(el)) || []
	}

	static async register (data) {
		let res = await core.post('register', data)
		if (!Array.isArray(res))
			return []

		return res.map(el => new this(el)) || []
	}
}

export default class Record extends RecordFactory {
	constructor (...args) {
		super(...args)
	}

	get status () {
		return this.type.title
	}

	get statusIcon () {
		switch (this.type.id) {
			case 1:
				return 'fa-clock'
				break;
			case 2:
				return 'credit_card'
				break;
			case 5:
				return 'fa-check'
				break;
			default:
				return 'fa-clock'

		}
	}

	get lesson () {
		return this._lesson
	}

	set lesson (val) {
		this._lesson = val instanceof Lesson ? val : new Lesson(val)
	}

	get canPayed () {
		return this.type.id === 1
	}
}
