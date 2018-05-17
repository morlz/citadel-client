import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { User } from '@/api'
import record from './record'
import transaction from './transaction'

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
	async getFull ({ commit, dispatch }, id) {
		commit('loadingSet', { one: true })
		let one = await User.getFull(id)
		commit('loadingSet', { one: false })
		if (!one) return
		commit('cacheSet', { one })
		commit('menu/titleSet', { title: one.name, subtitle: 'Профиль пользователя' }, { root: true })

		dispatch('transaction/getByUser', id)
		dispatch('record/getByUser', id)
	},
	async getByCenter ({ commit, dispatch }, center_id) {
		commit('loadingSet', { list: true })
		let list = await User.getByCenter(center_id)
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
	},
	async getByIds ({ commit, dispatch }, ids) {
		commit('loadingSet', { list: true })
		let list = await Promise.all(ids.map(id => User.getFull(id)))
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
	},
	async getAll ({ commit, dispatch }) {
		commit('loadingSet', { list: true })
		let list = await User.getAll()
		commit('loadingSet', { list: false })
		commit('cachedAppendNoDuplicate', { list })
		commit('menu/titleSet', { title: 'Список пользователей' }, { root: true })
	},
	async getPreview () {},
	async getAllPreview () {},
	async creteTransacion () {},
	async createRecord () {},
	async updateTransaction () {},
	async updateRecord () {},
	async deleteTransaction () {},
	async deleteRecord () {}
})

const mutations = new Mutations ({

})

const getters = new Getters ({
	balance: (state, getters) => getters.transactions.reduce((prev, el) => prev + el, 0),
	transactions: (state, getters, rootState) => rootState.user.transaction.cached.list.filter(trn => trn.user_id == state.cached.one.id),
	records: (state, getters, rootState) => rootState.user.record.cached.list.filter(rec => rec.id_user == state.cached.one.id)
})

const modules = new Modules ({
	record,
	transaction
})

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
	modules
}
