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

		<record-list :content="records"/>

		<h2>Транзакции</h2>

		<q-list inset-separator>
			<q-item v-for="transaction, index in transactions" :key="transaction.id">
				<q-item-main>
					{{ transaction.description }}
				</q-item-main>

				<q-item-side>
					{{ transaction.amount }}
				</q-item-side>
			</q-item>
		</q-list>
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
import RecordList from '@/components/RecordList'

export default {
	components: {
		Gallery,
		RecordList
	},
	computed: {
		...mapState('user', {
			content: state => state.cached.one
		}),
		...mapGetters('user', [
			'transactions',
			'records'
		])
	},
}
</script>

<style lang="stylus">
.Profile
	&__description
		margin-top 10px
</style>
