export default class BaseFactory {
	constructor (source) {
		for (var prop in source)
			if (source.hasOwnProperty(prop))
				this[prop] = source[prop]
	}
}
