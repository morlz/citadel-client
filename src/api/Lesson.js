import core from './core'
import BaseFactory from './BaseFactory'

class LessonFactory extends BaseFactory {
	static async getAll () {
		return await core.get('lessons').map(el => new this(el))
	}

	static async getOne (id) {
		return new this( await core.get('lesson', { id }) )
	}
}

export default class Lesson extends LessonFactory {
	constructor (source) {
		super()

		for (var prop in source)
			if (source.hasOwnProperty(prop))
				this[prop] = source[prop]
	}
}
