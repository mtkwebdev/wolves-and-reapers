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
					v-if="store.hasWolfWon && store.isPlayerWolf"
					:src="WolfWinsImg"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>

				<img
					v-if="store.hasReaperWon && store.isPlayerReaper"
					:src="ReaperWinsImg"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>

				<img
					v-if="store.isPlayerHuman"
					:src="HumansLoseImg"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>

				<Button @click="store.quitGame()">Quit game</Button>

				<img
					v-if="!store.hasCurrentPlayerWon"
					:src="HumansLoseMsgImg"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import humansLose from "@assets/backgrounds/humansReaperWin.png";
import eliminatedWolf from "@assets/backgrounds/eliminatedWolf.png";
import eliminatedReaper from "@assets/backgrounds/eliminatedReaper.png";
import wolfWin from "@assets/backgrounds/wolfWin.png";
import reaperWin from "@assets/backgrounds/reaperWin.png";
import WolfWinsImg from "@assets/wolfWin.png";
import ReaperWinsImg from "@assets/reaperWin.png";
import HumansLoseImg from "@assets/HumansLose.png";
import HumansLoseMsgImg from "@assets/humansLoseMsg.png";

import mainLogo from "@assets/mainLogo.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";

import { useGameStore } from "@store/main.js";
import { computed } from "vue";

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
const store = useGameStore();

store.bindEvents();
window.scrollTo(0, 0);

const backgroundImg = computed(() => {
	if (store.isPlayerReaper && store.hasReaperWon) {
		return reaperWin;
	}
	if (store.isPlayerReaper && !store.hasReaperWon) {
		return eliminatedReaper;
	}
	if (store.isPlayerWolf && store.hasWolfWon) {
		return wolfWin;
	}
	if (store.isPlayerWolf && !store.hasWolfWon) {
		return eliminatedWolf;
	}

	return humansLose;
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
	margin-top: 15rem;
}
</style>
