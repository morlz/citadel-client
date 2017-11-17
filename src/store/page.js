import api from '@/api/index'

const state = {
    cached: [],
	current: {}
}

const actions = {
    getPages({ commit }, ids) {
		api.invoke({
			method: 'get',
			data: {
				type: 'page',
				ids
			}
		}).then(({ data }) => {
            commit('receive_pages', data)
        })
    },
	setCurrent(state, id){

		let finded = state.getters.pages.find(page => page.id == id)
		if (finded) {
			state.commit("receive_currentPage", finded)
			return
		}

		api.invoke({
			method: 'get',
			data: {
				type: 'page',
				id
			}
		}).then(({ data }) => {
			state.commit('addPageToChache', [data])
			state.commit("receive_currentPage", data)
		})
	},
	handleCode({dispatch}, req) {
		let { response } = req

		if (!response) console.error( req )

		if (response.data.error) {
			dispatch('alert', {
				content: response.data.error.message
			})
			return
		}

		if (response.status == 401) {
			dispatch('alert', {
				content: "Вы не авторизованы"
			})
			return
		}

		if (response.status == 403) {
			dispatch('alert', {
				content: "Отказано в доступе"
			})
			return
		}

		if (response.status == 404) {
			router.push({
				path: '/404'
			})
			return
		}

		if (response.status == 500) {
			dispatch('alert', {
				content: "Внутреняя ошибка сервера"
			})
			return
		}

		dispatch('alert', {
			content: "Необработаная ошибка, подробнее в консоле"
		})
	},
	updatePage({commit, dispatch}, data) {
		data.type = 'page'
		api.invoke({
			method: 'put',
			data
		}).then(({data}) => {
			commit('removePageFromCache', data.id)
			commit('addPageToChache', [data])
			commit('receive_currentPage', data)
			commit('toggleEditMutation', false)
		}).catch(err => dispatch('handleCode', err))
	}
}

const mutations = {
	removePageFromCache(state, data) {

	},
	addPageToChache(state, data){
		let toCache = data.filter(dta => !state.cached.find(cached => cached.id == dta.id))
		state.cached = [...state.cached, ...toCache]
	},
    receive_pages(state, data) {
        state.cached = data
    },
	receive_currentPage(state, data){
		state.current = data
	},
	open404page(state){
		router.push({
			path: '/404'
		})
	}
}

const getters = {
	pages(state) {
		return state.cached || {}
	},
	currentPage(state){
		return state.current || {}
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
