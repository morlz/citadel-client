import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import {  } from '@/api'



const state = new State ({
	user: {}
})

const actions = new Actions ({
	init () {},
	singin () {},
	signup () {},
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
	logined: state => !!state.user.id
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
