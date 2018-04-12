import { Center } from '@/api'

const state = {
	cached: {
		one: {}
	},
	loading: {
		one: false
	}
}

const actions = {
	async getOne ({ commit, dispatch }, id) {
		commit('loadingSet', { one: true })
		let one = await Center.getOne(id)
		commit('loadingSet', { one: false })
		commit('cacheSet', { one })
	}
}

const mutations = {
	cacheSet: (state, payload) => state.cached = { ...state.cached, ...payload },
	loadingSet: (state, payload) => state.loading = { ...state.loading, ...payload },
 }

const getters = {

}

const modules = {

}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
	modules
}
