<template>
	<PageLayout :background="backgroundImg" alt="Join game background image">
		<div class="game-rounds-content">
			<section>
				<Panel v-if="store.game?.code">
					<h1 class="game-rounds-header">Round {{ store?.currentRound }}</h1>
					<h5>Players Eliminated: {{ store.eliminatedPlayers?.count }}</h5>
					<h5>Players Remaining: {{ store.activePlayers?.count }}</h5>
				</Panel>
			</section>
			<section>
				<img
					class="alt-logo"
					:src="mainLogo"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
				<div>
					<h1>Your secret word is:</h1>
					<h3 class="text-center">Fish Cakes</h3>
				</div>
				<Button v-if="!store.isTurnEnded" @click="store.incrementPlayerTurns()"
					>End Turn</Button
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

.game-rounds-content {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-between;
	height: 90vh;
	margin: auto;
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
