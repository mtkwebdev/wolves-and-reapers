<template>
	<PageLayout
		:background="GameRoundsBackgroundImg"
		alt="Join game background image"
	>
		<div class="game-rounds-content">
			<section>
				<Panel>
					<h1>Time To Vote!</h1>
					<h5>Players Eliminated: 0</h5>
					<h5>Players Remaining: 0</h5>
				</Panel>
			</section>
			<section>
				<img
					class="alt-logo"
					:src="mainLogo"
					:alt="wolvesAndReapersLogoDesc"
					:title="wolvesAndReapersLogoDesc"
				/>
				<SelectInput
					class="voting-input"
					label="Choose a player to eliminate"
				/>
				<Button>Vote</Button>
			</section>
		</div>
	</PageLayout>
</template>

<script setup>
import GameRoundsBackgroundImg from "@assets/backgrounds/game.png";
import mainLogo from "@assets/mainLogo.png";

import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";
import SelectInput from "../components/SelectInput/SelectInput.vue";
import Panel from "../components/Panel/Panel.vue";

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

.voting-input {
	margin-top: 1.2rem;
}
</style>
