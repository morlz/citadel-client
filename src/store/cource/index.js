import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { Cource, sortFnFactory } from '@/api'
import lesson from './lesson'
import moment from 'moment'

const state = new State ({
	cached: {
		one: {},
		list: []
	},
	loading: {
		one: false,
		list: false
	},
	filters: {
		center: 'all',
		date: 'next',
	}
})

const actions = new Actions ({
	async getFull ({ commit, dispatch, getters }, id) {
		commit('loadingSet', { one: true })
		let one = await Cource.getFull(id)
		commit('loadingSet', { one: false })
		if (!one) return
		commit('cacheSet', { one })
		commit('menu/titleSet', { title: one.title, subtitle: 'Курс' }, { root: true })

		await dispatch('cource/lesson/getByCource', id, { root: true })
		await dispatch('user/getByIds', getters.prepodIds, { root: true })
	},
	async getByCenter ({ commit, dispatch }, center_id) {
		commit('loadingSet', { list: true })
		let list = await Cource.getByCenter(center_id)
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
	},
	async getByCategory ({ commit, dispatch }, category_id) {
		commit('loadingSet', { list: true })
		let list = await Cource.getByCategory(category_id)
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
	},
	async updateCource () {},
	async deleteCource () {}
})

const mutations = new Mutations ({

})

const getters = new Getters ({
	prepodIds: (state, getters) => getters.lessons.reduce((ids, lesson) => !ids.includes(lesson.id_worker) ? [...ids, lesson.id_worker] : ids, []).filter(el => el),
	lessons: (state, getters, rootState) => rootState.cource.lesson.cached.list
		.filter(lesson => lesson.id_cource == state.cached.one.id)
		.sort( sortFnFactory(item => item.date !== null ? moment(item.date).valueOf() : null, true) ),
	lessonsFiltred: (state, getters) => getters.lessons
		.filter(lesson => {
			switch (state.filters.date) {
				case 'all':
					return true
					break;
				case 'with':
					return lesson.hasDate
					break;
				case 'without':
					return !lesson.hasDate
					break;
				case 'next':
					return !lesson.passed && lesson.hasDate
					break;
				case 'prev':
					return lesson.passed && lesson.hasDate
					break;
			}
		})
		.filter(lesson => {
			switch (state.filters.center) {
				case 'all':
					return true
					break;
				case 'exist':
					return lesson.id_center !== null
					break;
				default:
					return lesson.id_center === state.filters.center
			}
		}),
	workers: (state, getters, rootState) => rootState.user.cached.list.filter(user => getters.prepodIds.includes(user.id)),
})

const modules = new Modules ({
	lesson
})

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
	modules
}
