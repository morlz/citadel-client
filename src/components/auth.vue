<template>
	<div class="auth">
		<div class="userData" v-if="logined">
			<div class="userName">Вы вошли как: <br>{{user.name}}</div>
		</div>

		<div class="buttons">
			<div class="button mather" @click="setSignInFormOpen(!signInFormOpen)" v-if="!logined">Вход</div>
			<div class="button mather" @click="setSignUpFormOpen(!signInFormOpen)" v-if="!logined">Регистрация</div>
			<div class="button mather" @click="logout" v-if="logined">Выйти</div>
			<router-link class="button mather" :to="{ path: `/user/${user.id}` }" v-if="logined">Профиль</router-link>
		</div>

		<transition name="fade">
			<div class="modalWrapper" :class="{ modalOpen: signInFormOpen }" @click="signInClose">
				<div class="modal mather" @click="stopProp">
					<input type="text" placeholder="Логин" v-model="signinForm.login">
					<input type="password" placeholder="Пароль" v-model="signinForm.pass">
					<vue-recaptcha
						:sitekey="reCaptchaKey"
						@verify="reOnVerify"
					    @expired="reOnExpired"
						ref="recaptcha"
						:key="1"
					/>
					<div class="buttons">
						<div class="buttonTR" @click="signInClose">Закрыть</div>
						<div class="buttonTRb" @click="signInHandler">Войти</div>
					</div>
				</div>
			</div>
		</transition>

		<transition name="fade">
			<div class="modalWrapper" :class="{ modalOpen: signUpFormOpen }" @click="signUpClose">
				<div class="modal mather" @click="stopProp">
					<input type="text" placeholder="Имя" v-model="signupFrom.name">
					<input type="text" placeholder="Логин" v-model="signupFrom.login">
					<input type="text" placeholder="email" v-model="signupFrom.email">
					<input type="password" placeholder="Пароль" v-model="signupFrom.password">
					<input type="password" placeholder="Пароль (ещё раз)" v-model="signupFrom.confirmPassword">
					<div class="passwordCompareError" v-if="signupFrom.password != signupFrom.confirmPassword && signupFrom.confirmPassword.length">Пароли не совпадают!</div>
					<vue-recaptcha
						:sitekey="reCaptchaKey"
						@verify="reOnVerify"
						@expired="reOnExpired"
						ref="recaptcha"
						:key="2"
					/>
					<div class="buttons">
						<div class="buttonTR" @click="signUpClose">Закрыть</div>
						<div class="buttonTRb" @click="signUpHandler">Продолжить</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'
import VueRecaptcha from 'vue-recaptcha'

export default {
	data(){
		return {
			signinForm: {
				login: "",
				pass: ""
			},
			signupFrom: {
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
			'user',
			'signUpFormOpen',
			'signInFormOpen'
		])
	},
	methods: {
		...mapMutations([
			'setSignUpFormOpen',
			'setSignInFormOpen'
		]),
		...mapActions([
			'logout',
			'signin',
			'signup',
			'checkCookies',
			'reOnVerify',
			'reOnExpired'
		]),
		signInClose(){
			this.setSignInFormOpen(false)
			this.$refs.recaptcha.reset()
		},
		signInHandler(){
			//this.$refs.recaptcha.reset()
			this.signin({
				login: this.signinForm.login,
				pass: this.signinForm.pass,
				'g-recaptcha-response': this.reToken
			})

			this.signInClose()
		},
		signUpClose(){
			this.setSignUpFormOpen(false)
			this.$refs.recaptcha.reset()
		},
		signUpHandler(){
			this.signup({
				name: this.signupFrom.name,
				email: this.signupFrom.email,
				login: this.signupFrom.login,
				pass: this.signupFrom.password,
				'g-recaptcha-response': this.reToken
			})

			this.signUpClose()
		},
		stopProp (e) {
			e.stopPropagation()
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
		.modalWrapper {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: grid;
			justify-items: center;
			align-items: center;
			z-index: 100;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			pointer-events: none;
			opacity: 0;
			transition: all 0.3s ease-in-out;
			&:hover:not(.modal) {
				cursor: pointer;
			}
			.modal {
				padding: 20px 20px 10px 20px;
				background: #fff;
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
		.modalOpen {
			pointer-events: all;
			opacity: 1;
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
