import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Page } from '@/api'

const state = new State ({
	cached: {
		one: {}
	},
	loading: {
		one: false
	}
})

const actions = new Actions ({
	async getFull ({ commit, dispatch }, id) {
		commit('loadingSet', { one: true })
		let page = await Page.getFull(id)
		commit('loadingSet', { one: false })
		commit('cacheSet', { one: page })
	},
	async updatePage () {}
})

const mutations = new Mutations ({

})

const getters = new Getters ({

})

const modules = new Modules ({

})

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
	modules
}
