<template>
<div class="NewPreviewList">
	<new-preview v-for="nw, index in content" :key="nw.id" :content="nw"/>

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

import NewPreview from '@/components/NewPreview'

export default {
	components: {
		NewPreview
	},
	props: {
		content: Array
	},
	computed: {
		...mapState('new', {
			loading: state => state.loading.list
		})
	}
}
</script>

<style lang="stylus">
.NewPreviewList
	display grid
	grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
	justify-content center
	align-items start
	grid-gap 10px
	position relative
	min-height 100px
</style>
