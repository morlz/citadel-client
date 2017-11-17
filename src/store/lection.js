import api from '@/api/index'

const state = {
    cached: [],
	regFormContent: {},
	regFormShow: false,
	addLectionData: {},
	lessonFilter: {
		date: ""
	},
	currentLesson: {},
	currentUsersRegistred: [],
	currentUsersRegistredShow: false,
	allRegistredLessons: []
}

const actions = {
	addLection({ commit, dispatch }, data){
		data.type = 'lesson'
		if (data.id) delete data.id
		api.invoke({
			method: 'post',
			data
		}).then(({ data }) => {
			commit('addLectionToCache', [data])
		}).catch(err => dispatch('handleCode', err))
	},
	getLectionsByCource({ commit, dispatch }, id){
		api.invoke({
			method: 'get',
			data: {
				type: 'lessonsByCource',
				id
			}
		}).then(({ data }) => {
			commit('addLectionToCache', data)
		}).catch(err => dispatch('handleCode', err))
	},
	regFormHide({ commit }) {
		commit('regFormHide')
	},
	showRegForm ({ commit }, data) {
		commit('regFormChangeContent', data)
		commit('regFormShow')
	},
	hideRegForm ({ commit }) {
		commit('regFormHide')
	},
	addLectionDataSet({ commit }, data){
		commit("addLectionDataUpdate", data)
	},
	updateLection({ commit, dispatch }, data){
		data.type = 'lesson'
		api.invoke({
			method: 'put',
			data
		}).then(({ data }) => {
			commit('removeLection', data.id)
			commit('addLectionToCache', [data])
		}).catch(err => dispatch('handleCode', err))
	},
	lectionReg({ commit, dispatch }, data){
		data.type = 'register'
		api.invoke({
			method: 'post',
			data
		}).then(() => {
			dispatch('alert', {
				content: "Вы зарегестрированы"
			})
			dispatch('lessonRegStateForUser', data.lesson.id)
		}).catch(err => {
			dispatch('handleCode', err)
			dispatch('reOnReqSend')
		})
	},
	updateLessonFilter({ commit }, data){
		commit('updateLessonFilter', data)
	},
	afterRemoveLesson({ commit }, id){
		commit('removeLection', id)
	},
	getRegistredUsersForCurrentLesson({ commit, dispatch, lessons }, id){
		commit('setCurrentLesson', id)
		api.invoke({
			method: 'get',
			data: {
				type: "lessonUsersRegistred",
				id
			}
		}).then(({data}) => {
			commit('updateCurrentUsersContent', data)
		}).catch(err => dispatch('handleCode', err))
	},
	updateRegistredUserForCurrentLesson({ commit, dispatch }, data){
		data.type = 'updateReg'
		api.invoke({
			method: 'put',
			data
		}).then(({ data }) => {
			commit('removeUserFromCache', data.id)
			commit('addRegistredUserToCache', [data])
		}).catch(err => dispatch('handleCode', err))
	},
	removeRecordUser ({ commit, dispatch }, { id, id_lesson }) {
		api.invoke({
			method: 'delete',
			data: {
				type: 'recordUser',
				id
			}
		}).then(({ status }) => {
			if (status == 204) {
				commit('removeUserFromCache', id)
				commit('removeUserRegFromCache', id)
				if (id_lesson != -1) dispatch('lessonRegStateForUser', id_lesson)
			}
		}).catch(err => dispatch('handleCode', err))
	},
	lessonRegStateForUser({ commit, dispatch }, id){
		api.invoke({
			method: 'get',
			data: {
				type: "lessonRegStateForUser",
				id
			}
		}).then(({ data }) => {
			commit('updateLessonUserRegState', {
				id,
				data
			})
		}).catch(err => dispatch('handleCode', err))
	},
	getAllLessons({ commit, dispatch }){
		api.invoke({
			method: 'get',
			data: {
				type: "lesson"
			}
		}).then(({ data }) => {
			commit('addLectionToCache', data)
		}).catch(err => dispatch('handleCode', err))
	}
}

const mutations = {
	updateLessonUserRegState(state, { id, data }){
		let lesson = state.cached.find(el => el.id == id)
		if (!lesson) return
		lesson.registred = data
	},
	removeUserFromCache(state, id){
		state.currentUsersRegistred = state.currentUsersRegistred.filter(el => el.id != id)
	},
	addRegistredUserToCache(state, data){
		let toCache = data.filter(dta => !state.currentUsersRegistred.find(cached => cached.id == dta.id))
		state.currentUsersRegistred = [...state.currentUsersRegistred, ...toCache]
	},
	updateLessonFilter(state, data){
		state.lessonFilter = Object.assign(state.lessonFilter, data)
	},
	removeLection(state, id){
		state.cached = state.cached.filter(el => el.id != id)
	},
	addLectionToCache(state, data){
		let toCache = data.filter(dta => !state.cached.find(cached => cached.id == dta.id))
		state.cached = [...state.cached, ...toCache]
	},
	regFormShow(state){
		state.regFormShow = true
	},
	regFormHide(state){
		state.regFormShow = false
	},
	regFormChangeContent(state, data){
		state.regFormContent = data
	},
	addLectionDataUpdate(state, data){
		state.addLectionData = data
	},
	showCurrentUsers(state){
		state.currentUsersRegistredShow = true
	},
	hideCurrentUsers(state){
		state.currentUsersRegistredShow = false
	},
	updateCurrentUsersContent(state, data){
		state.currentUsersRegistred = data
	},
	setCurrentLesson(state, id){
		state.currentLesson = state.cached.find(el => el.id == id)
	}
}

const getters = {
	lessons ({ cached }) {
		return cached
	},
	regFormContent ({ regFormContent }) {
		return regFormContent
	},
	regFormShow ({ regFormShow }) {
		return regFormShow
	},
	addLectionData({ addLectionData }){
		return addLectionData
	},
	lessonFilter({ lessonFilter }){
		return lessonFilter
	},
	currentUsersRegistredContent ({ currentUsersRegistred }) {
		return currentUsersRegistred
	},
	currentUsersRegistredShow({ currentUsersRegistredShow }){
		return currentUsersRegistredShow
	},
	currentLesson({ currentLesson }){
		return currentLesson
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
