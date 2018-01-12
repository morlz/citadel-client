<template>
<div class="addNewsFromWrapper">
    <h3>Добавить новость</h3>
    <div class="mather addNewsForm">
		<h4>Название</h4>
        <input type="text" class="title" placeholder="Название" v-model="editFields.title">
		<h4>Центр</h4>
		<div class="center" @click="editFields.center_id = !editFields.center_id">{{ editFields.center_id ? 'Только для текущего' : 'Для всех центров'}}</div>
		<h4>Содержание</h4>
        <quill-editor :content="editFields.content" :options="quillOptions" @change="onEditorChange($event)" />
		<gallery class="allImages" :images="parseJSONimages(editFields.images)" :edit="true" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />
		<div class="buttonTRb addButton" @click="addNewsHandler">Добавить</div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import mixins from '@/components/mixins.vue'
import gallery from '@/components/gallery.vue'


export default {
    data() {
        return {
            editFields: {
                title: "",
                content: "",
                center_id: true,
				images: "[]"
            },
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
	mixins: [mixins],
    components: {
		gallery
	},
    computed: {
        ...mapGetters([
            'quillOptions',
			'currentCenter',
			'FP'
        ])
    },
    methods: {
		...mapActions([
			'addNews'
		]),
        onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.content = html
        },
		addNewsHandler () {
			let data = Object.assign({}, this.editFields)
			data.center_id = data.center_id ? this.currentCenter.id : null
			this.addNews(data)
		},
		updateImages (n) {
			this.editFields.images = JSON.stringify(n)
		}
    }
}
</script>

<style lang="less">

.addNewsForm {
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    .title {
        margin-top: 0;
    }
	.center {
		padding: 10px;
		border: 1px solid #448aff;
		cursor: pointer;
	}
    .dur {
        margin-bottom: 30px;
    }
	.addButton {
		text-align: right;
	}
}
</style>
