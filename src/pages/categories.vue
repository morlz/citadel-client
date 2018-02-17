<template>
	<div class="category" :class="{ 'category-edit': edit }">
	    <article class="category__content" v-if="!edit && data">
	        <h2 class="category__title"> {{data.title}} </h2>
	        <div class="category__description" v-html="data.description"/>

	        <h3>Курсы</h3>
	        <div class="category__couces mather" v-if="categoryCources && categoryCources.length">
				<cources-list :content="categoryCources"/>
	        </div>

			<div v-if="!categoryCources || !categoryCources.length">В данный момент курсов нет</div>
	    </article>

		<article class="category__content" v-if="edit && data">
			<div class="adminButton" v-if="isAdmin">
				<div class="button" @click="removeCategory(data.id)">Удалить категорию</div>
				<div class="button" @click="updateCat(data.id)">Сохранить изменения</div>
			</div>

			<input type="text" class="category__title" v-model="editFields.title">
			<quill-editor :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)" class="category__description"/>

			<h3>Курсы</h3>
	        <div class="category__couces mather" v-if="categoryCources && categoryCources.length">
				<cources-list :content="categoryCources"/>
	        </div>

			<div v-if="!categoryCources || !categoryCources.length">В данный момент курсов нет</div>

			<div class="adminButton" v-if="isAdmin">
				<div class="button" @click="addDiscipline(data.id)">Добавить курс</div>
			</div>
		</article>
	</div>
</template>

<script>
//<canopen v-for="(cource, index) in categoryCources" :content="cource" :key="index" />
import {
    mapActions,
    mapGetters
} from 'vuex'
import canopen from '@/components/canOpen.vue'
import CourcesList from '@/components/CourcesList.vue'

export default {
	components: {
		canopen,
		CourcesList
	},
    data() {
        return {
            editFields: {}
        }
    },
    computed: {
        ...mapGetters([
            'currentCategory',
            'disciplines',
			'edit',
			'quillOptions',
			'isAdmin'
        ]),
        data() {
            let data = this.currentCategory || {}

            this.editFields = Object.assign({}, data)
            return data
        },
        categoryCources() {
            return this.disciplines.filter(dis => dis.category == this.$route.params.id) || []
        }
    },
    methods: {
        ...mapActions([
            'getCategory',
			'getDisciplinesByCat',
			'remove',
			'updateCategory',
			'addDiscipline'
        ]),
		updateCat () {
			this.updateCategory(this.editFields)
		},
        onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.description = html
        },
		removeCategory(id){
			this.remove({
				type: 'category',
				id
			})
		}
    },
    mounted() {
        this.getCategory( this.$route.params.id )
		this.getDisciplinesByCat( this.$route.params.id )
    }
}
</script>

<style lang="less" scoped>

.category {
	&__title {
		width: 100%;
		margin-bottom: 10px;
	}

	&__couces {
		background: #fff;
		padding: 20px;
	}

	&-edit {
		.category__title {
			margin-top: 20px;
			font-size: 24px;
		}
		.quill-editor {
			margin-top: 20px;
		}
	}
}

</style>
