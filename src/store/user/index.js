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
		let one = await Center.getOne(id)
		commit('loadingSet', { one: false })
		commit('cacheSet', { one })
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
	transactions: (state, getters, rootState) => rootState.user.transaction.cached.list.map(trn => trn.user_id == state.cached.one.id),
	records: (state, getters, rootState) => rootState.user.record.cached.list.map(rec => rec.user_id == state.cached.one.id)
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
