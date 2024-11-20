<template>
	<PageLayout :background="HomeBackgroundImg" alt="Home background image">
		<div class="home-content-container">
			<img
				class="logo"
				:src="MainLogo"
				:alt="wolvesAndReapersLogoDesc"
				:title="wolvesAndReapersLogoDesc"
			/>
			<div class="intro-text">
				<p>
					Your group is lost in a haunted forest and being chased down by a
					reaper.
				</p>
				<p>One of you is also unknowingly a werewolf.</p>
				<p>
					Try to escape by eliminating the Reaper and Werewolf before they
					eliminate you.
				</p>
			</div>
			<div class="button-container">
				<Button @click="store.setGameStage(instructionsStage)"
					>Instructions</Button
				>
				<Button
					@click="store.setGameStage(joinGameStage)"
					class="alternative-button"
					>Start Playing</Button
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
const joinGameStage = store.gameStages.JoinGame;

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
</script>

<style lang="css" scoped>
.home-content-container {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-between;
	height: 50vh;
	margin-top: 18rem;
}

.intro-text {
	text-align: center;
	width: 20rem;
}
.intro-text > p {
	font-size: 1.2rem;
	font-weight: 500;
}

.button-container {
	display: flex;
	flex-direction: column;
}
</style>
