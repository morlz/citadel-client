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

		<template v-if="isAdmin">
			<h2>Запись на занятия</h2>

			<record-list :content="records"/>

			<h2>Транзакции</h2>

			<transaction-list :content="transactions"/>
		</template>
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
import TransactionList from '@/components/TransactionList'

export default {
	components: {
		Gallery,
		RecordList,
		TransactionList
	},
	computed: {
		...mapState('user', {
			content: state => state.cached.one
		}),
		...mapGetters('user', [
			'transactions',
			'records'
		]),
		...mapGetters('auth', [
			'isAdmin'
		])
	},
}
</script>

<style lang="stylus">
.Profile
	&__description
		margin-top 10px
</style>
