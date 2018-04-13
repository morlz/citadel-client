import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Center } from '@/api'

import lesson from './lesson'

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
	async getFull ({ commit, dispatch }, id) {
		commit('loadingSet', { one: true })
		let one = await Center.getOne(id)
		commit('loadingSet', { one: false })
		commit('cacheSet', { one })
	},
	async getMenuCenters ({ commit }) {
		commit('loadingSet', { menu: true })
		let centers = await Center.getAll()
		commit('loadingSet', { menu: false })
		commit('cacheSet', { menu: centers })
	},
	async updateCenter () {},
	async deleteCenter () {}
})

const mutations = new Mutations ({

})

const getters = new Getters ({
	menu: state => state.cached.menu.map(center => ({
		name: center.title,
		description: center.address,
		[center.logo ? 'avatar' : 'icon']: center.logo ? center.logo : 'fa-image',
		path: `/center/${center.id}`
	}))
})

const modules = new Modules ({
	lesson
})

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
	modules
}
