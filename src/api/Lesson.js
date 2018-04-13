import core from './core'
import BaseFactory from './BaseFactory'

class LessonFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getAll () {
		return await core.get('lessons').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('lesson', { id }) )
	}
}

export default class Lesson extends LessonFactory {
	constructor (...args) {
		super(...args)
	}
}
