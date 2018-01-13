<template>
	<div class="canOpenLection" :class="{opened: opened || localEdit}" @click="opened = !opened || localEdit">
		<div v-if="!localEdit">
			<div class="title"> {{data.title}} </div>

			<div class="space tooltip" data-tooltip="Занятые / все места" @click="showRegistredUsers( $event, data.id )">
				<div class="spaceIcon"></div>
				<div class="spaceNumbers">{{ data.filled }} / {{ data.space }}</div>
			</div>

			<div class="description">
				Стоимость {{data.price}} р.<br>
				Длительность {{ durationFormat }} <br>
				Дата {{ dateFormat }} <br>
				Время {{ timeFormat }} <br>
				{{ lessonCenter }}
			</div>

			<div class="arrow" />

			<div class="content">
				<div v-html="data.description"/>
			</div>

			<div class="buttonsWrapper">
				<div class="buttonTRb" @click="localEdit = !localEdit" v-if="isAdmin" >Редактировать</div>
				<div class="buttonTRb" v-if="isAdmin && edit" @click="copy">Провести</div>
				<div class="buttonTRb register" v-if="isAdmin && edit" @click="deleteLesson($event, data.id)">Удалить</div>
				<div class="buttonTRb register" v-if="!edit && isUser && !data.registred && new Date(data.date).valueOf() > new Date().valueOf()" @click="openRegFormHandler" >Записаться</div>
				<div class="buttonTRb register" v-if="!edit && !isUser && new Date(data.date).valueOf() > new Date().valueOf()" @click="alertNoRegistred" >Записаться</div>
				<div class="buttonTR register" v-if="data.registred">Вы записаны</div>
			</div>
		</div>

		<div v-if="localEdit" class="editLocal">
			<input type="text" class="title" v-model="editFields.title" placeholder="Название">

			<div class="arrow" />

			<div class="content">
				<h4>Преподаватель</h4>
		        <prepod_select :content="editFields.id_worker" @selected="onPrepodSelected" />

				<h4>Центр</h4>
				<center_select :content="editFields.id_center" @selected="onCenterSelected" />

				<h4 class="dur">Количество мест</h4>
				<vue-slider v-model="editFields.space" :min="0" :max="36"/>

				<h4 class="dur">Длительность</h4>
				<input type="text" placeholder="Длительность (мин)" v-model="editFields.duration">

				<h4>Дата и время занятия</h4>
				<flat-pickr v-model="editFields.date" :config="FP"></flat-pickr>

				<h4>Цена</h4>
				<input type="text" v-model="editFields.price" placeholder="Цена">

				<h4>Описание</h4>
				<quill-editor :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)"/>
			</div>

			<div class="buttonsWrapper">
				<div class="buttonTRb" @click="localEdit = !localEdit || !data">Отменить</div>
				<div class="buttonTRb" @click="save">Сохранить</div>
				<div class="buttonTRb" @click="openRegFormHandler" v-if="regButton">Записаться</div>
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

import vueSlider from 'vue-slider-component'
import flatPickr from 'vue-flatpickr-component'
import prepod_select from '@/components/prepod_select.vue'
import center_select from '@/components/center_select.vue'
import dateFormat from 'dateformat'

