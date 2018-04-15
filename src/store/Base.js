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

		this.cachedAppendDuplicate = (state, payload) => Object.keys(payload).map(prop => state.cached[prop] = [...state.cached[prop], ...payload[prop]])
		this.cachedAppendNoDuplicate = (state, payload) => Object.keys(payload).map(prop => {
			let payloadIds = payload[prop].map(el => el.id),
				filtredState = state.cached[prop].filter(el => !payloadIds.includes(el.id))
			state.cached[prop] = [...filtredState, ...payload[prop]]
		})
		this.cacheSet = (state, payload) => state.cached = { ...state.cached, ...payload }
		this.loadingSet = (state, payload) => state.loading = { ...state.loading, ...payload }
	}
}

export class Getters extends BaseVuexObject {
	constructor (...args) {
		super (...args)

		this.content = state => state.cache ? state.cache.one : null
	}
}

export class Modules extends BaseVuexObject {
	constructor (...args) {
		super (...args)
	}
}
