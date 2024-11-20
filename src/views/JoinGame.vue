<template>
	<PageLayout
		:background="JoinGameBackgroundImg"
		alt="Join game background image"
	>
		<div class="join-game-content">
			<section>
				<Panel>
					<TextInput label="Your Name" />
					<TextInput label="Group Name" />

					<Button @click="store.setGameStage(gameRoundsStage)"
						>Let's Play</Button
					>
				</Panel>
			</section>
			<section>
				<img
					class="alt-logo"
					:src="AltLogo"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
				<div class="join-game-text-container"></div>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import { useGameStore } from "../store/main.js";
import JoinGameBackgroundImg from "@assets/backgrounds/join.png";
import AltLogo from "@assets/altLogo.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";
import Panel from "../components/Panel/Panel.vue";
import TextInput from "../components/TextInput/TextInput.vue";

const store = useGameStore();
const gameRoundsStage = store.gameStages.GameRounds;

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
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

.join-game-content {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-between;
	height: 80vh;
	margin: auto;
}

.join-game-text-container {
	overflow-y: auto;
}

.join-game-text {
	width: 22rem;
	padding: 0rem 2rem 0rem 2rem;
}
section {
	display: flex;
	flex-direction: column;
	place-items: center;
}
</style>
