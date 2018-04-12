import Vue from 'vue'
import Vuex from 'vuex'

import menu from './menu'
import center from './center'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		menu,
		center
	},
	strict: true
})

export default store
