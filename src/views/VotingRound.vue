<template>
	<PageLayout :background="backgroundImg" alt="Join game background image">
		<div class="game-content">
			<section>
				<Panel>
					<h1 class="game-rounds-header">Time To Vote!</h1>
					<h5>Players Eliminated: {{ store.eliminatedPlayers.count }}</h5>
					<h5>Players Remaining: {{ store.activePlayers.count }}</h5>
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
				<div v-if="store.hasVoted" class="has-voted-text">
					Please wait for everyone else's votes
				</div>
				<div v-else>
					<SelectInput
						v-if="store.canPlayerTakeVote"
						class="voting-input"
						label="Choose a player to eliminate"
						:options="store.activePlayers.players"
						optionProperty="username"
						option-key="id"
						v-model="selectedVote"
					/>

					<Button v-if="selectedVote" @click="store.castVote(selectedVote)"
						>Vote</Button
					>
				</div>
				<Button class="misc-game-content" @click="store.clearCache()"
					>Quit game</Button
				>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import { ref } from "vue";
import backgroundImg from "@assets/backgrounds/game.png";
import mainLogo from "@assets/mainLogo.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";
import SelectInput from "../components/SelectInput/SelectInput.vue";
import Panel from "../components/Panel/Panel.vue";
import { useGameStore } from "@store/main.js";

const store = useGameStore();
store.bindEvents();
window.scrollTo(0, 0);

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
const selectedVote = ref(null);
</script>

<style lang="css" scoped>
section {
	display: flex;
	flex-direction: column;
	place-items: center;
}

.voting-input {
	margin-top: 1.2rem;
}

.has-voted-text {
	color: white;
}
</style>
