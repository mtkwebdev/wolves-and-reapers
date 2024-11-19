<template>
	<button>
		<slot></slot>
	</button>
</template>

<script setup></script>

<style lang="css" scoped>
button {
	background: none;
	background-image: url("@assets/button.png");
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	font-family: "Cinzel", serif;
	color: white;
	font-weight: 700;
	background-repeat: no-repeat;
	height: 5rem;
	width: 16rem;
}
</style>
