<template>
	<div class="Page">
		<h1 class="Page__title">{{ content.title }}</h1>

		<div class="Page__content" v-html="content.content"/>

		<gallery :images="content.gallery"/>

		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="primary" icon="edit" @click="$router.push(`${$route.path}/edit`)" wait-for-ripple/>
		</q-page-sticky>
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
		...mapState('page', {
			content: state => state.cached.one
		})
	},
}
</script>

<style lang="stylus">

</style>
