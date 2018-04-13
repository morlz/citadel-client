import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import {  } from '@/api'

const state = new State ({
	cached: {
		one: {},
		list: []
	},
	loading: {
		one: false,
		list: false
	}
})

const actions = new Actions ({
	async getFull () {},
	async getByCenter () {},
	async getByCategory () {},
	async updateCource () {},
	async deleteCource () {}
})

const mutations = new Mutations ({

})

const getters = new Getters ({
	prepodIds: (state, getters) => getters.lessons.reduce((ids, lesson) => !ids.includes(lesson.prepod_id) ? [...ids, lesson.prepod_id] : ids, []),
	lessons: (state, getters, rootState) => rootState.center.lesson.cached.list.map(lesson => lesson.cource_id == state.one.id),
	prepods: (state, getters, rootState) => rootState.user.cached.list.map(user => getters.prepodIds.includes(user.prepod_id)),
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
