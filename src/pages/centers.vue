<template>
<div class="centersWrapper">
    <article class="center" v-if="!edit">
        <h2 class="title"> {{data.title}} </h2>

        <div class="photo">
			<mz-image v-model="data.logo"/>
		</div>

        <div class="content" v-html="data.description"></div>

        <div class="images">
            <gallery :images="parseJSONimages(data.images)" :edit="edit" @imagesChanged="updateImages" :perpage="perPageIamagesCount"></gallery>
        </div>

        <h3>Контакты</h3>
        <div class="contacts">
            <div class="textWrapper">
                <div class="phone">{{data.phone}}</div>
                <div class="email">{{data.email}}</div>
                <div class="location">{{data.address}}</div>
            </div>
            <div class="map" v-html="data.map"/>
        </div>

        <h3>Курсы</h3>
        <div class="couces mather" v-if="centerCources.length">
			<cources-list :content="centerCources"/>
        </div>
		<div v-else="centerCources.length">В данный момент курсов нет</div>

        <h3>Преподaватели</h3>
        <div class="prepods">
            <user_prev v-for="(prepod, index) in centerPrepods" :key="index" width="300px" :user="prepod"></user_prev>
            <div v-if="!centerPrepods.length">В данный момент преподавателей нет</div>
        </div>

		<h3>Новости центра</h3>
		<centerNews :content="centerNews" :open="openNew" />
    </article>

    <article class="center edit" v-if="edit && data">
        <div class="adminButton">
            <div class="button" @click="removeCenter(data.id)">Удалить центр</div>
            <div class="button" @click="updateCenter(editFields)">Сохранить изменения</div>
        </div>
        <input type="text" class="title" v-model="editFields.title">
		<mz-image v-model="editFields.logo" edit/>
        <quill-editor :content="editFields.description" :options="quillOptions" @change="onEditorChange($event)" />

        <div class="images">
            <gallery :images="parseJSONimages(editFields.images)" :edit="edit" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />
        </div>

        <h3>Контакты</h3>
        <div class="contacts">
            <div class="textWrapper">
                Телефон:
                <input type="text" v-model="editFields.phone" placeholder="phone"> Email:
                <input type="text" v-model="editFields.email" placeholder="email"> Адресс:
                <input type="text" v-model="editFields.address" placeholder="address">
            </div>
            <input type="text" class="map" v-model="editFields.map">
        </div>

        <h3>Курсы</h3>
        <div class="couces mather" v-if="centerCources.length">
            <cources-list :content="centerCources"/>
        </div>

		<div v-else="centerCources.length">В данный момент курсов нет</div>

        <h3>Преподaватели</h3>
        <div class="prepods">
            <user_prev v-for="(prepod, index) in centerPrepods" :key="index" width="300px" :user="prepod" />
        </div>

		<h3>Новости центра</h3>
		<centerNews :content="centerNews" :open="openNew" />

		<addNewsForm />
    </article>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import Quill from 'vue-quill-editor'
import user_prev from '@/components/user_prev.vue'
import canopen from '@/components/canOpen.vue'
import MzImage from '@/components/MzImage.vue'
import gallery from '@/components/gallery.vue'
import mixins from '@/components/mixins.vue'
import centerNews from '@/components/centerNews.vue'
import addNewsForm from '@/components/addNewsForm.vue'
import CourcesList from '@/components/CourcesList.vue'


/*
<iframe
	src="https://yandex.ru/map-widget/v1/?um=constructor%3A782964a15eeec93eeba837866f7c79bbe8644009a137fe36c714024c81f55789&amp;source=constructor"
	width="100%"
	height="400"
	frameborder="0"
>
</iframe>
*/

export default {
	components: {
		user_prev,
		Quill,
		canopen,
		MzImage,
		gallery,
		centerNews,
		addNewsForm,
		CourcesList
	},
    data() {
        return {
            editFields: {},
            perPageIamagesCount: [
                [500, 2],
                [650, 3],
                [820, 3],
                [1030, 4],
                [1250, 5],
                [1300, 5],
                [1800, 6]
            ]
        }
    },
	props: ['openNew'],
    mixins: [mixins],
    computed: {
        ...mapGetters([
            'currentCenter',
            'disciplines',
            'prepods',
            'edit',
            'quillOptions',
            'currentCenterPrepods',
			'allCenterNews'
        ]),
        data() {
            let data = this.currentCenter
            this.editFields = Object.assign({}, data)
            return data
        },
        centerCources() {
            return this.disciplines.filter(el => el.id_center == this.currentCenter.id)
        },
        centerPrepods() {
            return this.currentCenterPrepods
        },
        filtredPrepods() {
            return this.prepods.filter(prepod => this.data.id_workers ? this.data.id_workers.indexOf(prepod.id) + 1 : false)
        },
		centerNews(){
			return this.allCenterNews.filter(el => el.center_id == this.editFields.id || el.center_id == null)
		},
		currentCenterId () {
			return this.$router.params.id
		}
    },
    methods: {
        ...mapActions([
            'getCenter',
            'getUsers',
            'getCenterCources',
            'updateCenter',
            'remove',
            'getCenterPrepods',
			'getCenterNews'
        ]),
        onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.description = html
        },
        updateImages(newData) {
            this.editFields.images = JSON.stringify(newData)
        },
        removeCenter(id) {
            this.remove({
                type: 'center',
                id
            })
        }
    },
    mounted() {
        this.getCenter(this.$route.params.id)
        this.getCenterCources(this.$route.params.id)
        this.getCenterPrepods(this.$route.params.id)
		this.getCenterNews(this.$route.params.id)
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
        > .contacts {
            display: grid;
            grid-template: "t m" ~"/" 50% 50%;
            .textWrapper {
                box-sizing: border-box;
                padding: 20px;
                line-height: 28px;
                > div {
                    padding: 8px 10px 8px 60px;
                    margin: 10px 0;
                    min-height: 20px;
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
            > .contacts {
                grid-template: "t" "m" ~"/" 100%;
            }
        }
    }
}
</style>
