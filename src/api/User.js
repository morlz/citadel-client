import core from './core'
import BaseFactory from './BaseFactory'

class Role {
	constructor (role_id) {
		this.id = role_id
	}

	get name () {
		switch (this.id) {
			case 1:
				return 'Администратор'
				break;
			case 2:
				return 'Преподаватель'
				break;
			case 3:
				return 'Пользователь'
				break;
			case 4:
				return 'Подтверждение email'
				break;
		}
	}
}

class UserFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		let res = await core.get('user')
		return res.map(el => new this(el)) || []
	}

	static async getFull (id) {
		return new this( await core.get('user', { id }) )
	}

	static async signIn (data) {
		let res = await core.get('signin', data) || {}
		return res.id ? new this(res) : res
	}

	static async getData () {
		let res = await core.get('getUserData')
		return res.id ? new this(res) : res
	}

	static async getByCenter (id) {
		let res = await core.get('getCenterPrepods', { id })
		if (!Array.isArray(res)) return []
		return res.map(el => new this({ ...el, center_id: +id })) || []
	}
}

export default class User extends UserFactory {
	constructor (...args) {
		super(...args)
	}

	get avatar () {
		//if (process.env.NODE_ENV == 'development')
			//return 'https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg'

		if (!this.photo)
			return 'https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg'

		if (this.photo.substr(0, 5) === 'src="')
			return this.photo.substr(5, this.photo.length - 6)

		return this.photo
	}

	get account_balance () {
		return 0
	}

	get role () {
		if (this.id_role)
			return new Role(this.id_role)

		return { name: 'loading...' }
	}

	get shortDescription () {
		if (!this.description) return

		let defaultLn = 140
		if (this.name.length > 25)
			defaultLn = 60

		return this.description.replace(/<(?:.|\n)*?>/gm, '').substr(0, defaultLn) + '...'
	}
}
