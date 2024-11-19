<template>
	<div class="background">
		<img v-if="backgroundPath" :src="background" :alt="alt" />
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
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

const backgroundPath = computed(() => {
	return `@assets/backgrounds/${props.background}.png?url`;
});
const backgroundAltText = computed(() => {
	return `${props.background} background image`;
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

/* .content, */
.background img {
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
