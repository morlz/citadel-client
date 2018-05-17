<template>
<q-modal :value="value" @input="$emit('input', $event)" :content-css="{minWidth: '80vw', minHeight: '80vh'}" class="RegForm">
	<q-modal-layout>
		<q-toolbar slot="header">
			<q-btn flat round dense v-close-overlay icon="keyboard_arrow_left" />
			<q-toolbar-title>
				Запись на занятие: {{ form.bufferLesson.title }}
			</q-toolbar-title>
		</q-toolbar>

		<div class="layout-padding">
			<h1>Запись на занятие</h1>

			<q-field>
				<q-input :value="auth_user.name" float-label="Имя" readonly/>
			</q-field>

			<q-field>
				<q-input :value="auth_user.email" type="email" float-label="Email" readonly/>
			</q-field>

			<q-field>
				<q-input :value="auth_user.phone" type="tel" float-label="Телефон"/>
			</q-field>

			<q-field>
				<q-input value="" type="textarea" float-label="Комментарий"/>
			</q-field>

			<div class="RegForm__buttons">
				<q-btn color="primary" v-close-overlay label="Записаться" />
			</div>
		</div>
	</q-modal-layout>
</q-modal>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import {
	QModal,
	QModalLayout,
	CloseOverlay
} from 'quasar'

import { AuthMixin } from '@/mixins'

export default {
	components: {
		QModal,
		QModalLayout
	},
	directives: {
		CloseOverlay
	},
	mixins: [AuthMixin],
	props: {
		value: Boolean
	},
	data() {
		return {
			search: ''
		}
	},
	watch: {

	},
	computed: {
		...mapState('user/record', {
			form: state => state.form
		})
	},
	methods: {

	},
	async mounted() {

	},
	created() {

	},
	destroyed() {

	}
}
</script>

<style lang="stylus">
.RegForm
	&__buttons
		margin-top 10px
</style>
