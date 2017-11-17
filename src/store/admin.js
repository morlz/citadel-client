import api from '@/api/index'

const addRoutes = {
	cat: "category",
	centers: "center"
}

const updateDispatchers = {
	category: "getCategories",
	centers: "getCenters",
	cource: "getAllDisciplines",
	center: "getCenters",
	lesson: "afterRemoveLesson"
}

const state = {
    edit: false,
	QO: {},
	FP: {
		enableTime: true,
		time_24hr: true,
		minDate: new Date()
	},
	editButtonShow: false
}

const actions = {
	toggleEdit({ commit }){
		commit("toggleEditMutation")
	},
	add({ dispatch }, payload) {
		payload.type = addRoutes[payload.type] || payload.type
		api.invoke({
			method: 'post',
			data: payload
		}).then(({ data, status, error = null }) => {
			if (status == 201) dispatch( updateDispatchers[payload.type] )
		}).catch(err => dispatch('handleCode', err))
	},
	remove({ dispatch }, payload){
		let { type, id, redirect = true } = payload
		api.invoke({
			method: "delete",
			data: {
				type,
				id
			}
		}).then((data) => {
			dispatch( updateDispatchers[type], id )
			if (redirect) router.push({ path: '/' })
		}).catch(err => dispatch('handleCode', err))
	}
}

const mutations = {
	toggleEditMutation(state, data){
		if (data === undefined) {
			state.edit = !state.edit
			return
		}
		state.edit = data
	}
}

const getters = {
	edit(state) {
		return state.edit
	},
	quillOptions(){
		return state.QO || {}
	},
	FP ({ FP }) {
		return FP
	},
	FPRange ({ FP }) {
		let data = Object.assign({ mode: "range" }, FP)
		if (data.minDate) delete data.minDate
		return data
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
