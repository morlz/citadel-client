import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Record } from '@/api'

const state = new State ({
	cached: {
		list: []
	},
	loading: {
		list: false
	},
	form: {
		open: false,
		bufferLesson: {}
	}
})

const actions = new Actions ({
	async getByUser ({ commit, dispatch }, user_id) {
		commit('loadingSet', { list: true })
		let list = await Record.getByUser(user_id)
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
	},
	async getByLesson () {},
	async register ({ commit, dispatch, state }, comment) {
		let res = await Record.register({
			comment,
			lesson: state.form.bufferLesson
		})
		if (!res) return

		dispatch('notify/notify', 'Вы успешно зарегистрировались', { root: true })
	},
})

const mutations = new Mutations ({
	formSet: (state, payload) => state.form = { ...state.form, ...payload }
})

const getters = new Getters ({

})

const modules = new Modules ({

})

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
	modules
}