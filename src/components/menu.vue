<template>
	<div class="menu">
		<div class="menuItem" v-for="(item, index) in menu" v-if="!item.hide">
			<router-link :to="{ path: item.path }" v-if="item.path">{{ item.name }}</router-link>
			<div class="linkEmitor" v-else="item.path">{{ item.name }}</div>
			<router-link
				class="childItems"
				v-for="(childItem, childIndex) in item.childs"
				v-if="childItem.path"
				:to="{ path: childItem.path, params: childItem.params }"
				:key="childIndex"
				>
				{{ childItem.name }}
			</router-link>
			<div
				class="linkEmitor childItems"
				v-for="(childItem, childIndex) in item.childs"
				v-if="!childItem.path"
				@click="childItem.click"
				>{{ childItem.name }}</div>
		</div>
	</div>
</template>

<script>

import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters([
			'centers',
			'categories',
			'isAdmin'
		]),
		menu () {
			return [
				{
					name: "О Центре",
					path: "/"
				},
				{
					name: "Учебные площадки",
					childs: this.plChilds
				},
				{
					name: "Курсы",
					childs: this.catChilds
				},
				{
					name: "Условия работы",
					path: "/work"
				},
				{
					name: "Реквизиты",
					path: "/recs"
				},
				{
					name: "GOD",
					hide: !this.isAdmin,
					childs: [
						{
							name: "Пользователи",
							path: "/users/"
						},
						{
							name: "Занятия",
							path: "/allLessons/"
						}
					]
				}
			]
		},
		plChilds () {
			return this.format( "centers", this.centers )
		},
		catChilds () {
			return this.format( "cat", this.categories )
		}
	},
	methods: {
		...mapActions([
			'getCenters',
			'getCategories'
		]),
		format (type, items) {
			let formated = items.map(item => {
				return {
					name: item.title,
					path: `/${type}/${item.id}`
				}
			})

			if (this.isAdmin) formated.push({
				name: "Добавить",
				click: () => {
					this.add({
						type,
						title: 'New ' + type
					})
				}
			})
			return formated
		},
		add(type) {
			this.$store.dispatch("add", type)
		}
	},
	mounted () {
		this.getCenters()
		this.getCategories()
	}
}
</script>

<style lang="less">
	.menu {
		width: 100%;
		display: grid;
		grid-auto-flow: column;
		align-items: baseline;
		grid-gap: 30px;
		justify-content: center;
		height: 40px;
		.menuItem {
			position: relative;
			text-align: center;
			padding: 10px;
			color: #707070;
			font-size: 14px;
			height: 40px;
			box-sizing: border-box;
			align-items: center;
			transition: all 0.3s ease-in-out;
			display: grid;
			justify-items: stretch;

			.linkEmitor:not(:first-child) {
				user-select: none;
				pointer-events: none;
				opacity: 0;
				transition: all 0.3s ease-in-out;
				cursor: pointer;
				z-index: 10;
			}

			.linkEmitor:first-child {
				cursor: default;
				margin-bottom: 10px;
				user-select: none;
			}

			a {
				color: #707070;
				text-decoration: none;
				transition: all 0.3s ease-in-out;
				z-index: 10;
				&:hover {
					color: #448AFF;
				}
				&:first-child {
					margin-bottom: 10px;
				}
			}
			.childItems {
				box-shadow: 0 7px 9px 0 rgba(0,0,0,0.15);
				background: white;
				opacity: 0;
				pointer-events: none;
				padding: 10px;
				z-index: 10;
			}

			&:hover > .childItems, .linkEmitor  {
				opacity: 1;
				pointer-events: all;
				z-index: 20;
			}
		}
	}
	@media (max-width: 900px) {
		.menu {
			grid-gap: 8px;
		}
	}
	@media (max-width: 800px) {
		.menu {
			grid-gap: 0;
		}
	}
	@media (max-width: 700px) {
		.menu {
			grid-gap: 0;
			grid-auto-flow: row;
			height: auto;
			justify-content: stretch;
			.menuItem {
				height: auto;
				.childItems {
					opacity: 0;
					height: 0;
					align-self: end;
					box-sizing: border-box;
					padding: 0;
					box-shadow: 0 4px 9px 2px rgba(0,0,0,0.15);
				}
				&:hover {
					.linkEmitor {
						margin-bottom:15px;
					}
				}
				&:hover > .childItems {
					height: 40px;
					padding: 10px;
					opacity: 1;
				}
			}
		}
	}
</style>
