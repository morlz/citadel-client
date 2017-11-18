import api from '@/api/index'

const state = {
    user: {},
	re: "6LcNSzUUAAAAAJp9Z2YmYjBtoFkMUZOcmA15r2gi",
	savedReToken: ""
}

const actions = {
    signin({ commit, dispatch }, data) {
		data.type = 'signin'
        api.invoke({
            method: 'get',
            data
        }).then(({data, status}) => {
			commit('receive_user', data)
        }).catch(err => {
			dispatch('alert', {
				content: "Неправильное имя пользователя или пароль",
				buttons: [
					{
						name: 'ok'
					}
				]
			})
        })
    },
    signup({ commit, dispatch }, data) {
		data.type = 'signup'
        api.invoke({
            method: 'get',
            data
        }).then(({ data }) => {
            dispatch('alert', {
				content: `перейди по <a href="${window.location.origin}/${data.confirm_url}">ссылке</a>`
			})
        }).catch(err => dispatch('handleCode', err))
    },
    logout({commit}) {
        commit('unsetAuthData')
    },
    getUserData({commit}) {
        api.invoke({
            method: "get",
            data: {
                type: "getUserData"
            }
        }).then(({data}) => {
            commit('receive_user', data)
        }).catch(err => {
			commit('unsetAuthData')
		})
    },
    checkCookies({dispatch}) {
        let cookie = api.cookie.getAuth()

        if (!cookie || !cookie.uid || !cookie.api_token)
            return

        dispatch("getUserData")
    },
	reOnVerify({ commit }, data){
		commit("setToken", data)
	},
	reOnExpired({ commit }, data){
		commit("setToken", "")
	},
	reOnReqSend({ commit }){
		commit("setToken", "")
	}
}

const mutations = {
    receive_user(state, data) {
        state.user = data
        let {id: uid, api_token} = data
        api.cookie.setAuth({uid, api_token})
    },
    unsetAuthData(state) {
        state.user = {}
        api.cookie.setAuth({uid: "", api_token: ""})
    },
    receive_accesData(state, data) {
        state.user.id = data.id || ""
        state.user.api_token = data.api_token || ""
    },
	setToken(state, data) {
		state.savedReToken = data
	}
}

const getters = {
    user(state) {
        return state.user
    },
    accesData({user}) {
        let {id, api_token} = user
        return {id, api_token}
    },
    logined({user}) {
        return !!user && !!user.id && !!user.api_token && !!user.name
    },
    isAdmin({user}) {
        return user && user.id_role == 1
    },
    isWorker({user}) {
        return user && user.id_role == 2
    },
	isUser({user}) {
		return user && user.id_role == 3
	},
	reCaptchaKey({ re }) {
		return re
	},
	reToken({ savedReToken }) {
		return savedReToken
	}
}

export default {
    state,
    actions,
    mutations,
    getters
}
