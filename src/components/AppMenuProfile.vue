<template>
<q-card class="q-ma-md AppMenuProfile" color="white" text-color="blue-grey-14">
	<template v-if="logined">
		<q-card-media>
			<img :src="user.avatar">
		</q-card-media>

		<q-card-title class="AppMenuProfile__title">
			{{ user.name }}
			<q-btn icon="account_box" color="primary" round class="AppMenuProfile__button"/>

			<div slot="subtitle" class="AppMenuProfile__email">
				<div>
					{{ user.email }}
				</div>

				<div>
					{{ user.role.name }}
				</div>
			</div>

			<q-btn slot="right" class="AppMenuProfile__balance" round flat>
				{{ user.balance }}
				<q-icon name="fa-ruble-sign"/>
			</q-btn>
		</q-card-title>

		<q-card-actions class="row reverse">
			<q-btn flat color="secondary">
				Выйти
			</q-btn>
		</q-card-actions>
	</template>

	<template v-else>
		<q-tabs inverted no-pane-border align="justify" v-model="currentTab">
			<q-tab slot="title" name="in" label="Вход" default/>
			<q-tab slot="title" name="up" label="Регистрация"/>

			<q-tab-pane name="in">
				<q-field :error="!!errorInLogin" :error-label="errorInLogin">
					<q-input v-model.trim="signin.login" float-label="Логин"/>
				</q-field>

				<q-field :error="!!errorInPassword" :error-label="errorInPassword">
					<q-input v-model.trim="signin.pass" float-label="Пароль" type="password"/>
				</q-field>
			</q-tab-pane>

			<q-tab-pane name="up">
				<q-field :error="!!errorFio" :error-label="errorFio">
					<q-input v-model.trim="signup.fio" float-label="Ваше имя"/>
				</q-field>

				<q-field :error="!!errorLogin" :error-label="errorLogin">
					<q-input v-model.trim="signup.login" float-label="Логин"/>
				</q-field>

				<q-field :error="!!errorEmail" :error-label="errorEmail">
					<q-input v-model.trim="signup.email" float-label="Email" type="email"/>
				</q-field>

				<q-field :error="!!errorPass" :error-label="errorPass" helper="6-255 символов">
					<q-input v-model.trim="signup.password" float-label="Пароль" type="password"/>
				</q-field>

				<q-field :error="!!errorPass2" :error-label="errorPass2">
					<q-input v-model.trim="signup.password2" float-label="Пароль ещё раз" type="password"/>
				</q-field>
			</q-tab-pane>
		</q-tabs>

		<q-card-actions>
			<q-btn color="primary" @click="validateForm">
				<q-popover :disable="!formValid" ref="rePopover">
					<vue-recaptcha
						class="q-ma-sm"
						ref="re"
						:sitekey="sitekey"
						@verify="onVerify"
						@expired="onExpired"
						size="normal"/>
				</q-popover>
				{{ currentTab == 'in' ? 'Войти' : 'Зарегистрироваться' }}
			</q-btn>
		</q-card-actions>
	</template>
</q-card>
</template>

<script>
import {
	mapGetters,
	mapActions,
	MapMutations,
	mapState
} from 'vuex'

import { QPopover } from 'quasar'

import VueRecaptcha from 'vue-recaptcha'

const validateEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
	components: {
		VueRecaptcha,
		QPopover
	},
	props: {

	},
	data () {
		return {
			currentTab: "",
			signin: {
				login: "",
				pass: ""
			},
			signup: {
				fio: "",
				login: "",
				email: "",
				password: "",
				password2: ""
			},
			tryToIn: 0,
			tryToUp: 0
		}
	},
	watch: {
		currentTab () {
			this.tryToIn = 0
			this.tryToUp = 0
			this.openRe = false
		},
		formValid (n) {
			if (n) return
			this.$refs.rePopover.hide()
		}
	},
	computed: {
		...mapState('auth/recaptcha', [
			'sitekey'
		]),
		...mapGetters('auth', [
			'user',
			'logined'
		]),
		errorInLogin () {
			if (!this.tryToIn) return
			if (!this.signin.login)
				return 'Введите логин'
		},
		errorInPassword () {
			if (!this.tryToIn) return
			if (!this.signin.pass)
				return 'Введите пароль'
			if (this.signin.pass.length < 6)
				return 'Минимальная длинна пароля 6 символов'
		},
		errorFio () {
			if (!this.tryToUp) return
			if (!this.signup.fio)
				return 'Введите ФИО'
		},
		errorLogin () {
			if (!this.tryToUp) return
			if (!this.signup.login)
				return 'Введите логин'
		},
		errorEmail () {
			if (!this.tryToUp) return
			if (!this.signup.email)
				return 'Введите email'
			if (!this.validateEmail(this.signup.email))
				return 'Введите корректный email'
		},
		errorPass () {
			if (!this.tryToUp) return
			if (!this.signup.password)
				return 'Введите пароль'
			if (this.signup.password.length < 6)
				return 'Минимальная длинна пароля 6 символов'
		},
		errorPass2 () {
			if (!this.tryToUp) return
			if (this.signup.password2 && this.signup.password2 != this.signup.password)
				return 'Пароли не совпадают'
		},
		signInFormValid () {
			let validate = [
				!this.errorInLogin,
				!this.errorInPassword
			]

			if ( validate.includes(false) ) return
			return true
		},
		signUpFormValid () {
			let validate = [
				!this.errorFio,
				!this.errorLogin,
				!this.errorEmail,
				!this.errorPass,
				!this.errorPass2
			]

			if ( validate.includes(false) ) return
			return true
		},
		formValid () {
			return this.currentTab == 'in' ?
				this.signInFormValid
			:	this.signUpFormValid
		}
	},
	methods: {
		...mapActions({
			signIn: 'auth/signin',
			signUp: 'auth/signup',
			authInit: 'auth/init'
		}),
		validateForm () {
			return this.currentTab == 'in' ?
				this.tryToIn++
			:	this.tryToUp++
		},
		validateEmail(email) {
			return validateEmailRegEx.test(String(email).toLowerCase())
		},
		async onVerify (e) {
			this.$refs.rePopover.hide()

			if (this.currentTab == 'in') {
				this.signIn({
					...this.signin,
					'g-recaptcha-response': e
				})
			} else {
				await this.signUp({
					...this.signup,
					'g-recaptcha-response': e
				})
			}
		},
		onExpired (e) {
			console.log('exired', e);
			this.$refs.re.reset()
		}
	},
	async mounted () {
		await this.authInit()
	}
}
</script>

<style lang="stylus">
.AppMenuProfile
	&__title
		position relative

	&__button
		position absolute
		top 0
		right 14px
		transform translateY(-50%)

	&__balance
		color gray
		i::before
			font-size 14px

	&__email
		color gray
</style>
