<template>
	<PageLayout
		:background="InstructionsBackgroundImg"
		alt="Instructions background image"
	>
		<div class="instructions-content">
			<img
				class="logo"
				:src="MainLogo"
				:alt="wolvesAndReapersLogoDesc"
				:title="wolvesAndReapersLogoDesc"
			/>
			<div class="instruction-text-container">
				<div class="instruction-text">
					<h2 class="instruction-heading">Introduction</h2>
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
				<div class="instruction-text">
					<h2 class="instruction-heading">Aim of the game</h2>
					<p class="instruction-text">
						<strong>Humans:</strong> Survive being caught by the Wolf or Reaper.
					</p>
					<p class="instruction-text">
						<strong>Wolf:</strong> Avoid being caught by the Reaper or found out
						by the Humans.
					</p>
					<p class="instruction-text">
						<Strong>Reaper:</Strong> Eliminate everyone.
					</p>
				</div>
				<div class="instruction-text">
					<h2 class="instruction-heading">How to play</h2>
					<p class="instruction-text">
						You will each be assigned a role of Human, Wolf, or Reaper.
					</p>
					<p class="instruction-text">
						There are a maximum of one Wolf and one Reaper each game, everyone
						else is a Human.
					</p>
					<p class="instruction-text">
						Each Human is given a secret word, and must try to describe to the
						other players without saying or exposing their word.
					</p>
					<p class="instruction-text">
						The Wolf thinks they are Human, and without knowing, are given a
						different secret word to the Humans. They will work to describe
						their word, thinking they have the same word as everyone else.
					</p>
					<p class="instruction-text">
						Reapers don’t get a word, and instead must pretend they have the
						same word as everyone else.
					</p>
					<p class="instruction-text">
						Each round, you will all take turns to describe the word you have.
					</p>
					<p class="instruction-text">
						If you are the Reaper, you must try to describe the word you think
						everyone else has. <br />
						If you can guess the word that the Humans have,
						<strong> you will eliminate everyone at once</strong>, winning the
						game.
					</p>
					<p class="instruction-text">
						Humans or Wolves win the game by surviving being caught by the
						Reaper, or by being voted out of the game.
					</p>
				</div>
				<h6>Created By Mohammad Kawadri</h6>
			</div>
			<div class="button-container">
				<Button @click="store.setGameStage(homeStage)">Back</Button>
			</div>
		</div>
	</PageLayout>
</template>

<script setup>
import { useGameStore } from "../store/main.js";
import InstructionsBackgroundImg from "@assets/backgrounds/Instructions.png";
import MainLogo from "@assets/mainLogo.png";
import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";

const store = useGameStore();
const homeStage = store.gameStages.Home;
const wolvesAndReapersLogoDesc = "wolves and reapers logo";
</script>

<style lang="css" scoped>
.instruction-heading,
.instruction-text {
	font-family: "Cinzel", serif;
	margin-bottom: 1rem;
}

.instruction-text {
	text-align: justify;
}

.instructions-content {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-evenly;
	height: 95vh;
	margin: auto;
}

.instruction-text-container {
	overflow-y: auto;
	overflow-x: hidden;
	padding: 0rem 2rem 0rem 2rem;
	height: 70vh;
}

.instruction-text {
	width: 20rem;
}
</style>
