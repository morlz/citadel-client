<template>
	<q-page>
		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="primary" icon="edit" />
		</q-page-sticky>
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
	watch: {

	},
	computed: {

	},
	methods: {

	},
	async mounted () {

	},
	created () {

	},
	destroyed () {

	}
}
</script>

<style lang="stylus">
</style>
