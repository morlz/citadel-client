export default class BaseVuexObject {
	constructor (options) {
		for (var prop in options)
			if (options.hasOwnProperty(prop))
				this[prop] = options[prop]
	}
}

export class State extends BaseVuexObject {
	constructor (...args) {
		super (...args)
	}
}

export class Actions extends BaseVuexObject {
	constructor (...args) {
		super (...args)
	}
}

export class Mutations extends BaseVuexObject {
	constructor (...args) {
		super (...args)

		this.cacheSet = (state, payload) => state.cached = { ...state.cached, ...payload }
		this.loadingSet = (state, payload) => state.loading = { ...state.loading, ...payload }
	}
}

export class Getters extends BaseVuexObject {
	constructor (...args) {
		super (...args)
	}

	test (state) {
		return state
	}
}

export class Modules extends BaseVuexObject {
	constructor (...args) {
		super (...args)
	}
}
