<template>
	<div class="userListWrapper">
		<article>
			<h2>Список пользователей</h2>
			<div class="searchWrapper">
				<input type="text" v-model="search" class="search mather" placeholder="Поиск">
				<div class="adminIcon tooltip mather" data-tooltip="Администраторы" @click="searchSetRole('Администратор')"></div>
				<div class="prepodIcon tooltip mather" data-tooltip="Преподаватели" @click="searchSetRole('Преподаватель')"></div>
				<div class="userIcon tooltip mather" data-tooltip="Пользователи" @click="searchSetRole('Пользователь')"></div>
			</div>
			<div class="userList" v-masonry fit-width="true">
				<user_prev v-masonry-tile v-for="user, index in searched" :user="user" :key="index" width="300px" />
			</div>
		</article>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import user_prev from '@/components/user_prev.vue'
import mixins from '@/components/mixins.vue'

export default {
	data () {
		return {
			search: ""
		}
	},
	mixins: [mixins],
	components: {
		user_prev
	},
	watch: {
		searched(){
			this.$redrawVueMasonry()
		}
	},
	methods: {
		...mapActions([
			'getAllUsers'
		]),
		searchSetRole(newRoleName){
			let filtred = this.search
				.split(" ")
				.filter( el =>
					!(this.roleNames.indexOf(el) + 1)
				)

			filtred.push(newRoleName)

			this.search = filtred.join(" ")
		}
	},
	computed: {
		...mapGetters([
			'edit',
			'quillOptions',
			'allUsers'
		]),
		searched () {
			let searchWithRole = (el, search) => {
				el.roleName = this.roleName(el.id_role)
				return this.searchFn(el, search)
			}

			if (!this.search.length) return this.allUsers
			return this.allUsers.filter(el => searchWithRole(el, this.search))
		}
	},
	mounted () {
		this.getAllUsers()
	}
}
</script>

<style lang="less">
	.userListWrapper {
		article {
			padding: 10px 40px;
			width: 100%;
			display: grid;
			justify-content: stretch;
			.search {
				background-image: url("../assets/images/ic_search_black_24px.svg");
				background-position: 97% 50%;
				background-repeat: no-repeat;
				padding: 15px 40px 15px 20px;
				justify-self: center;
				margin: 10px;
				width: 300px;
				background-color: #fff;
				border-bottom: 1px solid transparent;
				&:focus {
					border-bottom: 1px solid transparent;
				}
			}
			.searchWrapper {
				display: grid;
				grid-auto-flow: column;
				grid-gap: 10px;
				justify-content: center;
				.tooltip {
					width: 45px;
					height: 45px;
					background-color: #fff;
					background-position: center;
					padding: 0;
					margin: 10px 0;
				}
			}
		}
		.userList {
			width: 100%;
			.user_prev {
				margin: 10px;
				transition: box-shadow 0.2s ease-in-out;
			}
		}
	}
</style>
