import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

export default {
	computed: {
		...mapGetters('auth', {
			auth_logined: 'logined',
			auth_role: 'role',
			auth_user: 'user'
		}),
		...mapGetters('auth', [
			'isAdmin',
			'isUser',
			'isWorker'
		])
	},
	methods: {
		adminPage () {
			if (!this.auth_logined || this.auth_role > 1)
			 	return this.$router.push('/')

			return true
		},
		workerPage () {
			if (!this.auth_logined || this.auth_role > 2)
			 	return this.$router.push('/')

			return true
		},
		userPage () {
			if (!this.auth_logined || this.auth_role > 3)
			 	return this.$router.push('/')

			return true
		}
	}
}
