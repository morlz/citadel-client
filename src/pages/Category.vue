<template>
	<div class="Category">
		<h1 class="Category__title">{{ content.title }}</h1>

		<div class="Category__description" v-html="content.description"/>

		<h2>Курсы</h2>

		<q-page-sticky position="bottom-left" :offset="[18, 18]">
			<q-fab icon="add" color="primary" direction="up">
				<q-fab-action icon="fa-sitemap" color="primary">
					<q-tooltip anchor="center right" self="center left" :offset="[10, 0]">
						Добавить категорию
					</q-tooltip>
				</q-fab-action>

				<q-fab-action icon="fa-graduation-cap" color="primary">
					<q-tooltip anchor="center right" self="center left" :offset="[10, 0]">
						Добавить курс
					</q-tooltip>
				</q-fab-action>
			</q-fab>
		</q-page-sticky>

		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="primary" icon="edit" @click="$router.push(`${$route.path}/edit`)" wait-for-ripple>
				<q-tooltip self="bottom left">
					Редактировать
				</q-tooltip>
			</q-btn>
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
import {} from 'quasar'

export default {
	components: {

	},
	props: {

	},
	watch: {

	},
	computed: {
		...mapState('category', {
			content: state => state.cached.one
		})
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
