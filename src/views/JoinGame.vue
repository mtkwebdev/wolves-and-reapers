<template>
	<PageLayout
		:background="JoinGameBackgroundImg"
		alt="Join game background image"
	>
		<div class="join-game-content">
			<section>
				<Panel>
					<TextInput label="Your Name" v-model="username" />
					<TextInput label="Game Code" v-model="gameCode" />

					<Button @click="store.joinGame(username, gameCode)">Join Game</Button>
				</Panel>
			</section>
			<section>
				<img
					class="alt-logo"
					:src="AltLogo"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
				<div class="button-container">
					<Button @click="store.setGameStage(homeStage)">Back</Button>
				</div>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import { ref } from "vue";
import { useGameStore } from "../store/main.js";
import JoinGameBackgroundImg from "@assets/backgrounds/join.png";
import AltLogo from "@assets/altLogo.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";
import Panel from "../components/Panel/Panel.vue";
import TextInput from "../components/TextInput/TextInput.vue";

const store = useGameStore();

const homeStage = store.gameStages.Home;

const username = ref(null);
const gameCode = ref(null);

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
