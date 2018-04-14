import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Category } from '@/api'

const state = new State ({
	cached: {
		one: {},
		menu: []
	},
	loading: {
		one: false,
		menu: false
	}
})

const actions = new Actions ({
	async getFull ({ commit }, id) {
		commit('loadingSet', { one: true })
		let one = await Category.getFull(id)
		commit('loadingSet', { one: false })
		commit('cacheSet', { one })
	},
	async getMenuCategories ({ commit }) {
		commit('loadingSet', { menu: true })
		let categories = await Category.getAll()
		commit('loadingSet', { menu: false })
		commit('cacheSet', { menu: categories })
	},
	async updateCategory () {},
	async deleteCategory () {}
})

const mutations = new Mutations ({

})

const getters = new Getters ({
	menu: state => state.cached.menu.map(cat => ({
		name: cat.title,
		path: `/category/${cat.id}`,
		[cat.logo ? 'avatar' : 'icon']: cat.logo ? cat.logo : 'fa-image',
	})),
	cources: (state, getters, rootState) => rootState.cource.cached.list.map(cource => cource.category_id == state.cached.one.id)
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
