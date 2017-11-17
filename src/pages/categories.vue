<template>
	<div class="centersWrapper">
	    <article class="center" v-if="!edit && data">
	        <h2 class="title"> {{data.title}} </h2>
	        <div class="content" v-html="data.description"></div>

	        <h3>Курсы</h3>
	        <div class="couces mather" v-if="categoryCources && categoryCources.length">
				<canopen v-for="(cource, index) in categoryCources" :content="cource" :key="index"></canopen>
	        </div>
			<div v-if="!categoryCources || !categoryCources.length">В данный момент курсов нет</div>
	    </article>

		<article class="center edit" v-if="edit && data">
			<div class="adminButton" v-if="isAdmin">
				<div class="button" @click="removeCategory(data.id)">Удалить категорию</div>
				<div class="button" @click="updateCat(data.id)">Сохранить изменения</div>
			</div>
			<input type="text" class="title" v-model="editFields.title">
			<quill-editor :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)"></quill-editor>

			<h3>Курсы</h3>
	        <div class="couces mather" v-if="categoryCources && categoryCources.length">
				<canopen v-for="(cource, index) in categoryCources" :content="cource" :key="index"></canopen>
	        </div>
			<div v-if="!categoryCources || !categoryCources.length">В данный момент курсов нет</div>

			<div class="adminButton" v-if="isAdmin">
				<div class="button" @click="addDiscipline(data.id)">Добавить курс</div>
			</div>
		</article>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import canopen from '@/components/canOpen.vue'

export default {
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
    components: {
		canopen
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

.edit {
	.quill-editor {
		margin-top: 20px;
	}
	.contacts {
		.textWrapper {
			input {
				width: 100%;
			}
		}
	}
}

.centersWrapper {
    .center {
		box-sizing: border-box;
        .photo {
            img {
                width: 100%;
            }
        }
        .contacts {
            display: grid;
            grid-template: "t m"
						~"/" 50% 50%;
			.textWrapper {
				box-sizing: border-box;
				padding: 20px;
				line-height: 28px;
				> div {
					padding: 8px 60px;
					margin: 10px 0;
				}
			}
            .map > * {
                width: 100%;
            }
        }
		.couces {
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			padding: 10px;
		}
		.prepods {
			width: 100%;
			display: grid;
			grid-gap: 20px;
			justify-content: space-around;
			grid-template-columns: repeat(auto-fill, 300px);
			.prepod {
				width: 300px;
				background: #fff;
				text-decoration: none;
				.photo {
					width: 300px;
					height: 300px;
					background-position: 50% 0;
					background-size: cover;
				}
				.name {
					margin: 15px 0;
					font-size: 26px;
			        line-height: 26px;
			        padding: 10px;
					text-align: center;
					white-space: nowrap;
				}
			}
		}
    }
}

@media (max-width: 800px) {
	.centersWrapper {
		.center {
			.contacts {
				grid-template: 	"t"
								"m"
							~"/" 100%;
			}
		}
	}
}
</style>
