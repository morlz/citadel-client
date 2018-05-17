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
import nw from './new'
import notify from './notify'

Vue.use(Vuex)

const modules = new Modules ({
	menu,
	center,
	auth,
	cource,
	category,
	user,
	page,
	'new': nw,
	notify
})

console.log(modules);

const store = new Vuex.Store({
	modules,
	strict: true
})

export default store
