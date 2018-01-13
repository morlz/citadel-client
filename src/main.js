import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import Quill from 'vue-quill-editor'
import { VueMasonryPlugin } from 'vue-masonry'
import VueCarousel from 'vue-carousel'
import VueCookie from 'vue-cookie'

Vue.use( Quill )
Vue.use( VueMasonryPlugin )
Vue.use( VueCarousel )
Vue.use( VueCookie )

import App from '@/App'
import router from '@/router'
import store from '@/store/index'

Vue.config.productionTip = false

const mounted = () => {
	console.log("big loaded");
	window.curtains.loaded.big = true
	window.curtains.open()
}

const unsync = sync(store, router)

new Vue({
	el: '#app',
	router,
	store,
	mounted,
	render: h => h(App)
})
