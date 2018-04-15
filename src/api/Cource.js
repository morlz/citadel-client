import core from './core'
import BaseFactory from './BaseFactory'

class CoruceFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}


	static async getFull (id) {
		return new this( await core.get('cource', { id }) )
	}

	static async getByCenter (id) {
		let res = await core.get('getCenterCources', { id })
		if (!Array.isArray(res)) return []
		return res.map(el => new this(el)) || []
	}

	static async getByCategory (id_category) {
		let res = await core.get('cource', { id_category })
		if (!Array.isArray(res)) return []
		return res.map(el => new this(el)) || []
	}
}

export default class Cource extends CoruceFactory {
	constructor (...args) {
		super(...args)
	}

	get avatar () {
		if (!this.logo)
			return `http://cdn7.bigcommerce.com/s-viqdwewl26/stencil/8f903ed0-76e7-0135-12e4-525400970412/icons/icon-no-image.svg`

		if (this.logo.substr(0, 5) === 'src="')
			return this.logo.substr(5, this.logo.length - 6)

		return this.logo
	}

	get shortDescription () {
		if (!this.description) return

		let defaultLn = 140

		if (this.title.length > 25)
			defaultLn = 90

		return this.description.replace(/<(?:.|\n)*?>/gm, '').substr(0, defaultLn) + '...'
	}

	get gallery () {
		let res = []

		if (this.images)
			res = JSON.parse(this.images)

		if (typeof res === 'string')
			res = JSON.parse(res)

		if (this.logo)
			res.unshift(this.logo)

		return res
	}

	set gallery (val) {
		this.images = JSON.stringify(val)
	}
}
