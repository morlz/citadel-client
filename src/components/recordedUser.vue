<template>
	<div class="recordedUserWrapper">
		<div class="recordedUser" v-if="!localEdit">
			<router-link class="title" :to="{ path: `/user/${reg.user.id}` }">{{ reg.user.name }}</router-link>
			<div class="statuses">
				<div class="status" :data-tooltip="reg.status.description" :class="{tooltip : reg.status.description}">{{ reg.status.title }}</div>
				<div class="status" :data-tooltip="reg.payment.description" :class="{tooltip : reg.payment.description}">{{ reg.payment.title }} </div>
			</div>
			<div class="button" @click="localEdit=!0">Изменить</div>
		</div>
		<div class="recordedUser edit" v-if="localEdit">
			<router-link class="title" :to="{ path: `/user/${reg.user.id}` }">{{ reg.user.name }}</router-link>
			<div class="statuses">
				<h4>Статус</h4>
				<input type="text" v-model="editFields.status.title">
				<h4>Описание статуса</h4>
				<input type="text" v-model="editFields.status.description">
				<h4>Статус оплаты</h4>
				<input type="text" v-model="editFields.payment.title">
				<h4>описание статуса оплаты</h4>
				<input type="text" v-model="editFields.payment.description">
			</div>
			<div class="buttons">
				<div class="buttonTRb" @click="saveRecordedUser">Сохранить</div>
				<div class="buttonTRb" @click="removeRecordUser({ id: editFields.id, id_lesson: -1 })">Удалить запись</div>
				<div class="buttonTR" @click="localEdit=!1">Отменить</div>
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

export default {
	props: ['content'],
	data () {
		return {
			search: "",
			localEdit: false,
			editFields: {}
		}
	},
	computed: {
		reg () {
			let data = this.content
			this.editFields = Object.assign({}, data)
			return data
		}
	},
	methods: {
		...mapActions([
			'updateRegistredUserForCurrentLesson',
			'removeRecordUser'
		]),
		saveRecordedUser () {
			this.updateRegistredUserForCurrentLesson(this.editFields)
			this.localEdit = !1
		}
	}
}
</script>

<style lang="less">
.recordedUserWrapper {
	&:not(:last-child) {
		border-bottom: 1px solid rgb(225, 225, 225);
	}
}
.recordedUser {
	padding: 5px 10px;
	display: grid;
	grid-gap: 10px;
	grid-auto-flow: column;
	align-items: center;
	grid-template-columns: 1fr 2fr 100px;
	transition: all 0.3s ease-in-out;
	.status {
		text-align: center;
		&:not(:last-child) {
			//border-bottom: 1px solid rgb(225, 225, 225);
		}
	}
	.tooltip {
		cursor: pointer;
	}
	.title {
		text-decoration: none;
		color: inherit;
	}
	.button {
		margin: 0 10px 0 0;
		opacity: 0;
		transition: all 0.3s ease-in-out;
	}
	&:hover {
		background: rgba(245, 245, 245, 0.7);
		> .button {
			opacity: 1;
		}
	}
}

.edit {
	grid-auto-flow: row;
	grid-template-columns: 1fr;
}
</style>
