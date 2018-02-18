import api from '@/api/index'
import view from '@/store/app/view'
import 'console.image'

const state = {
	memes: {
		count: 7,
		path: '/resources/memes/'
	}
}

const actions = {
	app_init ({ commit, dispatch }) {
		dispatch('app_randomMeme')
	},
	app_randomMeme ({ commit, dispatch, state }) {
		let randomMemeIndex = (Math.round(Math.random() * state.memes.count)),
			memUrl = window.location.origin + state.memes.path + randomMemeIndex + '.gif'

		/*'http://edu.it-citadel.ru'*/

		setTimeout(a => console.image(memUrl), 5e3)
	}
}

const mutations = {

}

const getters = {

}

const modules = {
	view
}

export default {
    state,
    actions,
    mutations,
    getters,
	modules
}
