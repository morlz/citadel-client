import Vue from 'vue'
import VueRes from 'vue-resource'
import VueRouter from 'vue-router'
import vueImages from 'vue-images'
import { VueMasonryPlugin } from 'vue-masonry'
import VueCarousel from 'vue-carousel'
import VueCookie from 'vue-cookie'
import { sync } from 'vuex-router-sync'

import store from '@/store/index'

import quill from 'vue-quill'
import Quill from 'vue-quill-editor'

import main_header from '@/components/header.vue'
import main_footer from '@/components/footer.vue'
import main_styles from '@/components/mainStyles.vue'
import alert from '@/components/alert.vue'
import discipline from '@/pages/discipline.vue'
import centers from '@/pages/centers.vue'
import user from '@/pages/user_full.vue'
import users from '@/pages/userList.vue'
import page404 from '@/pages/404.vue'
import pages from '@/pages/textPage.vue'
import cat from '@/pages/categories.vue'
import allLessons from '@/pages/allLessons.vue'

Vue.use( quill )
Vue.use( VueRes )
Vue.use( VueRouter )
Vue.use( Quill )
Vue.use( VueMasonryPlugin )
Vue.use( VueCarousel )
Vue.use( VueCookie )

const routes = [
	{ path: '/discipline/:id', component: discipline },
	{ path: '/cource/:id', component: discipline },
	//{ path: '/centers/:id', component: centers },
	{ path: '/centers/:id/:newId?', component: centers, name: "news", props: route => ({ openNew: route.params.newId }) },
	{ path: '/cat/:id', component: cat },
	{ path: '/user/:id', component: user },
	{ path: '/users', component: users },
	{ path: '/allLessons', component: allLessons },
	{ path: '/recs', component: pages, props: { id: 1 } },
	{ path: '/', component: pages, props: { id: 2 } },
	{ path: '/work', component: pages, props: { id: 3 } },
	{ path: '*', component: page404, name: 'page404' }
]

const router = new VueRouter({
	routes,
	scrollBehavior(to, from, savedPosition) {
		let noScrollNames = [
			'news'
		]
		let noScrollFrom = [
			'news'
		]
		if (noScrollNames.indexOf(to.name) + 1 || noScrollFrom.indexOf(from.name) + 1) return {}
		window.curtains.sctollToTop()
		return {}
	}
})

global.router = router

const unsync = sync(store, router)

function mounted () {
	window.curtains.loaded.big = true
	window.curtains.open()
}

let main = new Vue({
	components: {
		main_styles,
		main_header,
		main_footer,
		alert
	},
	router,
	store,
	mounted
}).$mount("#mainWrapper")
