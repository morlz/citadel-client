import core from './core'
import BaseFactory from './BaseFactory'

class PageFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getFull (id) {
		return new this( await core.get('page', { id }) )
	}
}

export default class Page extends PageFactory {
	constructor (...args) {
		super(...args)
	}

	get gallery () {
		if (!this.images) return []
		return JSON.parse(this.images)
	}

	set gallery (val) {
		if (!val) val = []
		this.images = JSON.stringify(val)
	}
}
