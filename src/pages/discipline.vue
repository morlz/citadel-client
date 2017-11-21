<template>
<div class="disciplineWrapper">

	<regForm />
	<recordedUsers />

    <article class="discipline" v-if="!edit">

        <section class="big">
            <h2 class="title"> {{ dis.title }} </h2>
            <div class="photoS"> <img :src="dis.logo"> </div>
            <div class="content" v-html="dis.description"></div>
            <div class="images">
                <gallery :images="parseJSONimages(dis.images)" :edit="edit" />
            </div>
			<h3>Предстоящие занятия</h3>
			<div class="canOpenWrapper">
				<lection v-for="lesson, index in nextLessons" :key="index" :content="lesson" />
				<div v-if="!nextLessons || !nextLessons.length">В данный момент занятий нет</div>
			</div>
        </section>

        <section class="small">
            <div class="photoB"> <img :src="dis.logo"> </div>
            <div class="prepods">
                <h3>Преподаватели</h3>
                <user_prev v-for="(prepod, index) in disPrepods" :id="prepod" :key="index" />
				<div v-if="!dis.prepods">В данный момент преподавателей нет</div>
            </div>
			<h3>Фильтр занятий</h3>
			<div class="lessonsFilter mather">
				<h4>По дате</h4>
				<p>Все занятия в выбраном проежутке</p>
				<flat-pickr v-model="lessonFilterLocal.date" :config="dateFilterConfig" />
				<label v-if="isAdmin && false">
					<input type="checkbox" v-model="lessonFilterLocal.showAll">
					Отображать все
				</label>
			</div>
        </section>

    </article>

    <article class="discipline edit" v-if="edit && dis">

        <section class="big">
			<div class="adminButton">
				<div class="button" @click="deleteCource(dis.id)">Удалить курс</div>
				<div class="button" @click="updateCource(editFields)">Сохранить изменения</div>
			</div>
            <input class="title" type="text" v-model="editFields.title">
			<h3>Краткое описание:</h3>
			<input type="text" v-model="editFields.littleText" placeholder="Краткое описание">
			<h3>Полное описание:</h3>
            <quill-editor :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)" />
			<h3>Изображения</h3>
			<div class="images">
                <gallery :images="parseJSONimages(editFields.images)" :edit="edit" @imagesChanged="updateImages" />
            </div>
			<h3>Предстоящие занятия</h3>
			<div class="canOpenWrapper">
				<lection v-for="lesson, index in nextLessons" :key="index" :content="lesson" />
				<div v-if="!nextLessons || !nextLessons.length">В данный момент занятий нет</div>
			</div>
			<addLectionForm></addLectionForm>
        </section>

        <section class="small">
			<h3>Логотип</h3>
			<photoSelect :content="editFields.logo" @save="updateLogo" />

			<div class="prepods">
				<h3>Преподаватели</h3>
				<user_prev v-for="(prepod, index) in disPrepods" :id="prepod" :key="index" />
				<div v-if="!dis.prepods">В данный момент преподавателей нет</div>
			</div>
        </section>

    </article>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import Quill from 'vue-quill-editor'
import flatPickr from 'vue-flatpickr-component'
import gallery from '@/components/gallery.vue'
import user_prev from '@/components/user_prev.vue'
import prepod_select from '@/components/prepod_select.vue'
import photoSelect from '@/components/photoSelect.vue'
import lection from '@/components/lection.vue'
import addLectionForm from '@/components/addLectionForm.vue'
import regForm from '@/components/regForm.vue'
import recordedUsers from '@/components/recordedUsers.vue'
import mixins from '@/components/mixins.vue'


