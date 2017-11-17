<template>
	<div class="auth">
		<div class="userData" v-if="logined">
			<div class="userName">Вы вошли как: <br>{{user.name}}</div>
		</div>

		<div class="buttons">
			<div class="button mather" @click="signinForm.open = !signinForm.open" v-if="!logined">Вход</div>
			<div class="button mather" @click="signupFrom.open = !signupFrom.open" v-if="!logined">Регистрация</div>
			<div class="button mather" @click="logout" v-if="logined">Выйти</div>
			<router-link class="button mather" :to="{ path: `/user/${user.id}` }" v-if="logined">Профиль</router-link>
		</div>

		<transition name="fade">
			<div class="modal mather" v-if="signinForm.open">
				<input type="text" placeholder="Логин" v-model="signinForm.login">
				<input type="password" placeholder="Пароль" v-model="signinForm.pass">
				<vue-recaptcha
					:sitekey="reCaptchaKey"
					@verify="reOnVerify"
				    @expired="reOnExpired"
					ref="recaptcha"
					:key="1"
				></vue-recaptcha>
				<div class="buttons">
					<div class="buttonTR" @click="signInClose">Закрыть</div>
					<div class="buttonTRb" @click="signInHandler">Войти</div>
				</div>
			</div>
		</transition>

		<transition name="fade">
			<div class="modal mather" v-if="signupFrom.open">
				<input type="text" placeholder="Имя" v-model="signupFrom.name">
				<input type="text" placeholder="Логин" v-model="signupFrom.login">
				<input type="text" placeholder="email" v-model="signupFrom.email">
				<input type="password" placeholder="Пароль" v-model="signupFrom.pass">
				<input type="password" placeholder="Пароль (ещё раз)" v-model="signupFrom.pass">
				<vue-recaptcha
					:sitekey="reCaptchaKey"
					@verify="reOnVerify"
					@expired="reOnExpired"
					ref="recaptcha"
					:key="2"
				></vue-recaptcha>
				<div class="buttons">
					<div class="buttonTR" @click="signUpClose">Закрыть</div>
					<div class="buttonTRb" @click="signUpHandler">Продолжить</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

import VueRecaptcha from 'vue-recaptcha'

export default {
	data(){
		return {
			signinForm: {
				open: false,
				login: "",
				pass: ""
			},
			signupFrom: {
				open: false,
				name: "",
				email: "",
				login: "",
				password: "",
				confirmPassword: ""
			}
		}
	},
	components: {
		VueRecaptcha
	},
	computed: {
		...mapGetters([
			'user',
			'logined',
			'reCaptchaKey',
			'reToken',
			'user'
		])
	},
	methods: {
		...mapActions([
			'logout',
			'signin',
			'signup',
			'checkCookies',
			'reOnVerify',
			'reOnExpired'
		]),
		signInClose(){
			this.signinForm.open = false
			this.$refs.recaptcha.reset()
		},
		signInHandler(){
			//this.$refs.recaptcha.reset()
			this.signin({
				login: this.signinForm.login,
				pass: this.signinForm.pass,
				'g-recaptcha-response': this.reToken
			})

			this.signinForm.open = false
		},
		signUpClose(){
			this.signupFrom.open = false
			this.$refs.recaptcha.reset()
		},
		signUpHandler(){

		}
	},
	mounted () {
		this.checkCookies()
	}
}
</script>

<style lang="less">
	.auth {
		box-sizing: border-box;
		padding: 10px;
		width: 200px;
		position: relative;
		> .userData {
			text-align: right;
			padding: 10px;
			box-sizing: border-box;
		}
		> .buttons {
			display: grid;
			justify-items: end;
			justify-content: end;
			grid-auto-flow: column;
			grid-gap: 15px;
		}
		.modal {
			z-index: 100;
			top: -50%;
			right: 20px;
			padding: 20px 20px 10px 20px;
			background: #fff;
			position: absolute;
			display: grid;
			align-items: center;
			justify-items: end;
			grid-gap: 10px;
			> .buttons {
				display: grid;
				grid-auto-flow: column;
			}
			input {
				width: 100%;
				box-sizing: border-box;
			}
		}
	}
	.fade-enter-active, .fadeContent-leave-active {
		transition: all 0.3s ease-in-out;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	@media (max-width: 800px) {
		.auth {
			> .userData {
				text-align: center;
			}
			> .buttons {
				justify-items: center;
				justify-content: center;
			}
		}
	}
</style>
