<template>
	<div v-if="options && options.length" class="text-input-container">
		<label :for="inputId">{{ label }}</label>
		<select :id="inputId" :name="inputId" v-model="selected">
			<option v-for="option in options" :key="option[optionKey]">
				{{ option[optionProperty] }}
			</option>
		</select>
	</div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	optionKey: {
		type: String,
		required: true,
	},
	optionProperty: {
		type: String,
		required: true,
	},
	options: {
		type: Array,
		required: true,
	},
});

const inputId = computed(() => {
	return props.label.replaceAll(" ", "-");
});

const selected = defineModel();
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

select {
	width: 19rem;
	margin-bottom: 0.5rem;
	padding: 0.8rem 0.3rem;
	border-radius: 0.5rem;
	border: 1px solid gray;
	font-family: "Cinzel", serif;
}

select:focus {
	outline: 2px solid darkgrey;
}
</style>
