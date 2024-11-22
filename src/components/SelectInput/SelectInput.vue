<template>
	<div class="text-input-container">
		<label :for="inputId">{{ label }}</label>
		<Select :id="inputId" :name="inputId">
			<option>Player 1</option>
			<option>Player 2</option>
			<option>Player 3</option>
			<option>Player 4</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player 5</option>
			<option>Player x</option>
		</Select>
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
