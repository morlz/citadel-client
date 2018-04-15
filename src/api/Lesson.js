import core from './core'
import BaseFactory from './BaseFactory'
import moment from 'moment'

class LessonFactory extends BaseFactory {
	constructor (...args) {
		super(...args)
	}

	static async getByCource (id) {
		let res = await core.get('lessonsByCource', { id })
		if (!Array.isArray(res)) return []
		return res.map(el => new this(el)) || []
	}
}

export default class Lesson extends LessonFactory {
	constructor (...args) {
		super(...args)
	}

	get hasDate () {
		return !!+moment(this.date)
	}

	get passed () {
		if (!this.hasDate)
			return false
		return moment(this.date).isBefore(moment())
	}

	get textDateTimeFromNow () {
		if (!this.hasDate) return
		return moment(this.date).fromNow()
	}

	get textDate () {
		if (!this.hasDate) return
		return moment(this.date).format('DD-MM-YYYY')
	}

	get textTime () {
		if (!this.hasDate) return
		return moment(this.date).format('hh:mm')
	}

	get textDayOfWeek () {
		if (!this.hasDate) return
		return moment(this.date).format('dddd')
	}

	get textDuration () {
		return moment.duration(this.duration, 'minutes').humanize()
	}
}
