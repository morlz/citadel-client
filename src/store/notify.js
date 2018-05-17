import { State, Actions, Mutations, Getters, Modules } from '@/store/Base'
import { New } from '@/api'
import { Notify } from 'quasar'

const state = new State ({

})

const actions = new Actions ({
	init ({ commit, dispatch }) {},
	alert ({ commit, dispatch }, message) {
		Notify.create({
			message,
			type: 'info',
			color: 'secondary',
			textColor: 'black',
			position: 'bottom',
		})
	},
	notify ({ commit, dispatch }, message) {
		Notify.create({
			message,
			type: 'positive',
			color: 'positive',
			textColor: 'black',
			position: 'bottom-left',
		})
	},
	error ({ commit, dispatch }, message) {
		Notify.create({
			message,
			type: 'negative',
			color: 'negative',
			//textColor: 'white',
			position: 'top-right',
		})
	},
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
