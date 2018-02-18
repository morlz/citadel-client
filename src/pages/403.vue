<template>
    <article class="page404 mather">
		<h2 class="code">404 Page not found!</h2>
		<div class="message">
			Oops... Something went wrong!
		</div>
    </article>
</template>

<script>
export default {}
</script>

<style lang="less">
.page404 {
	display: grid;
	justify-content: center;
	align-items: center;
	width: 500px;
	background: #fff;
	box-sizing: border-box;
	margin: 200px auto;
	text-align: center;
}

@media ( max-width: 800px ) {
	.page404 {
		max-width: 500px;
		width: 100%;
		margin: 20px auto;
	}
}
</style>
