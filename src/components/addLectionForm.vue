<template>
<div class="addlectionFromWrapper">
    <h3>Добавить занятие</h3>
    <div class="mather addLectionForm" v-if="!0 || data">
		<h4>Название</h4>
        <input type="text" class="title" placeholder="Название" v-model="editFields.title">

		<h4>Описание</h4>
        <quill-editor :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)" />

        <h4>Преподаватель</h4>
        <prepod-select :content="editFields.id_worker" @selected="onPrepodSelected" />

		<h4>Центр</h4>
		<center-select :content="editFields.id_center" @selected="onCenterSelected" />

        <h4 class="dur">Количество мест</h4>
		<vue-slider v-model="editFields.space" :min="0" :max="36"/>

        <h4 class="dur">Длительность</h4>
        <vue-slider v-model="editFields.duration" :formatter="timeFormat" :min="0" :max="360" />

		<h4>Дата и время занятия</h4>
		<flat-pickr v-model="editFields.date" :config="FP" />

		<h4>Цена</h4>
		<input type="text" v-model="editFields.price">
		<div class="buttonTRb addButton" @click="addLectionHandler">Добавить занятие</div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import prepodSelect from '@/components/prepod_select.vue'
import centerSelect from '@/components/center_select.vue'
import vueSlider from 'vue-slider-component'
import dateFormat from 'dateformat'
import flatPickr from 'vue-flatpickr-component'

export default {
    data() {
        return {
            editFields: {
                title: "",
                description: "",
                id_worker: "",
                duration: 60,
                space: 6,
				id_center: "",
				price: 0,
				date: dateFormat(new Date(), 'yyyy-mm-dd hh:mm:ss')
            }
        }
    },
    components: {
        prepodSelect,
		centerSelect,
        vueSlider,
		flatPickr
    },
	watch: {
		addLectionData () {
			let data = this.addLectionData || {}
			this.editFields = Object.assign({}, data)
		}
	},
    computed: {
        ...mapGetters([
            'quillOptions',
			'currentDiscipline',
			'FP',
			'addLectionData'
        ]),
		toDate () {
			return new Date(new Date().setDate(new Date().getDate()-1))
		},
		data () {
			let data = this.addLectionData || {}
			this.editFields = Object.assign({}, data)
			return data
		}
    },
    methods: {
		...mapActions([
			'addLection'
		]),
        onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.description = html
        },
        onPrepodSelected(newWorkerId) {
            this.editFields.id_worker = newWorkerId
        },
		onCenterSelected (newCenterId) {
			this.editFields.id_center = newCenterId
		},
        timeFormat(val) {
            let m = val % 60 + ' мин. '
            let h = Math.floor(val / 60) + ' ч. '
            return h + m
        },
		addLectionHandler () {
			let data = Object.assign({
				id_cource: this.currentDiscipline.id
			}, this.editFields)
			if (!data.id_worker) data.id_worker = null
			if (!data.id_center) data.id_center = null
			this.addLection(data)
		}
    }
}
</script>

<style lang="less">

@import url('../lib/vue-timepickr/VueTimepickr.min.css');
@import url('../../node_modules/flatpickr/dist/flatpickr.css');


.addLectionForm {
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    .title {
        margin-top: 0;
    }
    .dur {
        margin-bottom: 30px;
    }
	.addButton {
		text-align: right;
	}
}
</style>
