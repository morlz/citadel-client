<template>
<div class="CourcePreviewList">
	<cource-preview v-for="cource, index in content" :key="cource.id" :content="cource"/>

	<div v-if="!content.length">
		Список пуст
	</div>

	<q-inner-loading :visible="loading">
		<q-spinner size="50px" color="primary"/>
	</q-inner-loading>
</div>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import CourcePreview from '@/components/CourcePreview'

export default {
	components: {
		CourcePreview
	},
	props: {
		content: Array
	},
	computed: {
		...mapState('cource', {
			loading: state => state.loading.list
		})
	}
}
</script>

<style lang="stylus">
.CourcePreviewList
	display grid
	grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
	justify-content center
	align-items start
	grid-gap 10px
	position relative
	min-height 100px
</style>
