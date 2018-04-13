import Vue from 'vue'
import Vuex from 'vuex'

import { Modules } from './Base'

import menu from './menu'
import center from './center'
import auth from './auth'
import cource from './cource'
import category from './category'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: new Modules ({
		menu,
		center,
		auth,
		cource,
		category,
		user
	}),
	strict: true
})

export default store
