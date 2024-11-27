<template>
	<PageLayout :background="backgroundImg" alt="Join game background image">
		<div class="join-game-content">
			<section>
				<Panel>
					<TextInput label="Your Name" v-model="username" />

					<div>
						<label>New game code</label>
						<button class="new-game-button">
							{{ newGameCode }}
							<img class="copy-icon" :src="CopyIcon" alt="copy-icon" />
						</button>
					</div>

					<Button @click="store.newGame(username, newGameCode)"
						>Start Game</Button
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
				<div class="button-container">
					<Button @click="store.setGameStage(homeStage)">Back</Button>
				</div>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useGameStore } from "../store/main.js";
import backgroundImg from "@assets/backgrounds/join.png";
import AltLogo from "@assets/altLogo.png";
import CopyIcon from "@assets/copyIcon.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";
import Panel from "../components/Panel/Panel.vue";
import TextInput from "../components/TextInput/TextInput.vue";

const newGameCode = uuidv4();
const store = useGameStore();

const homeStage = store.gameStages.Home;

const username = ref(store.username);

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
.copy-icon {
	width: 1.5rem;
	height: auto;
	object-fit: contain;
}

.new-game-button {
	display: flex;
	place-items: center;
	padding: 1rem;
	font-family: "Cinzel", serif;
	border-radius: 0.5rem;
	border: 0px solid transparent;
	margin-bottom: 1rem;
	font-weight: 500;
	font-size: 1rem;
	cursor: pointer;
}
</style>
