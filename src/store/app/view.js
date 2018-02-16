import api from '@/api/index'

const state = {

}

const actions = {
}

const mutations = {

}

const getters = {
	app_view_mobile: state => document.body.offsetWidth < 993,
	app_view_desktop: state => document.body.offsetWidth > 993
}


export default {
    state,
    actions,
    mutations,
    getters
}
