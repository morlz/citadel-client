<template>
	<div class="canOpen" :class="{opened: opened}" @click="opened = !opened">
		<div class="title">{{content.title}}</div>
		<div class="description">{{content.littleText}}</div>
		<div class="arrow"></div>
		<div class="content">
			<div v-html="content.description"></div>
			<img class="logo" :src="content.logo">
		</div>
		<router-link class="buttonTRb" :to="{ path: `/discipline/${content.id}` }">Подробнее о курсе</router-link>
	</div>
</template>

<script>
export default {
	props: ['content'],
	data () {
		return {
			opened: false
		}
	}
}
</script>

<style lang="less">
.canOpen {
	box-sizing: border-box;
	position: relative;
    width: 100%;
    border: 1px solid transparent;
    display: grid;
    grid-auto-flow: row;
    padding: 20px;
	transition: all 0.3s ease-in-out;
	cursor: pointer;
    .title {
        color: #444;
        font-size: 24px;
        font-weight: 400;
        line-height: 20px;
    }
    .description {
        color: #666;
        font-size: 14px;
        font-weight: 400;
        height: 19px;
        line-height: 16px;
        margin-top: 8px;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
	.arrow {
		position: absolute;
		top: 25px;
		right: 20px;
		width: 35px;
		height: 35px;
		background: url("../assets/images/ARROW.svg") no-repeat 50% 50%;
		background-size: 25px;
		transition: all 0.3s ease-in-out;
	}
	.content {
		transition: all 0.3s ease-in-out;
		opacity: 0;
		max-height: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		padding: 0 20px;
		display: grid;
		grid-template-columns: 2fr 1fr;
		justify-content: center;
		grid-auto-flow: column;
		grid-gap: 10px;
		h3 {
			font-size: 20px;
		}
		.logo {
			width: 100%;
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}
	.buttonTRb {
		font-size: 18px;
		position: absolute;
		bottom: 30px;
		right: 20px;
		user-select: none;
		pointer-events: none;
		opacity: 0;
	}
}

@media (max-width: 800px) {
	.canOpen {
		padding: 20px 5px;
		.content {
			padding: 0;
		}
	}
}

.opened {
	padding: 50px 20px 80px 20px;
    border-top: 1px solid rgb(225, 225, 225);
    border-bottom: 1px solid rgb(225, 225, 225);
	.arrow {
		top: 70px;
		transform: rotateX(-180deg);
	}
	.content {
		opacity: 1;
		max-height: 500px;
	}
	.buttonTRb {
		opacity: 1;
		pointer-events: all;
	}
}


</style>
