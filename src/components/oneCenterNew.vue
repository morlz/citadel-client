<template>
	<div >
		<router-link class="newWrapper" :to="{ path: `/centers/${$route.params.id}/${data.id}` }">
			<div class="new mather" :style="{ 'background-image': getBackgroundImage() }">
				<h3 class="title">{{data.title}}</h3>
			</div>
		</router-link>
		<div class="full mather" :class="{ open }" v-if="!(edit || localEdit)">
			<h2 class="title">{{data.title}}</h2>
			<div class="contentWrapper">
				<div class="content" v-html="data.content"></div>
				<gallery class="allImages" :images="parseJSONimages(data.images)" :edit="edit || localEdit" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />
			</div>
			<div class="buttons" v-if="isAdmin">
				<div class="buttonTRb" @click="localEdit = true">Редактироваить</div>
				<div class="buttonTR">Удалить</div>
			</div>
		</div>
		<div class="full mather edit" :class="{ open }" v-else="!(edit || localEdit) && data">
			<input type="text" class="title" v-model="editFields.title" placeholder="Название">
			<div class="contentWrapper">
				<quill-editor :content="editFields.content" :options="quillOptions" @change="onEditorChange($event)" class="content" />
				<gallery class="allImages" :images="parseJSONimages(editFields.images)" :edit="edit || localEdit" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />
			</div>
			<div class="buttons" v-if="isAdmin">
				<div class="buttonTRb">Сохранить</div>
				<div class="buttonTRb" @click="localEdit = false">Отменить</div>
				<div class="buttonTR">Удалить</div>
			</div>
		</div>
	</div>
</template>

<script>
import mixins from '@/components/mixins.vue'
import gallery from '@/components/gallery.vue'
import {
	mapGetters
} from 'vuex'
//import TWEEN from 'tweenjs/tween.js/src/Tween.js'

export default {
    props: ['content', 'open'],
    mixins: [mixins],
	components: {
		gallery
	},
    data() {
        return {
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
		editFields(a) {
			console.log(a);
		}
	},
	computed: {
		...mapGetters([
			'edit',
			'isAdmin',
			'quillOptions'
		]),
		data () {
			let data = this.content
            this.editFields = Object.assign({}, data)
            return data
		}
	},
    methods: {
        getBackgroundImage() {
            let images = this.parseJSONimages(this.content.images)
            if (!images.length) return 'none'
            return `url('${images[ Math.round(Math.random() * (images.length - 1)) ]}')`
        },
		updateImages (n) {
			console.log(n);
			this.editFields.images = n
		},
		onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.content = html
        },
    }
}
</script>

<style lang="less" scoped>
.newWrapper {
    text-decoration: none;
    .new {
        transition: all 0.3s ease-in-out;
        background-size: cover;
        background-color: #fff;
        background-position: center;
        padding-top: 200px;
        .title {
            margin: 0;
            padding: 10px;
            color: #fff;
            font-size: 24px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 60%, transparent);
        }
    }
}
.full {
	position: fixed;
	width: 90%;
	height: 90%;
	top: 5%;
	left: 5%;
	background: #fff;
	z-index: 26;
	opacity: 0;
	pointer-events: none;
	transition: all 0.3s ease-in-out;
	padding: 20px;
	box-sizing: border-box;
	display: grid;
	grid-template-rows: minmax(80px, auto) minmax(80px, 100%) 20px;
	align-content: flex-start;
	.title {
		margin: 10px;
	}
	.contentWrapper {
		overflow-y: scroll;
		.content {
			padding: 10px 20px;
		}
		.allImages {
			width: ~"calc(100% - 20px)";
		}
	}
	.buttons {
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
	}
}
.open {
	opacity: 1;
	pointer-events: all;
}
</style>
