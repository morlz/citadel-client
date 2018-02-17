<template>
<div class="disciplineWrapper">

	<regForm />
	<recordedUsers />

    <article class="discipline" v-if="!edit">

        <section class="big">
            <h2 class="title"> {{ dis.title }} </h2>
            <div class="photoS">
				<mz-image v-model="dis.logo"/>
			</div>
            <div class="content" v-html="dis.description"></div>
            <div class="images">
                <gallery :images="parseJSONimages(dis.images)" :edit="edit" />
            </div>

			<h3>Занятия</h3>
			<lessons :cource-id="dis.id" />
        </section>

        <section class="small">
            <div class="photoB">
				<mz-image v-model="dis.logo"/>
			</div>
            <div class="prepods">
                <h3>Преподаватели</h3>
                <user_prev v-for="(prepod, index) in disPrepods" :id="prepod" :key="index" />
				<div v-if="!dis.prepods">В данный момент преподавателей нет</div>
            </div>
			<h3>Фильтр занятий</h3>
			<div class="lessonsFilter mather">
				<h4>По дате</h4>
				<p>Все занятия в выбраном промежутке</p>
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

			<h3>Занятия</h3>
			<lessons :cource-id="dis.id" />
        </section>

        <section class="small">
			<h3>Логотип</h3>
			<mz-image v-model="editFields.logo" edit/>

			<div class="prepods">
				<h3>Преподаватели</h3>
				<user_prev v-for="(prepod, index) in disPrepods" :id="prepod" :key="index" />
				<div v-if="!dis.prepods">В данный момент преподавателей нет</div>
			</div>
			<h3>Фильтр занятий</h3>
			<div class="lessonsFilter mather">
				<h4>По дате</h4>
				<p>Все занятия в выбраном промежутке</p>
				<flat-pickr v-model="lessonFilterLocal.date" :config="dateFilterConfig" />
				<label v-if="isAdmin && false">
					<input type="checkbox" v-model="lessonFilterLocal.showAll">
					Отображать все
				</label>
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
import regForm from '@/components/regForm.vue'
import recordedUsers from '@/components/recordedUsers.vue'
import mixins from '@/components/mixins.vue'
import lessons from '@/components/lessons.vue'
import MzImage from '@/components/MzImage.vue'

export default {
    data() {
        return {
			editFields: {},
			lessonFilterLocal: {
				date: "",
				showAll: false
			},
			currentLessonTab: 0
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
		MzImage,
		regForm,
		flatPickr,
		recordedUsers,
		lessons
    },
    methods: {
        ...mapActions([
            'getDiscipline',
			'remove',
			'alert',
			'updateCource',
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
		}
    },
    created() {
        this.getDiscipline( this.$route.params.id )
    }
}
</script>

<style lang="less">

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
