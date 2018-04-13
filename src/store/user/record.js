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
	async getByUser () {},
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
