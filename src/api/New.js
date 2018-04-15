import core from './core'
import BaseFactory from './BaseFactory'
import moment from 'moment'

class NewFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getByCenter (id) {
		let res = await core.get('newsByCenter', { id })
		if (!Array.isArray(res)) return []
		return res.map(el => new this(el)) || []
	}

	static async getFull (id) {
		return new this( await core.get('news', { id }) )
	}
}

export default class New extends NewFactory {
	constructor (...args) {
		super(...args)
	}

	get gallery () {
		if (this.images)
			return JSON.parse(this.images)

		return []
	}

	set gallery (val) {
		this.images = JSON.stringify(val)
	}

	get shortDescription () {
		if (!this.content) return

		let defaultLn = 140

		if (this.title.length > 25)
			defaultLn = 90

		return this.content.replace(/<(?:.|\n)*?>/gm, '').substr(0, defaultLn) + '...'
	}

	get avatar () {
		if (!this.gallery.length)
			return `http://cdn7.bigcommerce.com/s-viqdwewl26/stencil/8f903ed0-76e7-0135-12e4-525400970412/icons/icon-no-image.svg`

		return this.gallery[Math.floor(Math.random() * this.gallery.length)]
	}

	get date () {
		return moment(this.created_at).fromNow()
	}
}
