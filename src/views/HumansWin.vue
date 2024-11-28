<template>
	<PageLayout :background="backgroundImg" alt="Join game background image">
		<div class="space-evenly">
			<section class="logo-container">
				<img
					class="alt-logo"
					:src="mainLogo"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
			</section>
			<section class="game-end-section game-end-text">
				<img
					:src="HumansWin"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>

				<img
					v-if="store.isPlayerHuman"
					class="humans-win-msg"
					:src="HumansWinMsg"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>

				<img
					v-if="wolfReaperLoseImg"
					:src="wolfReaperLoseImg"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
				<img
					v-if="!store.isPlayerHuman"
					class="alt-logo"
					:src="playerLosesImg"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
				<Button @click="store.quitGame()">Quit game</Button>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import backgroundImg from "@assets/backgrounds/humansWin.png";
import HumansWin from "@assets/humansWin.png";
import HumansWinMsg from "@assets/humansWinMsg.png";
import playerLosesImg from "@assets/playerLosesMsg.png";
import reaperLoseImg from "@assets/reaperLose.png";
import wolfLoseImg from "@assets/wolfLose.png";

import mainLogo from "@assets/mainLogo.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";

import { useGameStore } from "@store/main.js";
import { computed } from "vue";

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
const store = useGameStore();

store.bindEvents();
window.scrollTo(0, 0);

const wolfReaperLoseImg = computed(() => {
	if (store.isPlayerReaper) {
		return reaperLoseImg;
	}
	if (store.isPlayerWolf) {
		return wolfLoseImg;
	}
	return null;
});
</script>

<style lang="css" scoped>
.logo-container {
	position: absolute;
	top: 2rem;
}
.space-evenly {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-evenly;
}
.game-end-section {
	display: flex;
	flex-direction: column;
	place-items: center;
	padding-top: 8rem;
}

.game-end-text {
	margin-top: 13rem;
}

.humans-win-msg {
	margin-top: 2rem;
}
</style>
