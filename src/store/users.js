import api from '@/api/index'

const sortTransactionsByDate = (a, b) => {
	if (new Date(a.date).valueOf() > new Date(b.date).valueOf()) return -1
	if (new Date(a.date).valueOf() < new Date(b.date).valueOf()) return 1
	return 0
}

const state = {
    cached: [],
	current: {},
	currentUserRegs: [],
	currentUserTransactions: []
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
	},
	getUserTransactions ({ commit, dispatch }, id) {
		api.invoke({
			method: "get",
			data: {
				type: "userCash",
				id
			}
		})
		.then(({ data }) => {
			commit("setCachedTransactions", data)
		})
		.catch(err => dispatch('handleCode', err))
	},
	addUserTransaction ({ commit, dispatch }, data) {
		data.type = 'cash'
		api.invoke({
			method: 'post',
			data
		})
		.then(res => commit("addTransactionToCache", res.data))
		.catch(err => dispatch('handleCode', err))
	},
	updateUserTransaction ({ commit, dispatch }, data) {
		data.type = 'cash'
		api.invoke({
			method: 'put',
			data
		})
		.then(res => commit("updateTransactionInCache", res.data))
		.catch(err => dispatch('handleCode', err))
	},
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
		state.current = Object.assign({}, data, {transactions: []})
	},
	reciveCurrentUserRegs(state, data){
		state.currentUserRegs = data
	},
	removeUserRegFromCache(state, id){
		state.currentUserRegs = state.currentUserRegs.filter(el => el.id != id)
	},
	setCachedTransactions: (state, payload) => state.currentUserTransactions = payload,
	addTransactionToCache: (state, payload) => state.currentUserTransactions = [payload, ...state.currentUserTransactions],
	updateTransactionInCache: (state, payload) => state.currentUserTransactions = [payload, ...state.currentUserTransactions.filter(el => el.id != payload.id)],
}

const getters = {
	admins: state => state.cached.filter(user => user.id_role == 1),
    prepods: state => state.cached.filter(user => user.id_role == 2),
	users: state => state.cached.filter(user => user.id_role == 3),
	allUsers: state => state.cached,
	currentUser: state => state.current,
	currentUserRegs: state => state.currentUserRegs || [],
	cachedTransactions: state => state.currentUserTransactions.sort(sortTransactionsByDate)
}

export default {
    state,
    actions,
    mutations,
    getters
}
