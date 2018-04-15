import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import Menu from '@/api/Menu'

const state = new State ({
	menu: {},
	title: {
		title: '',
		subtitle: ''
	}
})

const actions = new Actions ({
	async init ({ dispatch }) {
		dispatch('refresh')
		let [categories, centers] = await Promise.all([
			dispatch('category/getMenuCategories', null, { root: true }),
			dispatch('center/getMenuCenters', null, { root: true })
		])
		dispatch('refresh')
	},
	refresh ({ commit, rootGetters }) {
		commit('menuSet', new Menu( rootGetters['auth/role'] ))
		if (rootGetters['center/menu'])
			commit('menuSetChilds', { index: 1, data: rootGetters['center/menu'] })

		if (rootGetters['category/menu'])
			commit('menuSetChilds', { index: 2, data: rootGetters['category/menu'] })
	}
})

const mutations = new Mutations ({
	menuSet: (state, payload) => state.menu = payload,
	menuSetChilds: (state, { index, data }) => state.menu.childs[index].setChilds(data),
	titleSet: (state, payload) => (
		state.title = { title: state.title.title, subtitle: '', ...payload },
		document.title = `ООО "ЦИТАДЕЛЬ" | ${payload.title}${payload.subtitle ? ` | ${payload.subtitle}` : ''}`
	)
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
