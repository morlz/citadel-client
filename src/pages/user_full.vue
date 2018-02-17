<template>
	<div class="user_fullWrapper">
		<article class="user_full" v-if="!edit && !localEdit">
			<section class="big">
				<div class="adminButton">
					<div class="button" @click="localEdit = !localEdit" v-if="user.id == data.id">Изменить профиль</div>
				</div>

				<h2>{{data.name}}</h2>

				<div class="photoS">
					<mz-image v-model="data.photo"/>
				</div>
				<div class="description" v-html="data.description"></div>

				<h3>Роль</h3>
				<div class="role" :class="{ [roleIconClass(data.id_role)]: true }">{{ roleName(data.id_role) }}</div>

				<h3 v-if="(user.id == data.id || isAdmin) && data.balance !== undefined">Баланс {{ currentUserBalance }} руб</h3>
				<div class="payForm mather" v-if="(user.id == data.id || isAdmin)">
					<h4>Пополнение баланса онлайн</h4>
					<input type="text" v-model="paySumm" placeholder="Сумма платежа">
					<div class="buttonTRb" @click="addCash(paySumm)">Пополнить</div>
				</div>

				<h3 v-if="user.id == data.id || isAdmin">Контакты</h3>
				<div class="contacts" v-if="user.id == data.id || isAdmin">
					<div class="phone">{{data.phone}}</div>
					<div class="email">{{data.email}}</div>
				</div>

				<h3 v-if="user.id == data.id || isAdmin">Запись на занятия</h3>
				<userRegs :user-id="data.id" v-if="user.id == data.id || isAdmin" />

				<h3 v-if="data.id == user.id || isAdmin">Транзакции</h3>
				<user-transactions v-if="data.id == user.id || isAdmin" :key="data.id" />
			</section>
			<section class="small">
				<div class="photoB">
					<mz-image v-model="data.photo"/>
				</div>
				<div class="cources"></div>
			</section>
		</article>

		<article class="user_full edit" v-if="(edit || localEdit) && data">
			<section class="big">
				<div class="adminButton">
					<div class="button" @click="localEdit = !localEdit" v-if="localEdit">Отменить редактирование</div>
					<div class="button" @click="updateUserHandler">Сохранить изменения</div>
				</div>
				<input type="text" class="title" v-model="editFields.name">
				<mz-image v-model="editFields.photo" class="photoS" edit/>
				<quill-editor v-if="isAdmin || isWorker" :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)" />

				<div v-if="isAdmin">
					<h3>Роль</h3>
					<role_select :content="editFields.id_role" @selected="changeRole" />
				</div>


				<h3>Контакты</h3>
				<div class="contacts">
					Телефон:
					<input type="text" v-model="editFields.phone" placeholder="Телефон">
					Email:
					<input type="text" v-model="editFields.email" placeholder="Email" :disabled="!isAdmin">
					Логин:
					<input type="text" v-model="editFields.login" placeholder="Логин" :disabled="!isAdmin">
				</div>

				<h3>Пароль</h3>
				<div class="password">
					Пароль:
					<input type="password" v-model="editFields.password" placeholder="Пароль">
					Пароль ещё раз:
					<input type="password" v-model="editFields.password2" placeholder="Пароль ещё раз">
					<div class="passConfirmErr" v-show="editFields.password != editFields.password2 && editFields.password2.length">Пароли не совпадают</div>
				</div>

				<h3>Запись на занятия</h3>
				<userRegs :user-id="data.id" />

				<h3 v-if="data.id == user.id || isAdmin">Транзакции</h3>
				<user-transactions v-if="data.id == user.id || isAdmin" :key="data.id" />
			</section>
			<section class="small">
				<mz-image v-model="editFields.photo" class="photoB" edit/>
				<div class="cources"></div>
			</section>
		</article>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

import userRegs from '@/components/userRegs.vue'
import role_select from '@/components/role_select.vue'
import userTransactions from '@/components/userTransactions.vue'
import mixins from '@/components/mixins.vue'

import MzImage from '@/components/MzImage.vue'

export default {
	data () {
		return {
			localEdit: false,
			editFields: {},
			paySumm: 0
		}
	},
	mixins: [mixins],
	components: {
		userRegs,
		role_select,
		userTransactions,
		MzImage
	},
	methods: {
		...mapActions([
			'setCurrentUser',
			'updateUser',
			'addCash'
		]),
		...mapMutations([
			'toggleEditMutation'
		]),
		onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.description = html
        },
		updateUserHandler(){
			this.updateUser(this.editFields)
			this.toggleEditMutation(false)
			this.localEdit = false
		},
		changeRole (to) {
			this.editFields.id_role = to
		}
	},
	computed: {
		...mapGetters([
			'currentUser',
			'quillOptions',
			'edit',
			'isAdmin',
			'isWorker',
			'user',
			'logined',
			'currentUserBalance'
		]),
		data () {
			let data = this.currentUser
			this.editFields = Object.assign({
				password: "",
				password2: ""
			}, data)
			return data
		}
	},
	mounted () {
		this.setCurrentUser( this.$route.params.id )
	}
}
</script>

<style lang="less">
.user_fullWrapper {
	> .button {
		display: inline;
		text-align: center;
		margin-left: 20%;
	}
	padding-bottom: 20px;
}

.edit {
	.title {
		width: 100%;
		box-sizing: border-box;
		font-family: "Roboto Slab", Arial, sans-serif;
		font-size: 46px;
		font-weight: 300;
		letter-spacing: -2px;
		line-height: 58px;
		color: #444;
		margin: 10px 0;
		padding: 0;
	}
	.images {
		width: 100%;
		min-height: 200px;
	}
	.photoB {
		width: 100%;
	}
	.logo {
		width: 100%;
	}
}

.user_full {
    box-sizing: border-box;
    display: grid;
    grid-gap: 20px;
    grid-template: "big small" auto ~"/" 65% 35%;
	.role {
		line-height: 30px;
	}
    .images .gallery {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(4, 1fr);
        align-items: center;
        .image {
            width: 100%;
        }
    }
	.contacts, .password {
		display: grid;
		grid-auto-flow: row;
		line-height: 30px;
		grid-gap: 10px;
	}
	.photoB {
		img {
			width: 100%;
		}
	}
    .photoS {
        display: none;
        text-align: center;
        max-width: 100%;
        img {
			width: 100%;
            margin: 0 auto;
        }
    }
	.payForm {
		background: #fff;
		padding: 20px;
		display: grid;
		align-items: center;
		grid-template: 	"h4 s b";
		h4 {
			margin: 0;
			grid-area: h4;
		}
		.buttonTRb {
			justify-self: end;
			grid-area: b;
		}
	}
}
@media (max-width: 1100px) {
    .user_full {
        grid-template: "big" auto "small" auto ~"/" 60% 40%;
    }
}
@media (max-width: 800px) {
    .user_full {
        .photoB {
            display: none;
        }
        .photoS {
            display: block;
        }
        .images .gallery {
            grid-template-columns: repeat(2, 1fr);
        }
        grid-template: "big" auto "small" auto;
    }
}
</style>


паспорт
снилс
инн
военный билет
2 фото 3х4
игорев николай
