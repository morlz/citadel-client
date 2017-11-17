import api from '@/api/index'

const state = {
    cached: [],
	current: {}
}

const actions = {
	getDisciplinesByCat({ commit, dispatch }, id_category) {
		api.invoke({
			method: 'get',
			data: {
				type: 'cource',
				id_category
			}
		}).then(({ data }) => {
            commit('addDisToCache', data)
        }).catch(err => dispatch('handleCode', err))
    },
	getAllDisciplines({ commit, dispatch }) {
		api.invoke({
			method: 'get',
			data: {
				type: 'cource'
			}
		}).then(({ data }) => {
			commit('addAllDisToCache', data)
		}).catch(err => dispatch('handleCode', err))
	},
    getDisciplines({ commit, dispatch }, ids) {
		api.invoke({
			method: 'get',
			data: {
				type: 'cource',
				ids
			}
		}).then(({ data }) => {
            commit('addDisToCache', data)
        }).catch(err => dispatch('handleCode', err))
    },
	getDiscipline({ commit, dispatch }, id) {
		api.invoke({
			method: 'get',
			data: {
				type: 'cource',
				id
			}
		}).then(({ data }) => {
            commit('addDisToCache', [data])
			commit('receive_currentDiscipline', data)
        }).catch(err => dispatch('handleCode', err))
	},
	addDiscipline({ commit , dispatch }, category){
		api.invoke({
			method: 'post',
			data: {
				type: 'cource',
				category,
				title: "New Cource"
			}
		}).then(({ data }) => {
			commit('addDisToCache', [data])
			commit('receive_currentDiscipline', data)
		}).catch(err => dispatch('handleCode', err))
	},
	updateCource({ commit, dispatch }, data){
		data.type = 'cource'
		if (data.images) data.images = JSON.stringify(data.images)
		api.invoke({
			method: 'put',
			data
		}).then(({data}) => {
			commit('removeCource', data.id)
			commit('addDisToCache', [data])
			commit('receive_currentDiscipline', data)
			commit('toggleEditMutation', false)
		}).catch(err => dispatch('handleCode', err))
	}
}

const mutations = {
	removeCource(state, id){
		state.cached = state.cached.filter(el => el.id != id)
	},
	addDisToCache(state, data){
		let toCache = data.filter(dis => !state.cached.find(cached => cached.id == dis.id))
		state.cached = [...state.cached, ...toCache]
	},
	receive_currentDiscipline(state, data) {
		state.current = data
	},
	addAllDisToCache(state, data){
		state.cached = data
	}
}

const getters = {
    disciplines(state) {
        return state.cached || []
    },
	cources(state) {
		return state.cached || []
	},
	currentDiscipline(state) {
		return state.current || {}
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
