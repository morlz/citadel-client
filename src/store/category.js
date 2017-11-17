import api from '@/api/index'

const state = {
    cached: [],
	current: {}
}

const actions = {
    getCategories({ commit, dispatch }) {
		api.invoke({
			method: 'get',
			data: {
				type: 'category'
			}
		}).then(({ data }) => {
            commit('receive_categories', data)
        }).catch(err => dispatch('handleCode', err))
    },
	getCategory(state, id){
		let finded = state.getters.categories.find(cat => cat.id == id)
		if (finded) {
			state.commit("receive_currentCategory", finded)
			return
		}

		api.invoke({
			method: 'get',
			data: {
				type: 'category',
				id
			}
		}).then(({ data }) => {
			state.commit('addCatToChache', [data])
			state.commit('receive_currentCategory', data)
		}).catch(err => state.dispatch('handleCode', err))
	},
	updateCategory({ dispatch, commit }, data){
		data.type = 'category'
		api.invoke({
			method: 'put',
			data
		}).then(({data}) => {
			commit('removeCategory', data.id)
			commit('addCatToChache', [data])
			commit('receive_currentCategory', data)
			commit('toggleEditMutation', false)
		}).catch(err => dispatch('handleCode', err))
	}
}

const mutations = {
	addCatToChache(state, data){
		let toCache = data.filter(dis => !state.cached.find(cached => cached.id == dis.id))
		state.cached = [...state.cached, ...toCache]
	},
    receive_categories(state, data) {
        state.cached = data
    },
	receive_currentCategory(state, data) {
		state.current = data
	},
	removeCategory(state, id) {
		state.cached = state.cached.filter(el => el.id != id)
	}
}

const getters = {
    categories (state) {
        return state.cached
    },
	currentCategory (state) {
		return state.current
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
