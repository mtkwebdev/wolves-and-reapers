<template>
	<PageLayout :background="backgroundImg" alt="Join game background image">
		<div class="game-content">
			<section>
				<Panel v-if="store.game?.code">
					<h1 class="game-rounds-header">Round {{ store?.currentRound }}</h1>
					<h5>Players Eliminated: {{ store.eliminatedPlayers?.count }}</h5>
					<h5>Players Remaining: {{ store.activePlayers?.count }}</h5>
					<div class="misc-game-content">
						<small>Game code:</small>
						<br />
						<small>{{ store.code }}</small>
					</div>
				</Panel>
			</section>
			<section>
				<img
					class="alt-logo"
					:src="mainLogo"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>

				<div
					v-if="!store.currentPlayer.isEliminated && store.currentPlayer.word"
				>
					<h4 class="text-center">Your are a human, your secret word is:</h4>
					<h4 class="text-center">{{ store.currentPlayer.word }}</h4>
				</div>

				<div
					v-if="!store.currentPlayer.isEliminated && !store.currentPlayer.word"
				>
					<h4 class="text-center">You are the reaper!</h4>
					<h4 class="text-center">You dont have a secret word</h4>
					<h5 class="text-center">try to pretend that you have</h5>
					<h5 class="text-center">the same word as everyone else</h5>
				</div>

				<div v-if="store.currentPlayer.isEliminated">
					<h4 class="text-center">you have been voted out</h4>
					<h4 class="text-center">You are eliminated!</h4>
				</div>

				<Button
					v-if="store.canPlayerTakeTurns"
					@click="store.incrementPlayerTurns()"
					>End Turn</Button
				>

				<Button class="misc-game-content" @click="store.quitGame()"
					>Quit game</Button
				>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import backgroundImg from "@assets/backgrounds/game.png";
import mainLogo from "@assets/mainLogo.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";
import Panel from "../components/Panel/Panel.vue";
import { useGameStore } from "@store/main.js";

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
const store = useGameStore();
store.bindEvents();
store.resetTurn();
window.scrollTo(0, 0);
</script>

<style lang="css" scoped>
h2,
p {
	font-family: "Readex Pro", serif;
	margin-bottom: 1rem;
}

p {
	text-align: justify;
}

.game-rounds-text-container {
	overflow-y: auto;
}

.game-rounds-text {
	width: 22rem;
	padding: 0rem 2rem 0rem 2rem;
}
section {
	display: flex;
	flex-direction: column;
	place-items: center;
}
</style>
