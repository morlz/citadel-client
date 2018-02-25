<template>
	<div class="new">
		<router-link class="new__link" :to="{ path: `/centers/${centerId}/${data.id}` }">
			<div class="new__bg mather" :style="bgStyle"/>
			<h3 class="new__title">{{data.title}}</h3>
		</router-link>

		<modal v-model="modalOpen" v-if="!(edit || localEdit)" @input="iHandler">
			<div slot="header">{{data.title}}</div>

			<div v-html="data.content"/>
			<gallery class="allImages" :images="parseJSONimages(data.images)" :edit="edit || localEdit" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />

			<template v-if="isAdmin" slot="buttons">
				<div class="buttonTRb" @click="localEdit = true">Редактироваить</div>
				<div class="buttonTR" @click="removeNew(data.id)">Удалить</div>
			</template>
		</modal>

		<modal v-model="modalOpen" v-else="!(edit || localEdit) && data">
			<div slot="header">
				<input type="text" class="title" v-model="editFields.title" placeholder="Название">
			</div>

			<quill-editor :content="editFields.content" :options="quillOptions" @change="onEditorChange($event)" class="content" />
			<gallery class="allImages" :images="parseJSONimages(editFields.images)" :edit="edit || localEdit" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />

			<template v-if="isAdmin" slot="buttons">
				<div class="buttonTRb" @click="updateNewsHandler">Сохранить</div>
				<div class="buttonTRb" @click="localEdit = false">Отменить</div>
				<div class="buttonTR" @click="removeNew(data.id)">Удалить</div>
			</template>
		</modal>
	</div>
</template>

<script>
import {
	mapGetters,
	mapActions
} from 'vuex'
import mixins from '@/components/mixins.vue'
import gallery from '@/components/gallery.vue'
import Modal from '@/components/Modal.vue'
//import TWEEN from 'tweenjs/tween.js/src/Tween.js'

export default {
    props: {
		content: {},
		open: {
			type: Boolean,
			default: a => false
		}
	},
    mixins: [mixins],
	components: {
		gallery,
		Modal
	},
    data() {
        return {
			modalOpen: false,
			localEdit: false,
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
	watch: {
		open (n) {
			this.modalOpen = n
		}
	},
	computed: {
		...mapGetters([
			'edit',
			'isAdmin',
			'quillOptions',
			'centers'
		]),
		data () {
			let data = this.content
            this.editFields = Object.assign({}, data)
            return data
		},
		centerId () {
			return this.data.center_id || (this.centers && this.centers[0] ? this.centers[0].id : 1)
		},
		bgStyle () {
			return {
				backgroundImage: this.getBackgroundImage()
			}
		}
	},
    methods: {
		...mapActions([
			'updateNew',
			'remove'
		]),
        getBackgroundImage() {
            let images = this.parseJSONimages(this.content.images)
            if (!images.length) return 'none'
            return `url('${images[ Math.round(Math.random() * (images.length - 1)) ]}')`
        },
		updateImages (n) {
			this.editFields.images = JSON.stringify(n)
		},
		onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.content = html
        },
		updateNewsHandler(){
			this.updateNew(this.editFields)
			this.localEdit = false
		},
        removeNew(id) {
            this.remove({
                type: 'news',
                id,
				to: `/centers/${centerId}`
            })
        },
		iHandler (e) {
			if (e) return
			router.push(`/centers/${this.centerId}`)
		}
    },
	mounted () {
		this.modalOpen = this.open
	}
}
</script>

<style lang="less">
.new {
	width: 100%;
	height: 100%;
	&__link {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: grid;
		align-content: end;
		height: 250px;
		position: relative;
		text-decoration: none;
	}

	&__bg {
		transition: all 0.3s ease-in-out;
		background-size: cover;
		background-color: #fff;
		background-position: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	&__title {
		position: relative;
		margin: 0;
		padding: 10px;
		color: #fff;
		font-size: 24px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 60%, transparent);
	}
}
</style>
