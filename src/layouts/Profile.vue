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
export default {
	methods: {
		...mapActions('user', [
			'getFull'
		])
	},
	created () {
		this.getFull(this.$route.params.id)
	},
}
</script>

<style lang="stylus">
</style>
