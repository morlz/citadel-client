<template>
	<div class="reg mather">
		<div class="normal" v-if="!localEdit">
			<div class="title">{{ data.lesson ? data.lesson.title : '...' }}</div>
			<div class="description">
				Дата и время занятия: {{ data.lesson ? data.lesson.date : '...' }} <br>
				Цена: {{ data.lesson ? data.lesson.price : '...' }}
			</div>
			<div class="status">
				Статус: {{ data.type ? data.type.title : '...' }}
			</div>
			<div class="buttons">
				<div class="buttonTRb" @click="removeRecordUser({ id: data.id, id_lesson: data.lesson ? data.lesson.id : '...' })" v-if="showButtonCancel">Отменить</div>
				<div class="buttonTRb" @click="fakeCancelHandle" v-if="showButtonCancelFake">Отменить</div>
				<div class="buttonTRb" @click="payReg({ id: data.id })" v-if="data.type && data.type.id == 1">Оплатить</div>
				<div class="buttonTRb" @click="localEdit = true" v-if="isAdmin">Редактировать</div>
				<router-link class="buttonTRb" :to="{ path: `/cource/${data.lesson ? data.lesson.id_cource : '...'}` }">Подробнее о курсе</router-link>
			</div>
		</div>

		<div class="edit" v-if="localEdit && data">
			<div class="title">{{ data.lesson ? data.lesson.title : '...' }}</div>
			<div class="description">
				Дата и время занятия: {{ data.lesson ? data.lesson.date : '...' }} <br>
				Цена: {{ data.lesson ? data.lesson.price : '...' }}
			</div>
			<div class="status">
				<h4>Статус</h4>

				<select-with-search :data="registerTypes" proplabel="title" @select="typeSelect" :value="editFields.type_id" />
			</div>
			<div class="paymentType">
				<h4>Тип оплаты</h4>

				<select-with-search :data="paymentTypesWithNull" proplabel="title" @select="paymentTypeSelect" :value="editFields.payment_type_id" />
			</div>

			<div class="paymentDataId" v-if="this.editFields.payment_type_id != 3">
				<h4>Данные оплаты</h4>

				<select-with-search :data="paymentData" :proplabel="paymentDataLabel" @select="paymentDataSelect" :value="editFields.payment_data_id" />
			</div>

			<div class="buttons">
				<div class="buttonTRb" @click="save">Сохранить</div>
				<div class="buttonTR" @click="localEdit = false">Отменить (редактирование)</div>
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

import selectWithSearch from '@/components/selectWithSearch.vue'

export default {
	props: ['content'],
	data () {
		return {
			localEdit: false,
			editFields: {}
		}
	},
	components: {
		selectWithSearch
	},
	computed: {
		...mapGetters([
			'isAdmin',
			'paymentTypes',
			'registerTypes',
			'cachedTransactions'
		]),
		data () {
			let data = this.content || {}

			this.editFields = Object.assign({}, data)
			return data
		},
		cachedTransactionsWithNull () {
			return [{ amount: "NULL", id: null }, ...this.cachedTransactions]
		},
		paymentTypesWithNull () {
			return [{ title: "NULL", id: null }, ...this.paymentTypes]
		},
		paymentData () {
			switch (this.editFields.payment_type_id) {
				case 1:
					return this.cachedTransactionsWithNull
					break;
				default:
					return []
			}
		},
		showButtonCancelDate () {
			return new Date(this.data.lesson ? this.data.lesson.date : null).valueOf() > new Date().valueOf()
		},
		showButtonCancel () {
			return this.showButtonCancelDate && this.data.type.id == 1
		},
		showButtonCancelFake () {
			return this.showButtonCancelDate && this.data.type.id != 1
		}
	},
	methods: {
		...mapActions([
			'removeRecordUser',
			'payReg',
			'updateUserReg',
			'alert'
		]),
		save() {
			this.updateUserReg(this.editFields)
			this.localEdit = false
		},
		typeSelect (type) {
			this.editFields.type_id = type.id
		},
		paymentTypeSelect (type) {
			this.editFields.payment_type_id = type.id
			this.editFields.payment_data_id = null
		},
		paymentDataSelect (data) {
			this.editFields.payment_data_id = data.id
		},
		paymentDataLabel: item => item.created_at ? `<div class="dGrid"><div>${item.amount}</div><div>${item.created_at}</div></div>` : `NULL`,
		fakeCancelHandle () {
			this.alert({
				content: "Занятие уже подтверждено либо оплачено. Обратитесь к администору."
			})
		}
	}
}
</script>

<style lang="less">
.reg {
	padding: 20px;
	background: #fff;
	.title {
		margin: 10px 0;
		color: #444;
		font-size: 24px;
		font-weight: 400;
		line-height: 20px;
	}
	.buttons {
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
	}
	.dGrid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		> div:nth-child(2) {
			text-align: right;
		}
	}
}
</style>
