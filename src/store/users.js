import api from '@/api/index'

const state = {
    cached: [],
	current: {},
	currentUserRegs: []
}

const actions = {
	getAllUsers({ commit }) {
		api.invoke({
			method: 'get',
			data: {
				type: 'user'
			}
		}).then(({ data }) => {
			commit('addUsersToCache', data)
		})
	},
    getUsers({ commit }, ids) {
		api.invoke({
			method: 'get',
			data: {
				type: 'user',
				ids
			}
		}).then(({ data }) => {
            commit('addUsersToCache', data)
        })
    },
	getUser({ commit }, id) {
		api.invoke({
			method: 'get',
			data: {
				type: 'user',
				id
			}
		}).then(({ data }) => {
			commit('addUsersToCache', [data])
		})
	},
	getPrepods({ commit }) {
		api.invoke({
			method: 'get',
			data: {
				type: 'prepods'
			}
		}).then(({ data }) => {
			commit('addUsersToCache', data)
		})
	},
	getAdmins({ commit }) {
		api.invoke({
			method: 'get',
			data: {
				type: 'admins'
			}
		}).then(({ data }) => {
			commit('addUsersToCache', data)
		})
	},
	setCurrentUser (state, id) {
		let finded = state.getters.allUsers.find(user => user.id == id)
		if (finded) {
			state.commit("setCurrent", finded)
			return
		}

		api.invoke({
			method: 'get',
			data: {
				type: 'user',
				id
			}
		}).then(({ data }) => {
			state.commit('addUsersToCache', [data])
			state.commit('setCurrent', data)
		})
	},
	updateUser({ commit, dispatch }, data){
		data.type = 'user'
		api.invoke({
			method: 'put',
			data
		}).then(({data}) => {
			commit('removeUser', data.id)
			commit('addUsersToCache', [data])
			commit('setCurrent', data)
		}).catch(err => dispatch('handleCode', err))
	},
	getUserRegs({ commit, dispatch }, id) {
		api.invoke({
			method: 'get',
			data: {
				type: "getRegsByUser",
				id
			}
		}).then(({data}) => {
			commit('reciveCurrentUserRegs', data)
		}).catch(err => dispatch('handleCode', err))
	},
	getCenterPrepods({ commit, dispatch }, id){
		api.invoke({
			method: 'get',
			data: {
				type: 'getCenterPrepods',
				id
			}
		}).then(({ data }) => {
			commit('addUsersToCache', data)
			commit('setCurrentCenterPrepods', data)
		}).catch(err => dispatch('handleCode', err))
	}
}

const mutations = {
	removeUser(state, id){
		state.cached = state.cached.filter(el => el.id != id)
	},
    receive_users(state, data) {
        state.cached = data
    },
	addUsersToCache(state, data) {
		let toCache = data.filter(user => !state.cached.find(cachedUser => cachedUser.id == user.id))
		state.cached = [...state.cached, ...toCache]
	},
	setCurrent(state, data){
		state.current = data
	},
	reciveCurrentUserRegs(state, data){
		state.currentUserRegs = data
	},
	removeUserRegFromCache(state, id){
		state.currentUserRegs = state.currentUserRegs.filter(el => el.id != id)
	}
}

const getters = {
	admins(state){
		return state.cached.filter(user => user.id_role == 1)
	},
    prepods(state) {
        return state.cached.filter(user => user.id_role == 2)
    },
	users(state){
		return state.cached.filter(user => user.id_role == 3)
	},
	allUsers (state) {
		return state.cached
	},
	currentUser (state) {
		return state.current
	},
	currentUserRegs (state) {
		return state.currentUserRegs || []
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
