<template>
	<div class="Page">
		<h1 class="Page__title">{{ content.title }}</h1>

		<div class="Page__content" v-html="content.content"/>

		<gallery :images="content.gallery"/>

		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="primary" icon="edit" @click="$router.push(`${$route.path}/edit`)" wait-for-ripple/>
		</q-page-sticky>

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

import Gallery from '@/components/Gallery'
import { QPageSticky } from 'quasar'

export default {
	components: {
		QPageSticky,
		Gallery
	},
	computed: {
		...mapState('new', {
			content: state => state.cached.one,
			loading: state => state.loading.one,
		})
	},
}
</script>

<style lang="stylus">

</style>
