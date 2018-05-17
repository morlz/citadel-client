import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Lesson } from '@/api'

const state = new State ({
	cached: {
		list: []
	},
	loading: {
		list: false
	}
})

const actions = new Actions ({
	async getByCource ({ commit, dispatch }, cource_id) {
		commit('loadingSet', { list: true })
		let list = await Lesson.getByCource(cource_id)
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
	},
	async getAll ({ commit, dispatch }) {
		commit('loadingSet', { list: true })
		let list = await Lesson.getAll()
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
		commit('menu/titleSet', { title: 'Список занятий' }, { root: true })
	},
	async updateLesson () {},
	async deleteLesson () {}
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
