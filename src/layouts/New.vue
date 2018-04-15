<template>
	<q-page padding>
		<router-view/>
	</q-page>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'
import {} from 'quasar'
import { QPageSticky } from 'quasar'

export default {
	components: {
		QPageSticky
	},
	props: {
		id: Number
	},
	methods: {
		...mapActions('new', [
			'getFull'
		])
	},
	created () {
		this.getFull(this.$route.params.id)
	}
}
</script>

<style lang="stylus">
</style>
