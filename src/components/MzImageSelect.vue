<template>
	<div class="photoSelect mather">
		<div class="tabs">
			<div class="url buttonTR" @click="thisTab = 'url'" :class="{selected: thisTab == 'url'}">URL</div>
			<div class="fileLoad buttonTR" @click="thisTab = 'file'" :class="{selected: thisTab == 'file'}">File</div>
		</div>

		<div class="content">
			<input type="file" @change="changeFile" v-show="thisTab == 'file'">
			<input type="text" v-model="localUrl" v-show="thisTab == 'url'" placeholder="Image url">
		</div>

		<img :src="formatedPreviwUrl" alt="Предпросмотр" v-show="formatedPreviwUrl" class="preview" id="c">

		<div class="buttonTRb" v-if="addbtn" @click="save">Добавить</div>
	</div>
</template>

<script>


export default {
	props: ['content', 'addbtn'],
    data() {
        return {
            thisTab: "url",
			localUrl: "",
			previewSrc: ""
        }
    },
	computed: {
		formatedPreviwUrl () {
			// index === 0
			// найдено на 1 позиции
			if (!this.previewSrc.indexOf('src="'))
				return this.previewSrc.substr(5, this.previewSrc.length - 6)

			return this.previewSrc
		}
	},
	methods: {
		changeFile (e) {
			let fr = new FileReader()
			fr.addEventListener('load', this.setDataUrl)
			fr.addEventListener('error', content => this.$store.dispatch('alert', { content }))
			fr.readAsDataURL(e.target.files[0])
		},
		save () {
			this.$emit("save", this.localUrl)
			if (this.addbtn) this.localUrl = ''
		},
		setDataUrl (e) {
			if (!e.target || !e.target.result)
				return this.$store.dispatch('alert', { content: "Ошибка кодирования файла" })

			this.localUrl = `src="${e.target.result}"`
		}
	},
	watch: {
		localUrl (newVal) {
			this.previewSrc = newVal
			if (!this.addbtn) this.save()
		},
		content (newVal) {
			this.localUrl = this.content
		}
	},
    mounted() {
		this.localUrl = this.content
    }
}
</script>

<style lang="less">
	.photoSelect {
		padding: 10px;
		background: #fff;
		text-align: center;
		.url {
			border-right: 1px solid #e1e1e1;
		}
		.tabs {
			height: 40px;
			display: grid;
			grid-auto-flow: column;
			justify-items: stretch;
			align-items: stretch;
			> div {
				border-bottom: 1px solid transparent;
			}
			.selected {
				border-bottom: 1px solid #448aff;
			}
			.fileLoad {
				//opacity: 0.3;
				//cursor: default;
			}
		}
		.content {
			padding: 10px;
			width: 100%;
			box-sizing: border-box;
			margin-top: 5px;
			> input {
				box-sizing: border-box;
				width: 100%;
			}
		}
		.buttonTRb {
			text-align: right;
		}
		.preview {
			width: 100%;
			box-sizing: border-box;
			padding: 10px;
		}
	}
</style>
