<template>
<div class="UserPreviewList">
	<user-preview v-for="user, index in content" :key="user.id" :content="user"/>

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

import UserPreview from '@/components/UserPreview'

export default {
	components: {
		UserPreview
	},
	props: {
		content: Array
	},
	computed: {
		...mapState('user', {
			loading: state => state.loading.list
		})
	}
}
</script>

<style lang="stylus">
.UserPreviewList
	display grid
	grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
	justify-content center
	align-items start
	grid-gap 10px
	position relative
	min-height 100px
</style>
