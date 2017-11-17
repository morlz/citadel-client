<template>
	<div class="reg mather">
		<div class="title">{{ data.lesson.title }}</div>
		<div class="description">
			Дата и время занятия: {{ data.lesson.date }} <br>
			Цена: {{ data.lesson.price }}
		</div>
		<div class="status">
			Статус: {{ data.status.title }}
		</div>
		<div class="buttons">
			<div class="buttonTRb" @click="removeRecordUser({ id: data.id, id_lesson: data.lesson.id })" v-if="new Date(data.lesson.date).valueOf() > new Date().valueOf()">Отменить</div>
			<div class="buttonTRb">Оплатить</div>
			<router-link class="buttonTRb" :to="{ path: `/cource/${data.lesson.id_cource}` }">Подробнее о курсе</router-link>
		</div>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'

export default {
	props: ['content'],
	data () {
		return {}
	},
	components: {},
	computed: {
		data () {
			let data = this.content || {}

			this.editFields = Object.assign({}, data)
			return data
		}
	},
	methods: {
		...mapActions([
			'removeRecordUser'
		])
	}
}
</script>

<style lang="less">
.reg {
	padding: 20px;
	background: #fff;
	.title {
		margin: 10px 0;
		color: #444;
		font-size: 24px;
		font-weight: 400;
		line-height: 20px;
	}
	.buttons {
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
	}
}
</style>
