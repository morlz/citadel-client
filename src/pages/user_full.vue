<template>
	<div class="user_fullWrapper">
		<article class="user_full" v-if="!edit && !localEdit">
			<section class="big">
				<div class="adminButton">
					<div class="button" @click="localEdit = !localEdit" v-if="logined && user.id == data.id">Изменить профиль</div>
				</div>
				<h2>{{data.name}}</h2>
				<div class="photoS"><img :src="data.photo"></div>
				<div class="description" v-html="data.content"></div>
				<h3>Роль</h3>
				<div class="role" :class="{ [roleIconClass(data.id_role)]: true }">{{ roleName(data.id_role) }}</div>
				<h3>Контакты</h3>
				<div class="contacts">
					<div class="phone">{{data.phone}}</div>
					<div class="email">{{data.email}}</div>
				</div>

				<h3 v-if="currentUserRegs.length">Запись на занятия</h3>
				<div class="regs" v-for="reg, index in currentUserRegs">
					<div class="reg mather">
						<div class="title">{{ reg.lesson.title }}</div>
						<div class="description">
							Дата и время занятия: {{ reg.lesson.date }} <br>
							Цена: {{ reg.lesson.price }}
						</div>
						<div class="status">
							Статус: {{ reg.status.title }}
						</div>
						<div class="buttons">
							<div class="buttonTRb" @click="removeRecordUser({ id: reg.id, id_lesson: reg.lesson.id })">Отменить</div>
							<div class="buttonTRb">Оплатить</div>
							<router-link class="buttonTRb" :to="{ path: `/cource/${reg.lesson.id_cource}` }">Подробнее о курсе</router-link>
						</div>
					</div>
				</div>
			</section>
			<section class="small">
				<div class="photoB"><img :src="data.photo"></div>
				<div class="cources"></div>
			</section>
		</article>

		<article class="user_full edit" v-if="(edit || localEdit) && data">
			<section class="big">
				<div class="adminButton">
					<div class="button" @click="localEdit = !localEdit" v-if="localEdit">Отменить редактирование</div>
					<div class="button" @click="updateUser(editFields)">Сохранить изменения</div>
				</div>
				<input type="text" class="title" v-model="editFields.name">
				<div class="photoS"><img :src="data.photo"></div>
				<photoSelect class="photoS" :content="editFields.photo" @save="changePhoto"></photoSelect>
				<quill-editor v-if="isAdmin || isWorker" :content="editFields.content" :options="quillOptions" @change="onEditorChange($event)"></quill-editor>

				<h3>Контакты</h3>
				<div class="contacts">
					Телефон:
					<input type="text" v-model="editFields.phone" placeholder="Телефон">
					Email:
					<input type="text" v-model="editFields.email" placeholder="Email">
					Логин:
					<input type="text" v-model="editFields.login" placeholder="Логин">
				</div>

				<h3>Пароль</h3>
				<div class="password">
					Пароль:
					<input type="password" v-model="editFields.password" placeholder="Пароль">
					Пароль ещё раз:
					<input type="password" v-model="editFields.password2" placeholder="Пароль">
				</div>
			</section>
			<section class="small">
				<div class="photoB"><img :src="editFields.photo"></div>
				<photoSelect class="photoB" :content="editFields.photo" @save="changePhoto"></photoSelect>
				<div class="cources"></div>
			</section>
		</article>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

import {
    default as photoSelect
} from '@/components/photoSelect.vue'

import {
    default as mixins
} from '@/components/mixins.vue'

export default {
	data () {
		return {
			localEdit: false,
			editFields: {}
		}
	},
	mixins: [mixins],
	components: {
		photoSelect
	},
	methods: {
		...mapActions([
			'setCurrentUser',
			'updateUser',
			'getUserRegs',
			'removeRecordUser'
		]),
		changePhoto (newPhoto) {
			this.editFields.photo = newPhoto
		},
		onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.content = html
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
			'currentUserRegs'
		]),
		data () {
			let data = this.currentUser
			this.editFields = Object.assign({}, data)
			this.editFields.password = ""
			this.editFields.password2 = ""
			return data
		}
	},
	watch: {
		user () {
			if (this.user.id == this.$route.params.id || this.isAdmin) this.getUserRegs( this.$route.params.id )
		}
	},
	mounted () {
		this.setCurrentUser( this.$route.params.id )
		if (this.user.id == this.$route.params.id || this.isAdmin) this.getUserRegs( this.$route.params.id )
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
	.regs {
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
