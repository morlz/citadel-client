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
		let one = await Page.getFull(id)
		commit('loadingSet', { one: false })
		if (!one) return
		commit('cacheSet', { one })
		commit('menu/titleSet', { title: one.title }, { root: true })
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
