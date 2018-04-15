import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { New } from '@/api'

const state = new State ({
	cached: {
		one: {},
		list: []
	},
	loading: {
		one: false,
		list: false
	}
})

const actions = new Actions ({
	async getFull ({ commit, dispatch }, id) {
		commit('loadingSet', { one: true })
		let one = await New.getFull(id)
		commit('loadingSet', { one: false })
		if (!one) return
		commit('cacheSet', { one })
		commit('menu/titleSet', { title: one.title, subtitle: 'Новость' }, { root: true })
	},
	async getByCenter ({ commit, dispatch }, center_id) {
		commit('loadingSet', { list: true })
		let list = await New.getByCenter(center_id)
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
	},
	async updateCategory () {},
	async deleteCategory () {}
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
