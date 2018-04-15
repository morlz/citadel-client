import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Record } from '@/api'

const state = new State ({
	cached: {
		list: []
	},
	loading: {
		list: false
	}
})

const actions = new Actions ({
	async getByUser ({ commit, dispatch }, user_id) {
		commit('loadingSet', { list: true })
		let list = await Record.getByUser(user_id)
		commit('loadingSet', { list: false })
		console.log(list)
		commit('cachedAppendNoDuplicate', { list })
	},
	async getByLesson () {},
	async createRecord () {},
	async updateRecord () {},
	async deleteRecord () {}
})

const mutations = new Mutations ({

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
