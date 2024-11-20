<template>
	<PageLayout :background="HomeBackgroundImg" alt="Home background image">
		<div class="home-content-container">
			<img
				class="logo"
				:src="MainLogo"
				:alt="wolvesAndReapersLogoDesc"
				:title="wolvesAndReapersLogoDesc"
			/>

			<div class="button-container mt-2">
				<Button @click="store.setGameStage(instructionsStage)"
					>Instructions</Button
				>
				<Button
					@click="store.setGameStage(newGameStage)"
					class="alternative-button"
					>Start A New Game</Button
				>
				<Button
					@click="store.setGameStage(joinGameStage)"
					class="alternative-button"
					>Join A Game</Button
				>
			</div>
		</div>
	</PageLayout>
</template>

<script setup>
import { useGameStore } from "../store/main.js";
import HomeBackgroundImg from "@assets/backgrounds/home.png";
import MainLogo from "@assets/mainLogo.png";
import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";

const store = useGameStore();

const instructionsStage = store.gameStages.Instructions;
const newGameStage = store.gameStages.NewGame;
const joinGameStage = store.gameStages.JoinGame;

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
</script>

<style lang="css" scoped>
.home-content-container {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-between;
	height: 20rem;
	margin-top: 25rem;
}

.button-container {
	display: flex;
	flex-direction: column;
}
</style>
