<template>
	<div class="recordedUserWrapper">
		<div class="recordedUser" v-if="!localEdit">
			<router-link class="title" :to="{ path: `/user/${reg.user ? reg.user.id : ''}` }">{{ reg.user ? reg.user.name : '' }}</router-link>
			<div class="statuses">
				<div class="status">{{ reg.type ? reg.type.title : '' }} </div>
				<div class="status">{{ reg.comment }}</div>
			</div>
			<div class="button" @click="localEdit=!0">Изменить</div>
		</div>
		<div class="recordedUser edit" v-if="localEdit">
			<router-link class="title" :to="{ path: `/user/${reg.user ? reg.user.id : ''}` }">{{ reg.user ? reg.user.name : '' }}</router-link>
			<div class="statuses">
				<h4>Статус</h4>
				<select-with-search :value="editFields.type_id" proplabel="title" :data="registerTypes" @select="selectType" />
				<h4>Коммент</h4>
				<input type="text" v-model="editFields.comment">
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

//:data-tooltip="reg.payment.description" :class="{tooltip : reg.payment.description}"
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'
import selectWithSearch from '@/components/selectWithSearch.vue'

export default {
	props: ['content'],
	components: {
		selectWithSearch
	},
	data () {
		return {
			search: "",
			localEdit: false,
			editFields: {}
		}
	},
	computed: {
		...mapGetters([
			'registerTypes'
		]),
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
		},
		selectType(type) {
			this.editFields.type_id = type.id
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
