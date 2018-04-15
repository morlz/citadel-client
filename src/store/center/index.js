import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Center, sortFnFactory } from '@/api'
import moment from 'moment'

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
		if (!one) return
		commit('cacheSet', { one })
		commit('menu/titleSet', { title: one.title, subtitle: 'Центр' }, { root: true })

		dispatch('cource/getByCenter', id, { root: true }),
		dispatch('user/getByCenter', id, { root: true }),
		dispatch('new/getByCenter', id, { root: true })
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
	})),
	cources: (state, getters, rootState) => rootState.cource.cached.list.filter(cource => cource.id_center == state.cached.one.id),
	workers: (state, getters, rootState) => rootState.user.cached.list.filter(user => user.center_id == state.cached.one.id),
	news: (state, getters, rootState) => rootState.new.cached.list
		.filter(nw => nw.center_id == state.cached.one.id || nw.center_id === null)
		.sort( sortFnFactory(item => moment(item.created_at), true) ),
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