export default {
	props: ['content'],
	data () {
		return {
			opened: false,
			localEdit: false,
			editFields: {}
		}
	},
	components: {
		vueSlider,
		flatPickr,
		center_select,
		prepod_select
	},
	computed: {
		...mapGetters([
			'isWorker',
			'isAdmin',
			'FP',
			'edit',
			'quillOptions',
			'logined',
			'isUser',
			'centers'
		]),
		data () {
			let data = this.content || {}

			this.editFields = Object.assign({}, data)
			return data
		},
		filled () {
			return this.data.space - 1
		},
		durationFormat () {
			let time = this.data.duration
			let h = Math.floor( time / 60 )
			let m = time % 60;
			return `${h} ч. ${m} мин.`
		},
		dateFormat () {
			if (this.data.date == "0000-00-00 00:00:00") return
			return dateFormat(new Date(this.data.date), "yyyy-mm-dd")
		},
		timeFormat () {
			if (this.data.date == "0000-00-00 00:00:00") return
			return dateFormat(new Date(this.data.date), "HH:MM")
		},
		durationFormatE () {
			let time = this.editFields.duration
			let h = Math.floor( time / 60 )
			let m = time % 60;
			return `${h} ч. ${m} мин.`
		},
		regButton () {
			return new Date().valueOf() < new Date(this.data.date).valueOf()
		},
		lessonCenter () {
			let center = this.centers.find(el => el.id == this.data.id_center)
			return center ? center.title : 'Не назначен'
		}
	},
	methods: {
		...mapActions([
			'showRegForm',
			'addLectionDataSet',
			'updateLection',
			'remove',
			'getRegistredUsersForCurrentLesson',
			'alert'
		]),
		...mapMutations([
			'showCurrentUsers',
			'setSignInFormOpen',
			'setSignUpFormOpen'
		]),
		openRegFormHandler (e) {
			e.stopPropagation()
			this.showRegForm(this.data)
		},
		save () {
			let data = Object.assign({}, this.editFields)
			if (!data.id_worker) data.id_worker = null
			if (!data.id_center) data.id_center = null
			this.updateLection(data)
			this.localEdit = !1
		},
		onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.description = html
        },
		copy(e){
			e.stopPropagation()
			let data = this.editFields
			data.date = new Date()
			this.addLectionDataSet(data)
		},
		deleteLesson(e, id) {
			e.stopPropagation()
			this.remove({
				type: 'lesson',
				id,
				redirect: false
			})
		},
		showRegistredUsers ( e, lessonId ) {
			e.stopPropagation()
			if (!this.isAdmin) return
			this.showCurrentUsers()
			this.getRegistredUsersForCurrentLesson( lessonId )
		},
		onPrepodSelected(newWorkerId) {
			this.editFields.id_worker = newWorkerId
		},
		onCenterSelected (newCenterId) {
			this.editFields.id_center = newCenterId
		},
		alertNoRegistred () {
			this.alert({
				content: "Для того чтобы записаться на занятия нужно:<br> 1. Зарегистрироваться <br>2. Войти в свою учётную запись!",
				buttons: [
					{ name: "Вход", event: e => {
						setTimeout(() => window.curtains.sctollToTop(), 300)
						setTimeout(() => this.setSignInFormOpen(), 700)
					} },
					{ name: "Регистрация", event: e => {
						setTimeout(() => window.curtains.sctollToTop(), 300)
						setTimeout(() => this.setSignUpFormOpen(), 700)
					} },
					{ name: "Ок" }
				]
			})
		}
	}
}
</script>

<style lang="less">

.canOpenLection {
	box-sizing: border-box;
	position: relative;
    width: 100%;
    border: 1px solid transparent;
    display: grid;
    grid-auto-flow: row;
    padding: 20px;
	transition: all 0.3s ease-in-out;
	cursor: pointer;
    .title {
        color: #444;
        font-size: 24px;
        font-weight: 400;
        line-height: 20px;
    }
	.space {
		width: 120px;
		position: absolute;
		top: 20px;
		right: 80px;
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		transition: all .3s ease-in-out;
		.spaceIcon {
			background: url('../assets/images/люди.png') no-repeat;
			background-size: 100%;
			width: 48px;
			height: 48px;
		}
	}
    .description {
        color: #666;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        margin-top: 8px;
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
	.arrow {
		position: absolute;
		top: 25px;
		right: 20px;
		width: 35px;
		height: 35px;
		background: url("../assets/images/ARROW.svg") no-repeat 50% 50%;
		background-size: 25px;
		transition: all 0.3s ease-in-out;
	}
	.content {
		transition: all 0.3s ease-in-out;
		opacity: 0;
		max-height: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		padding: 0 20px;
		grid-gap: 10px;
		input {
			width: 100%;
			box-sizing: border-box;
		}
		h3 {
			font-size: 20px;
		}
		.logo {
			width: 100%;
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}

	.buttonsWrapper {
		position: absolute;
		bottom: 20px;
		right: 20px;
		user-select: none;
		transition: all 0.3s ease-in-out;
		> div {
			font-size: 18px;
			transition: all 0.3s ease-in-out;
		}
		> div:not(.register) {
			opacity: 0;
			pointer-events: none;
		}
		display: grid;
		grid-auto-flow: column;
	}
}

@media (max-width: 1200px) {
	.canOpenLection {
		.space {
			right: 20px;
		}
		.arrow {
			opacity: 0;
		}
	}
}

@media (max-width: 800px) {
	.canOpenLection {
		padding: 20px 5px;
		.content {
			padding: 0;
		}
		.buttonsWrapper {
			grid-auto-flow: row;
		}
	}
}

.opened {
	padding: 50px 20px 80px 20px;
    border-top: 1px solid rgb(225, 225, 225);
    border-bottom: 1px solid rgb(225, 225, 225);
	.arrow {
		top: 70px;
		transform: rotateX(-180deg);
	}
	.space {
		top: 65px;
	}
	.content {
		opacity: 1;
		max-height: 1000px;
	}
	.register {
		bottom: 30px;
	}
	.buttonsWrapper {
		> div:not(.register) {
			opacity: 1;
			pointer-events: all;
		}
	}
}

.editLocal {
	.title {
		width: ~"calc(100% - 50px)";
	}
	.content {
		grid-template-columns: 1fr;
		height: auto;
		grid-auto-flow: row;
	}
}
</style>
