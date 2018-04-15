import core from './core'
import BaseFactory from './BaseFactory'

class CenterFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		let res = await core.get('center')
		if (!Array.isArray(res)) return []
		return res.map(el => new this(el)) || []
	}

	static async getOne (id) {
		return new this( await core.get('center', { id }) )
	}
}

export default class Center extends CenterFactory {
	constructor (...args) {
		super(...args)
	}

	get gallery () {
		let res = []

		if (this.images)
			res = JSON.parse(this.images)

		if (this.logo)
			res.unshift(this.logo)

		return res
	}
}
