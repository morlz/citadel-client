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
	created () {
		this.init()
	},
}
</script>

<style lang="stylus">
</style>
