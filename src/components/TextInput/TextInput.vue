<template>
	<div class="text-input-container">
		<label :for="inputId">{{ label }}</label>
		<input :id="inputId" :name="inputId" type="text" v-model="inputValue" />
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	label: {
		type: String,
		required: true,
	},
});

const inputId = computed(() => {
	return props.label.replaceAll(" ", "-");
});

const inputValue = defineModel();
</script>

<style lang="css" scoped>
.text-input-container {
	display: flex;
	flex-direction: column;
	width: 20rem;
	margin: 0rem auto 1rem auto;
	font-size: 1.2rem;
	font-weight: 600;
}

input {
	width: 19rem;
	margin-bottom: 0.5rem;
	padding: 0.8rem 0.3rem;
	border-radius: 0.5rem;
	border: 1px solid gray;
	font-family: "inter", serif;
	font-size: 1rem;
}

input:focus {
	outline: 2px solid darkgrey;
}
</style>
