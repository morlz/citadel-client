import api from '@/api/index'

const state = {
    cached: [],
	current: {},
	currentCenterPrepods: [],
	cachedNews: []
}

const actions = {
    getCenters({ commit }) {
		api.invoke({
			method: 'get',
			data: {
				type: 'center'
			}
		}).then(({ data }) => {
            commit('receive_centers', data)
        })
    },
	getCenter (state, id) {
		let finded = state.getters.centers.find(center => center.id == id)
		if (finded) {
			state.commit("receive_currentCenter", finded)
			return
		}

		api.invoke({
			method: 'get',
			data: {
				type: 'center',
				id
			}
		}).then(({ data }) => {
			state.commit('addCenterToCache', data)
			state.commit('receive_currentCenter', data)
		}).catch(err => state.dispatch('handleCode', err))
	},
	updateCenter({dispatch, commit}, data){
		data.type = 'center'
		api.invoke({
			method: 'put',
			data
		}).then(({data}) => {
			commit('removeCenter', data.id)
			commit('addCenterToCache', [data])
			commit('receive_currentCenter', data)
			commit('toggleEditMutation', false)
		}).catch(err => dispatch('handleCode', err))
	},
	getCenterNews ({dispatch, commit}, id) {
		api.invoke({
			method: 'get',
			data: {
				type: 'newsByCenter',
				id
			}
		}).then(({ data }) => {
			commit('addNewsToCache', data)
		}).catch(err => dispatch('handleCode', err))
	}
}

const mutations = {
	removeCenter(state, id){
		state.cached = state.cached.filter(el => el.id != id)
	},
	addCenterToCache(state, data) {
        if (!state.cached.find(center => center.id == data.id)) state.cached.push(data)
    },
	addNewsToCache(state, data){
		state.cachedNews = [...data, ...state.cachedNews.filter(el => !data.find(newCached => newCached.id == el.id))]
	},
    receive_centers(state, data) {
        state.cached = data
    },
	receive_currentCenter(state, data) {
        state.current = data
    },
	setCurrentCenterPrepods(state, data){
		state.currentCenterPrepods = data
	}
}

const getters = {
    centers(state) {
        return state.cached || []
    },
	currentCenter(state){
		return state.current
	},
	currentCenterPrepods({ currentCenterPrepods }){
		return currentCenterPrepods
	},
	allCenterNews({ cachedNews }){
		return cachedNews
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
