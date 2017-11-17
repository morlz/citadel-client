import api from '@/api/index'

const state = {
    alertContent: {},
	alertShow: false
}

const actions = {
	alertHide({ commit }) {
		commit('alertHide')
	},
	alert ({ commit }, data) {
		commit('alertChangeContent', data)
		commit('alertShow')
	}
}

const mutations = {
	alertShow(state){
		state.alertShow = true
	},
	alertHide(state){
		state.alertShow = false
	},
	alertChangeContent(state, data){
		state.alertContent = data
	}
}

const getters = {
    alertContent ({ alertContent }) {
        return alertContent
    },
	alertShow ({ alertShow }) {
		return alertShow
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
