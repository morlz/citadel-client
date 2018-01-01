<template>
	<div class="transactionWrapper">
		<div class="transaction mather" v-if="!localEdit" :class="{ isAdmin }">
			<div class="date">Дата: {{ getDate(transaction.date) }}</div>
			<div class="t">Время: {{ getTime(transaction.date) }}</div>
			<div class="description">Описание: {{ transaction.description }}</div>
			<div class="amount">{{ transaction.amount }}</div>
			<div class="buttonTRb editButton" v-if="isAdmin" @click="localEdit = true">Редактировать</div>
		</div>

		<div class="mather edit" v-if="localEdit">
			<h4>Дата и время</h4>
			<flat-pickr v-model="editFields.date" :config="FP" />

			<h4>Описание</h4>
			<input type="text" v-model="editFields.description" placeholder="Описание">

			<h4>Количество</h4>
			<input type="text" v-model="editFields.amount" placeholder="Количество">

			<div class="buttons">
				<div class="buttonTRb" @click="save">Сохранить</div>
				<div class="buttonTR" @click="localEdit = false">Отменить</div>
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
	props: ['content'],
    data() {
        return {
			editFields: {},
			localEdit: false
		}
    },
	components: {
		flatPickr
	},
	methods: {
		getDate: d => dateFormat(new Date(d), "yyyy-mm-dd"),
		getTime: d => dateFormat(new Date(d), "HH:MM"),
		save () {
			this.updateUserTransaction(this.editFields)
			this.localEdit = false
		},
		...mapActions([
			'updateUserTransaction'
		])
	},
	computed: {
		transaction () {
			let data = Object.assign({}, this.content)
			this.editFields = data
			return data
		},
		...mapGetters([
			'isAdmin',
			'FP'
		])
	}
}
</script>

<style lang="less">
.transactionWrapper {
	.transaction {
		background: #fff;
		padding: 20px;
		display: grid;
		grid-template: 	"date amount" 1fr
						"time amount" 1fr
						"desc amount" 1fr;

		align-items: center;
		grid-gap: 10px;
		transition: box-shadow 0.3s ease-in-out;

		.amount {
			grid-area: amount;
			align-self: center;
			justify-self: end;
			font-size: 30px;
		}
		.editButton, .buttons {
			justify-self: end;
			grid-area: btn;
		}
		.buttons {
			display: grid;
			grid-auto-flow: column;
		}
	}

	.isAdmin {
		grid-template: 	"date amount"
		 				"time amount"
						"desc btn";
	}

	.edit {
		background: #fff;
		padding: 5px 20px 20px 20px;
		grid-template-columns: 1fr;
		grid-auto-flow: column;
		.buttons {
			justify-self: end;
			display: grid;
			justify-content: end;
			grid-auto-flow: column;
		}
	}
}


</style>
