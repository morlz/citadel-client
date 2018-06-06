import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { User } from '@/api'
import recaptcha from './recaptcha'



const state = new State ({
	user: {},
	loading: {
		user: false
	}
})

const actions = new Actions ({
	async init ({ commit, dispatch }) {
		if (!localStorage.getItem('api_token') || !localStorage.getItem('uid')) return

		commit('loadingSet', { user: true })
		let user = await User.getData()
		commit('loadingSet', { user: false })

		if (!user.id) {
			localStorage.removeItem('api_token')
			localStorage.removeItem('uid')
			return
		}

		commit('userSet', user)
		dispatch('menu/refresh', null, { root: true })
	},
	async signin ({ commit, dispatch }, payload) {
		commit('loadingSet', { user: true })
		let user = await User.signIn(payload)
		commit('loadingSet', { user: false })
		if (!user.id) return
		commit('userSet', user)
		localStorage.setItem('api_token', user.api_token)
		localStorage.setItem('uid', user.id)
		dispatch('menu/refresh', null, { root: true })
	},
	async signup ({ commit, dispatch }, payload) {
		await User.signup(payload)
	},
	async logout ({ commit, dispatch }) {
		commit('userSet', {})
		localStorage.removeItem('api_token')
		localStorage.removeItem('uid')
		dispatch('menu/refresh', null, { root: true })
	},
})

const mutations = new Mutations ({
	userSet: (state, payload) => state.user = payload
})

const getters = new Getters ({
	isAdmin: (state, getters) => getters.role === 1,
	isWorler: (state, getters) => getters.role === 2,
	isUser: (state, getters) => getters.role === 3,
	role: state => state.user.id_role,
	logined: state => !!state.user.id,
	user: state => state.user,
})

const modules = new Modules ({
	recaptcha
})

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
	modules
}
