<template>
	<div class="Center">
		<h1 class="Center__title">{{ content.title }}</h1>

		<gallery :images="content.gallery"/>

		<div class="Center__description" v-html="content.description"/>

		<h2>Контакты</h2>

		<div class="Center__contacts">
			<div class="Center__contactList">
				<div class="Center__phone">
					<q-icon name="phone"/> {{ content.phone }}
				</div>

				<div class="Center__email">
					<q-icon name="local_post_office"/> {{ content.email }}
				</div>

				<div class="Center__address">
					<q-icon name="location_on"/> {{ content.address }}
				</div>
			</div>

			<div class="Center__map" v-html="content.map"/>
		</div>

		<h2>Курсы</h2>

		<cource-preview-list :content="cources"/>

		<h2>Преподаватели</h2>

		<user-preview-list :content="workers"/>

		<h2>Новости</h2>

		<new-preview-list :content="news"/>

		<q-page-sticky position="bottom-left" :offset="[18, 18]" v-if="false">
			<q-fab icon="add" color="primary" direction="up">
				<q-fab-action icon="fa-home" color="primary">
					<q-tooltip anchor="center right" self="center left" :offset="[10, 0]">
						Добавить центр
					</q-tooltip>
				</q-fab-action>

				<q-fab-action icon="fa-paperclip" color="primary">
					<q-tooltip anchor="center right" self="center left" :offset="[10, 0]">
						Добавить новость
					</q-tooltip>
				</q-fab-action>
			</q-fab>
		</q-page-sticky>

		<q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="false">
			<q-btn round color="primary" icon="edit" @click="$router.push(`${$route.path}/edit`)" wait-for-ripple>
				<q-tooltip self="bottom left">
					Редактировать
				</q-tooltip>
			</q-btn>
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
import CourcePreviewList from '@/components/CourcePreviewList'
import UserPreviewList from '@/components/UserPreviewList'
import NewPreviewList from '@/components/NewPreviewList'

export default {
	components: {
		Gallery,
		CourcePreviewList,
		UserPreviewList,
		NewPreviewList
	},
	props: {

	},
	watch: {

	},
	computed: {
		...mapState('center', {
			content: state => state.cached.one,
			loading: state => state.loading.one
		}),
		...mapGetters('center', [
			'cources',
			'workers',
			'news'
		]),
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
.Center
	&__map iframe
		width 100% !important

	&__contacts
		display grid
		grid-template-columns 1fr 1fr
		grid-gap 10px

	&__contactList
		display grid
		grid-gap 20px
		align-content start

		div i
			margin-right 15px
			font-size 40px

@media screen and (max-width 992px)
	.Center__contacts
		grid-template-columns 1fr
		grid-gap 20px

</style>
