<template>
	<router-link class="user_prev mather" :to="{ path: `/user/${data.id}` }">
		<div class="image" :style="{
			'background-image' : image ? `url('${image}')` : '',
			'width' : width || '300px',
			'height' : width || '300px'
			}"
			:class="{ noImage: !image }"></div>
		<h2 class="name"> {{ data.name }}</h2>
	    <div class="contactsWrapper">
	        <div class="contacts">
				<div class="phone" v-if="data.phone">{{data.phone}}</div>
				<div class="email" v-if="data.email">{{data.email}}</div>
				<div class="role" :class="{ [roleIconClass(data.id_role)]: true }">{{ roleName(data.id_role) }}</div>
			</div>
			<div class="editButtons" v-if="edit">
				<div class="buttonTRb" @click="deleteUser($event, data.id)">Удалить</div>
			</div>
	    </div>
	</router-link>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import mixins from '@/components/mixins.vue'

export default {
    props: ['id', 'width', 'user'],
	mixins: [mixins],
    methods: {
		...mapActions([
			'getUser',
			'remove'
		]),
		deleteUser(e, id){
			e.preventDefault()
			this.remove({
				type: 'user',
				id
			})
		}
    },
	watch: {
		edit(){
			this.$redrawVueMasonry()
		}
	},
	computed: {
		...mapGetters([
			'allUsers',
			'edit'
		]),
		data () {
			if (this.id) return this.allUsers.find(el => el.id == this.id) || {}
			if (this.user) return this.user || {}
		},
		image () {
			if (!this.data.photo.indexOf('src="'))
				return this.data.photo.substr(5, this.data.photo.length - 6)

			return this.data.photo
		}
	},
	mounted () {
		if (this.id) this.getUser( this.id )
	}
}
</script>

<style lang="less">

.user_prev {
	width: 300px;
	text-decoration: none;
    background-color: #fff;
    transition: all 0.2s ease-in-out;
	color:#666;
	overflow: hidden;
	.image {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
	.noImage {
		background-position: 50% 20px;
		background-size: 90%;
	}
	.name {
		width: ~"calc(100% - 20px)";
		margin: 10px;
        font-size: 26px;
        line-height: 26px;
        padding: 0;
		background: #fff;
		box-sizing: border-box;
    }
	.contacts {
		line-height: 40px;
		> div {
			width: 100%;
			box-sizing: border-box;
			min-height: 40px;
		}
	}
    .contactsWrapper {
        background: white;
        padding: 10px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr;
        grid-auto-flow: row;
		.editButtons {
			display: flex;
			justify-content: flex-end;
			flex-direction: row;
		}
    }
    .b1 {
        justify-self: center;
    }
    .fadeContent-enter-active {
        transition: margin-top 0.3s ease-in-out, opacity 0.2s ease-in-out 0.15s;
    }
    .fadeContent-leave-active {
        transition: margin-top 0.3s ease-in-out 0.1s, opacity 0.2s ease-in-out;
    }
    .fadeContent-enter,
    .fadeContent-leave-to {
        opacity: 0;
        margin-top: -100%;
    }
}
</style>
