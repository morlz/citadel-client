<template>
	<q-list no-border link inset-delimiter>
		<app-menu-item :content="menu" initial/>
	</q-list>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import {} from 'quasar'
import AppMenuItem from '@/components/AppMenuItem'

export default {
	components: {
		AppMenuItem
	},
	props: {

	},
	computed: {
		...mapState('menu', [
			'menu'
		])
	},
	methods: {
		...mapActions ('menu', [
			'init',
		]),
	},
	async mounted () {

	},
	created () {
		this.init()
	},
	destroyed () {

	}
}
</script>

<style lang="stylus">
</style>
