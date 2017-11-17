import Vue from 'vue'
import VueRes from 'vue-resource'
import VueRouter from 'vue-router'
import vueImages from 'vue-images'
import { VueMasonryPlugin } from 'vue-masonry'
import VueCarousel from 'vue-carousel'
import VueCookie from 'vue-cookie'
import { sync } from 'vuex-router-sync'

import store from '@/store/index'

import { default as quill } from 'vue-quill'
import { default as Quill } from 'vue-quill-editor'

import { default as main_header } from '@/components/header.vue'
import { default as main_footer } from '@/components/footer.vue'
import { default as main_styles } from '@/components/mainStyles.vue'
import { default as alert } from '@/components/alert.vue'

import { default as discipline } from '@/pages/discipline.vue'
import { default as centers } from '@/pages/centers.vue'
import { default as user } from '@/pages/user_full.vue'
import { default as users } from '@/pages/userList.vue'
import { default as page404 } from '@/pages/404.vue'
import { default as pages } from '@/pages/textPage.vue'
import { default as cat } from '@/pages/categories.vue'
import { default as allLessons } from '@/pages/allLessons.vue'

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
	{ path: '/centers/:id', component: centers },
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
