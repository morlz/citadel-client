<template>
	<div class="textPageWrapper">
		<article v-if="!edit">
			<h2>{{data.title}}</h2>
			<div class="content" v-html="data.content"></div>
		</article>

		<article v-if="edit && data" class="edit">
			<div class="adminButton">
				<div class="button" @click="updatePage(editFields)">Сохранить изменения</div>
			</div>
			<input type="text" v-model="editFields.title" class="title">
			<quill-editor :content="editFields.content" :options="quillOptions" @change="onEditorChange($event)"></quill-editor>
		</article>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'


export default {
	props: ['id'],
	data() {
		return {
			editFields: {}
		}
	},
	watch: {
		id (newVal) {
			this.setCurrent(newVal)
		}
	},
	computed: {
		...mapGetters([
			'currentPage',
			'edit',
			'quillOptions'
		]),
		data () {
			let page = this.currentPage
			this.editFields = Object.assign({}, page)
			return page
		}
	},
	methods: {
		...mapActions([
			'setCurrent',
			'updatePage'
		]),
		onEditorChange({
            editor,
            html,
            text
        }) {
            this.editFields.content = html
        }
	},
	mounted () {
		this.setCurrent(this.$route.params.id || this.id)
	}
}
</script>


<style lang="less">
	.textPageWrapper {
		width: 100%;
		box-sizing: border-box;
	}
</style>
