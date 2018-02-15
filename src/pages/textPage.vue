<template>
	<div class="textPageWrapper">
		<article v-if="!edit">
			<h2>{{data.title}}</h2>
			<div class="content" v-html="data.content"></div>
			<gallery class="allImages" :images="parseJSONimages(data.images)" :edit="edit" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />

			<template v-if="isHome && news.length">
				<h2>Новости</h2>
				<centerNews :content="news" />
			</template>

		</article>

		<article v-if="edit && data" class="edit">
			<div class="adminButton">
				<div class="button" @click="updatePage(editFields)">Сохранить изменения</div>
			</div>
			<input type="text" v-model="editFields.title" class="title">
			<quill-editor :content="editFields.content" :options="quillOptions" @change="onEditorChange($event)" />
			<gallery class="allImages" :images="parseJSONimages(editFields.images)" :edit="edit" @imagesChanged="updateImages" :perpage="perPageIamagesCount" />

			<template v-if="isHome && news.length">
				<h2>Новости</h2>
				<centerNews :content="news" />
			</template>
		</article>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import mixins from '@/components/mixins.vue'
import gallery from '@/components/gallery.vue'
import centerNews from '@/components/centerNews.vue'

export default {
	props: ['id'],
	components: {
		gallery,
		centerNews
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
	mixins: [mixins],
	watch: {
		id (newVal) {
			this.setCurrent(newVal)
		}
	},
	computed: {
		...mapGetters([
			'currentPage',
			'edit',
			'quillOptions',
			'allCenterNews'
		]),
		data () {
			let page = this.currentPage
			this.editFields = Object.assign({}, page)
			return page
		},
		isHome () {
			return this.id == 2
		},
		news () {
			return this.allCenterNews || []
		}
	},
	methods: {
		...mapActions([
			'setCurrent',
			'updatePage',
			'getAllNews'
		]),
		onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.content = html
        },
		updateImages (n) {
			this.editFields.images = JSON.stringify(n)
		}
	},
	mounted () {
		this.setCurrent(this.$route.params.id || this.id)
		this.getAllNews()
	}
}
</script>


<style lang="less">
	.textPageWrapper {
		width: 100%;
		box-sizing: border-box;
	}
</style>
