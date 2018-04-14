<template>
	<div class="Profile">
		<h1>{{ content.name }}</h1>

		<gallery :images="[content.avatar]"/>

		<div class="Profile__description" v-html="content.description"/>

		<h2>Контакты</h2>

		<div class="Profile__contacts">
			<div>
				{{ content.phone }}
			</div>

			<div>
				{{ content.email }}
			</div>

			<div>
				{{ content.role ? content.role.name : '' }}
			</div>
		</div>

		<h2>Запись на занятия</h2>

		<h2>Транзакции</h2>
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
import {} from 'quasar'

export default {
	components: {
		Gallery
	},
	props: {

	},
	watch: {

	},
	computed: {
		...mapState('user', {
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
