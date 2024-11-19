<template>
	<div class="background">
		<img class="background-img" :src="background" :alt="alt" />
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	background: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		required: true,
	},
});
</script>

<style lang="css">
.background,
.content {
	display: flex;
	margin: auto;
	width: 100vw;
	height: 100vh;
	justify-content: center;
}

.content {
	color: white;
	z-index: 2;
}

.background-img {
	position: absolute;
	top: 0;
	left: auto;
	right: auto;
	bottom: auto;
	height: 100vh;
	width: auto;
	object-fit: contain;
	z-index: 1;
	@media only screen and (max-width: 600px) {
		height: auto;
		width: 100vw;
	}
}
</style>
