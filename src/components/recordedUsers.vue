<template>
	<div class="currentUsersRegistredWrapper" :class="{currentUsersRegistredWrapperActive: currentUsersRegistredShow}">
		<div class="currentUsersRegistred mather">
			<div class="content">
				<h4 class="title">Зарегестрированые пользователи</h4>
				<input type="text" v-model="search" class="search">
				<div class="users">
					<recordedUser v-for="user, index in searched" :content="user" :key="index"></recordedUser>
					<div v-if="!searched.length">Список пуст</div>
				</div>
			</div>
			<div class="buttons">
				<div class="buttonTRb" @click="hideCurrentUsers">Закрыть</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
	mapMutations
} from 'vuex'
import recordedUser from '@/components/recordedUser.vue'
import mixins from '@/components/mixins.vue'

export default {
	data () {
		return {
			search: ""
		}
	},
	mixins: [mixins],
	components: {
		recordedUser
	},
    methods: {
		...mapMutations([
			'hideCurrentUsers'
		])
    },
	computed: {
		...mapGetters([
			'edit',
			'currentUsersRegistredShow',
			'currentUsersRegistredContent'
		]),
		searched () {
			if (!this.search.length) return this.currentUsersRegistredContent
			return this.currentUsersRegistredContent.filter(el => this.searchFn(el, this.search))
		}
	}
}
</script>

<style lang="less">
	.currentUsersRegistredWrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 26;
		pointer-events: none;
		background: transparent;
		transition: all 0.3s ease-in-out;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		.currentUsersRegistred {
			position: absolute;
			top: 5%;
			left: ~"calc(50% - 450px)";
			height: 90%;
			padding: 30px;
			background: #fff;
			box-sizing: border-box;
			.content {
				padding: 10px;
				margin: 10px;
				width: 800px;
				height: ~"calc( 100% - 35px )";
				box-sizing: border-box;
				> .title {
					margin: 0 0 10px 0;
					height: 19px;
				}
				.search {
					background-image: url("../components/img/ic_search_black_24px.svg");
					background-position: 97% 50%;
					background-repeat: no-repeat;
					padding: 15px 40px 15px 20px;
					margin: 10px 210px;
					width: 300px;
					background-color: #eee;
					border-bottom: 1px solid transparent;
					height: 15px;
					&:focus {
						border-bottom: 1px solid transparent;
					}
				}
				.users {
					height: ~"calc(100% - 80px)";
					box-sizing: border-box;
					overflow-y: scroll;
					padding: 75px 10px 0 0;
				}
			}
			.buttons {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	.currentUsersRegistredWrapperActive {
		pointer-events: all;
		opacity: 1;
	}
</style>
