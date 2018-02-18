<template>
	<collapsible class="lesson" :class="{ 'lesson-opened': opened || localEdit }" @input="collapsibleInput" :value="opened || localEdit">
		<template v-if="!localEdit">
			<div class="lesson__title" slot="name">
				{{ data.title }}
			</div>

			<div class="lesson__descripion" slot="description">
				<ul class="lesson__descripionList">
					<li>Стоимость {{ data.price }} р.</li>
					<li>{{ dateFormat ? `Дата ${dateFormat}` : `Дата и время не указаны` }}</li>
					<li v-if="timeFormat">{{ timeFormat ? `Время ${timeFormat}` : `` }}</li>
					<li>{{ lessonCenter }}</li>
				</ul>
			</div>

			<div class="lesson__space tooltip space" slot="headerRight" data-tooltip="Занятые / все места" @click="showRegistredUsers( $event, data.id )">
				<div class="space__icon"/>
				<div class="space__numbers">{{ filled }} / {{ data.space }}</div>
			</div>

			<div class="lesson__content" v-html="data.description"/>

			<div slot="buttonsOpen">
				<i class="material-icons tooltip buttonTRri" data-tooltip="Удалить" @click.stop="deleteLesson($event, data.id)" v-if="isAdmin">delete</i>
				<i class="material-icons tooltip buttonTRbi" data-tooltip="Редактировать" @click.stop="localEdit = !localEdit" v-if="isAdmin">edit</i>
				<div class="buttonTRb" v-if="isAdmin && edit" @click="copy">Провести</div>
			</div>

			<div slot="buttons">
				<i class="material-icons tooltip buttonTRbi" data-tooltip="Копировать ссылку" @click.stop="copyLink">content_copy</i>
				<div class="buttonTRb" v-if="!edit && isUser && !data.registred && new Date(data.date).valueOf() > new Date().valueOf()" @click="openRegFormHandler" >Записаться</div>
				<div class="buttonTRb" v-if="!edit && !isUser && new Date(data.date).valueOf() > new Date().valueOf()" @click="alertNoRegistred" >Записаться</div>
				<router-link class="buttonTR" :to="{ path: `/user/${user.id}` }" v-if="data.registred">Вы записаны</router-link>
			</div>
		</template>


		<template v-if="localEdit">
			<input type="text" class="lesson__title" v-model="editFields.title" placeholder="Название" slot="name">

			<div class="lesson__content">
				<h4>Преподаватель</h4>
				<prepod_select class="lesson__field" :content="editFields.id_worker" @selected="onPrepodSelected" />

				<h4>Центр</h4>
				<center_select class="lesson__field" :content="editFields.id_center" @selected="onCenterSelected" />

				<h4 class="lesson__sliderName">Количество мест</h4>
				<vue-slider v-model="editFields.space" :min="0" :max="36"/>

				<h4 class="lesson__sliderName">Длительность</h4>
				<input class="lesson__field" type="text" placeholder="Длительность (мин)" v-model="editFields.duration"/>

				<h4>Дата и время занятия</h4>
				<flat-pickr class="lesson__field" v-model="fpModel" :config="FP"/>

				<h4>Цена</h4>
				<input class="lesson__field" type="text" v-model="editFields.price" placeholder="Цена"/>

				<h4>Описание</h4>
				<quill-editor :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)"/>
			</div>

			<template slot="buttons">
				<i class="material-icons tooltip buttonTRgi" data-tooltip="Отменить" @click="localEdit = !localEdit || !data">cancel</i>
				<i class="material-icons tooltip buttonTRbi" data-tooltip="Сохранить" @click="save">save</i>
				<div class="buttonTRb" @click="openRegFormHandler" v-if="regButton">Записаться</div>
			</template>
		</template>
	</collapsible>
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

import Collapsible from '@/components/Collapsible'

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
		prepod_select,
		Collapsible
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
			'centers',
			'user'
		]),
		data () {
			let data = this.content || {}

			this.editFields = Object.assign({}, data)
			return data
		},
		filled () {
			return this.data.filled || 0
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
			return center ? center.title : 'Центр не назначен'
		},
		fpModel: {
			get () {
				if (this.editFields.date == "0000-00-00 00:00:00") return
				return dateFormat(new Date(this.editFields.date), "yyyy-mm-dd HH:MM:ss")
			},
			set (n) {
				if (!n) n = "0000-00-00 00:00:00"
				this.editFields.date = n
			}
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
		},
		collapsibleInput (n) {
			this.opened = n
		},
		copyLink () {
			let input = document.createElement('input')
			input.style.opacity = 0
			input.style.top = 0
			input.style.position = 'absolute'
			input.value = `${window.location.origin}/#/cource/${this.data.id_cource}/${this.data.id}`
			document.documentElement.appendChild(input)
			input.select()
			document.execCommand('copy')
			input.remove()
		}
	}
}
</script>

<style lang="less">

.lesson {
	&__title {
		padding: 10px 0;
		color: #444;
		font-size: 24px;
		font-weight: 400;
		line-height: 20px;
		cursor: pointer;
		width: 100%;
		box-sizing: border-box;
	}

	&__field {
		margin: 0 10px;
		width: ~"calc(100% - 20px)";
		input {
			width: 100%;
		}
	}

	&__descripionList {
		list-style: none;
	}
}

.space {
	display: grid;
	grid-auto-flow: column;
	align-items: center;
	transition: all .3s ease-in-out;
	grid-gap: 10px;
	&__icon {
		background: url('../assets/images/люди.png') no-repeat;
		background-size: 100%;
		width: 48px;
		height: 48px;
	}

	&__numbers {

	}
}

</style>
