import Vue from 'vue'
import VueRouter from 'vue-router'

import discipline 		from '@/pages/discipline.vue'
import centers 			from '@/pages/centers.vue'
import user 			from '@/pages/user_full.vue'
import users 			from '@/pages/userList.vue'
import page404 			from '@/pages/404.vue'
import pages 			from '@/pages/textPage.vue'
import cat 				from '@/pages/categories.vue'
import allLessons 		from '@/pages/allLessons.vue'


Vue.use(VueRouter)

const noScrollNames = ['news']
const noScrollFrom = ['news']

const scrollBehavior = (to, from, savedPosition) => {
	if (noScrollNames.indexOf(to.name) + 1 || noScrollFrom.indexOf(from.name) + 1)
		return {}

	//window.curtains.sctollToTop()
	return {}
}

const routes = [
	{ path: '/discipline/:id', component: discipline },
	{ path: '/cource/:id', component: discipline },
	//{ path: '/centers/:id', component: centers },
	{ path: '/centers/:id/:newId?', component: centers, name: "news", props: route => ({ openNew: route.params.newId }) },
	{ path: '/cat/:id', component: cat },
	{ path: '/user/:id', component: user },
	{ path: '/users', component: users },
	{ path: '/allLessons', component: allLessons },
	{ path: '/work', component: pages, props: { id: 1 } },
	{ path: '/', component: pages, props: { id: 2 } },
	{ path: '/payment', component: pages, props: { id: 3 } },
	{ path: '*', component: page404, name: 'page404' }
]

const router = new VueRouter({ routes, scrollBehavior })

global.router = router

export default router
