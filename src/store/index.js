import Vue from 'vue'
import Vuex from 'vuex'

import { Modules } from './Base'

import menu from './menu'
import center from './center'
import auth from './auth'
import cource from './cource'
import category from './category'
import user from './user'
import page from './page'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: new Modules ({
		menu,
		center,
		auth,
		cource,
		category,
		user,
		page
	}),
	strict: true
})

export default store
