<template>
	<div class="Cource">
		<h1 class="Cource__title">{{ content.title }}</h1>
		<div class="Cource__littleText" v-html="content.littleText"/>

		<gallery :images="content.gallery"/>

		<div class="Cource__description" v-html="content.description"/>

		<h2>Занятия</h2>

		<lesson-list :content="lessonsFiltred"/>

		<h2>Преподаватели</h2>

		<user-preview-list :content="workers"/>

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
import {} from 'quasar'
import Gallery from '@/components/Gallery'
import LessonList from '@/components/LessonList'
import UserPreviewList from '@/components/UserPreviewList'

export default {
	components: {
		Gallery,
		LessonList,
		UserPreviewList
	},
	props: {

	},
	watch: {

	},
	computed: {
		...mapState('cource', {
			content: state => state.cached.one,
			loading: state => state.loading.one
		}),
		...mapGetters('cource', [
			'lessonsFiltred',
			'workers'
		])
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
.Cource
	&__description
		margin-top 10px
</style>