export default {
    data() {
        return {
			editFields: {},
			lessonFilterLocal: {
				date: "",
				showAll: false
			}
        }
    },
	mixins: [mixins],
    computed: {
        ...mapGetters([
            'disciplines',
			'edit',
			'quillOptions',
			'currentDiscipline',
			'lessons',
			'FPRange',
			'lessonFilter',
			'isAdmin'
        ]),
		dis () {
			let data = this.disciplines.find(el => el.id == this.$route.params.id) || {}
			this.editFields = Object.assign({
				images: []
			}, data)
			if (data.images) this.editFields.images = JSON.parse(data.images)
			return data
		},
		imagesUrls () {
			return this.editFields.images.join("\n")
		},
		filtredLessons(){
			if (!this.lessonFilter || !this.lessonFilter.date) return -1
			return this.lessons.filter(lesson => {
				if (lesson.id_cource != this.dis.id) return
				let { date: dates } = this.lessonFilter
				if (dates.length == 1) return new Date(dates[0]).valueOf() < new Date(lesson.date).valueOf()
				if (new Date(dates[0]).valueOf() < new Date(lesson.date).valueOf() && new Date(dates[1]).valueOf() > new Date(lesson.date).valueOf()) return !0
				return
			})
		},
		nextLessons(){
			if (this.filtredLessons != -1) return this.filtredLessons
			return this.lessons ? this.lessons.filter(el => el.id_cource == this.dis.id && new Date().valueOf() < new Date(el.date).valueOf() ) : []
		},
		disPrepods(){
			if (!this.dis.prepods) return []
			return JSON.parse(this.dis.prepods).filter(el => el)
		},
		dateFilterConfig(){
			return Object.assign({
				onChange: (date) => this.updateLessonFilter({ date })
			}, this.FPRange)
		}
    },
    components: {
        user_prev,
        gallery,
        Quill,
		prepod_select,
		photoSelect,
		lection,
		addLectionForm,
		regForm,
		flatPickr,
		recordedUsers
    },
    methods: {
        ...mapActions([
            'getDiscipline',
			'remove',
			'alert',
			'updateCource',
			'getLectionsByCource',
			'updateLessonFilter'
        ]),
        onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.description = html
        },
		deleteCource(id){
			this.remove({
				type: 'cource',
				id
			})
		},
		updateImages(newData){
			this.editFields.images = JSON.stringify(newData)
		},
		updateLogo(newData){
			this.editFields.logo = newData
		}
    },
    created() {
        this.getDiscipline( this.$route.params.id )
		this.getLectionsByCource( this.$route.params.id )
    }
}
</script>

<style lang="less">

@import url('../../node_modules/flatpickr/dist/flatpickr.css');

.disciplineWrapper {
	> .button {
		display: inline;
		text-align: center;
		margin-left: 20%;
	}
	padding-bottom: 20px;
}

.edit {
	.images {
		width: 100%;
	}
	.photoB {
		width: 100%;
	}
	.logo {
		width: 100%;
	}
	input {
		width: 100%;
		box-sizing: border-box;
	}
}

.discipline {
    box-sizing: border-box;
    display: grid;
    grid-gap: 20px;
    grid-template: "big small" auto ~"/" 65% 35%;
    .photoS {
        display: none;
        text-align: center;
        max-width: 100%;
        img {
            margin: 0 auto;
        }
    }
	.photoB {
		img {
			width: 100%;
		}
	}
    .prepods {
        display: grid;
        grid-gap: 20px;
    }
	.canOpenWrapper {
		width: 100%;
		min-width: 450px;
		padding: 10px;
		background: #fff;
		box-sizing: border-box;
	}
	.lessonsFilter {
		background: #fff;
		padding: 20px;
		box-sizing: border-box;
		h4 {
			margin: 5px 0;
		}
		input {
			width: 100%;
			box-sizing: border-box;
		}
	}
}
@media (max-width: 1100px) {
    .discipline {
        grid-template: "big" auto "small" auto ~"/" 60% 40%;
    }
}
@media (max-width: 800px) {
    .discipline {
		display: block;
        .photoB {
            display: none;
        }
        .photoS {
            display: block;
        }
        .images .gallery {
            grid-template-columns: repeat(2, 1fr);
        }
		.canOpenWrapper {
			min-width: inherit;
		}
    }
}
</style>
