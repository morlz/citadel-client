<template>
<q-list class="TransactionList" inset-separator>
	<transaction v-for="transaction, index in content" :key="transaction.id" :content="transaction"/>

	<div v-if="!content.length">
		Список пуст
	</div>

	<q-inner-loading :visible="loading">
		<q-spinner size="50px" color="primary"/>
	</q-inner-loading>
</q-list>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import Transaction from '@/components/Transaction'

export default {
	components: {
		Transaction
	},
	props: {
		content: Array
	},
	computed: {
		...mapState('user/transaction', {
			loading: state => state.loading.list
		})
	}
}
</script>

<style lang="stylus">
.TransactionList
	position relative
</style>
