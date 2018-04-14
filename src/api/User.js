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
		return await core.get('users').map(el => new this(el))
	}

	static async getOne (id) {
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
}

export default class User extends UserFactory {
	constructor (...args) {
		super(...args)
	}

	get avatar () {
		console.log(this);
		if (process.env.NODE_ENV == 'development')
			return 'https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg'

		if (!this.photo)
			return 'https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg'

		if (this.photo.substr(0, 4) === 'src="')
			return this.photo.substr(4, this.photo.length - 1)

		return this.photo
	}

	get balance () {
		return 0
	}

	get role () {
		return new Role(this.id_role)
	}
}
