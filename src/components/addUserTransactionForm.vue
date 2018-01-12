<template>
	<div class="transactionWrapper">
		<div class="mather addTransactionForm">
			<h4>Дата и время</h4>
			<flat-pickr v-model="editFields.date" :config="FP" />

			<h4>Описание</h4>
			<input type="text" v-model="editFields.description" placeholder="Описание">

			<h4>Сумма</h4>
			<input type="text" v-model="editFields.amount" placeholder="Количество">

			<div class="buttons">
				<div class="buttonTRb" @click="add">Добавить</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import dateFormat from 'dateformat'
import flatPickr from 'vue-flatpickr-component'

export default {
	components: {
		flatPickr
	},
    data() {
        return {
			editFields: {
				date: dateFormat(new Date(), 'yyyy-mm-dd hh:mm:ss'),
				description: "",
				amount: 0
			}
		}
    },
	methods: {
		add () {
			let data = Object.assign({}, this.editFields)
			data.date = dateFormat(new Date(data.date), "yyyy-mm-dd HH:MM:ss")
			data.user_id = this.currentUser.id
			this.addUserTransaction(data)
		},
		...mapActions([
			'addUserTransaction'
		])
	},
	computed: {
		...mapGetters([
			'FP',
			'currentUser'
		])
	}
}
</script>

<style lang="less">
.transactionWrapper {
	.addTransactionForm {
		display: grid;
		grid-auto-flow: row;
		padding: 0 20px 20px 20px;
		background: #fff;
		.buttons {
			justify-self: end;
		}
	}
}


</style>
