import Vuex from 'vuex'
import Vue from 'vue'

import discipline from './discipline'
import users from './users'
import center from './center'
import page from './page'
import admin from './admin'
import categories from './category'
import auth from './auth'
import alert from './alert'
import lesson from './lesson'
import app from '@/store/app/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        discipline,
		users,
		center,
		page,
		admin,
		categories,
		auth,
		alert,
		lesson,
		app
    }
})
