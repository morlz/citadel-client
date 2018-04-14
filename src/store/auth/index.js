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
		commit('userSet', user)
	},
	async signin ({ commit, dispatch }, payload) {
		commit('loadingSet', { user: true })
		let user = await User.signIn(payload)
		commit('loadingSet', { user: false })
		if (!user.id) return
		commit('userSet', user)
		localStorage.setItem('api_token', user.api_token)
		localStorage.setItem('uid', user.id)
	},
	async signup ({ commit, dispatch }, payload) {
		console.log('signup', payload)
	},
	logout () {},
})

const mutations = new Mutations ({
	userSet: (state, payload) => state.user = payload
})

const getters = new Getters ({
	isAdmin: (state, getters) => getters.role === 1,
	isWorler: (state, getters) => getters.role === 2,
	isUser: (state, getters) => getters.role === 3,
	role: state => state.user.role_id,
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
