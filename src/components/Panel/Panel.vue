<template>
	<div class="panel-container">
		<slot></slot>
	</div>
</template>

<script setup></script>

<style lang="css" scoped>
.panel-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.8);
	box-shadow: inset 0rem 0rem 2rem rgba(255, 255, 255, 0.25),
		0rem 0rem 1rem rgba(0, 0, 0, 1);
	width: 20rem;
	padding: 1rem 1.5rem;
	border-radius: 0.5rem;
	border: 1px solid #4b4b4b;
}
</style>
