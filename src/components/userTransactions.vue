<template>
	<div class="transactionsWrapper">
		<user-transaction v-for="transaction, index in cachedTransactions" :content="transaction" :key="index" />
		<div  v-if="!cachedTransactions.length">
			В данный момент транзакций нет
		</div>

		<h3 v-if="isAdmin">Добавить транзакцию</h3>
		<add-user-transaction-form v-if="isAdmin"/>
	</div>
</template>
<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import dateFormat from 'dateformat'
import userTransaction from '@/components/userTransaction.vue'
import addUserTransactionForm from '@/components/addUserTransactionForm.vue'

export default {
	components: {
		userTransaction,
		addUserTransactionForm
	},
	methods: {
		...mapActions([
			'getUserTransactions'
		])
	},
	watch: {
		currentUser (n) {
			if (n.id)
				this.getUserTransactions(n.id)
		},
	},
	computed: {
		...mapGetters([
			'cachedTransactions',
			'currentUser',
			'isAdmin',
			'edit'
		])
	},
    mounted() {
		if (this.currentUser.id)
			this.getUserTransactions(this.currentUser.id)
    }
}
</script>

<style lang="less">

.transactionsWrapper {
	display: grid;
	grid-gap: 10px;
}

</style>
