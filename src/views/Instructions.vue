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
					<h2>Aim of the game</h2>
					<p>
						<strong>Humans:</strong> Survive being caught by the Wolf or Reaper.
					</p>
					<p>
						<strong>Wolf:</strong> Avoid being caught by the Reaper or found out
						by the Humans.
					</p>
					<p><Strong>Reaper:</Strong> Eliminate everyone.</p>
				</div>
				<div class="instruction-text">
					<h2>How to play</h2>
					<p>You will each be assigned a role of Human, Wolf, or Reaper.</p>
					<p>
						There are a maximum of one Wolf and one Reaper each game, everyone
						else is a Human.
					</p>
					<p>
						Each Human is given a secret word, and must try to describe to the
						other players without saying or exposing their word.
					</p>
					<p>
						The Wolf thinks they are Human, and without knowing, are given a
						different secret word to the Humans. They will work to describe
						their word, thinking they have the same word as everyone else.
					</p>
					<p>
						Reapers don’t get a word, and instead must pretend they have the
						same word as everyone else.
					</p>
					<p>
						Each round, you will all take turns to describe the word you have.
					</p>
					<p>
						If you are the Reaper, you must try to describe the word you think
						everyone else has. <br />
						If you can guess the word that the Humans have,
						<strong> you will eliminate everyone at once</strong>, winning the
						game.
					</p>
					<p>
						Humans or Wolves win the game by surviving being caught by the
						Reaper, or by being voted out of the game.
					</p>
				</div>
			</div>
			<div class="button-container">
				<Button>Back</Button>
			</div>
		</div>
	</PageLayout>
</template>

<script setup>
import InstructionsBackgroundImg from "@assets/backgrounds/Instructions.png";
import MainLogo from "@assets/alternativeLogo.png";
import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";

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

.instructions-content {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-between;
	height: 95vh;
	margin: auto;
}

.instruction-text-container {
	overflow-y: auto;
}

.instruction-text {
	width: 22rem;
	padding: 0rem 2rem 0rem 2rem;
}
</style>
