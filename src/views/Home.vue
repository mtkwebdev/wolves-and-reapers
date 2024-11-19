<template>
	<PageLayout :background="HomeBackgroundImg" alt="Home background image">
		<div class="home-content-container">
			<img
				class="main-logo"
				:src="MainLogo"
				:alt="wolvesAndReapersLogoDesc"
				:title="wolvesAndReapersLogoDesc"
			/>
			<div class="intro-text">
				<p>
					Your group is lost in a haunted forest, and being chased down by a
					reaper.
				</p>
				<p>One of you is also unknowingly a werewolf.</p>
				<p>
					Try to escape by eliminating the Reaper and Werewolf before they
					eliminate you.
				</p>
			</div>
			<div class="button-container">
				<Button>Instructions</Button>
				<Button>Let's play</Button>
			</div>
		</div>
	</PageLayout>
</template>

<script setup>
import HomeBackgroundImg from "@assets/backgrounds/home.png";
import MainLogo from "@assets/alternativeLogo.png";
import PageLayout from "../components/PageLayout/PageLayout.vue";
import Button from "../components/Button/Button.vue";

const wolvesAndReapersLogoDesc = "wolves and reapers logo";
</script>

<style lang="css" scoped>
.home-content-container {
	display: flex;
	flex-direction: column;
	place-items: center;
	justify-content: space-between;
	height: 50vh;
	margin-top: 20rem;
}

.intro-text {
	text-align: center;
	width: 20rem;
}

.main-logo {
	position: relative;
	display: flex;
	width: 30vh;
	height: auto;
	object-fit: contain;
	transform: scale(1.4);
}
.button-container {
	display: flex;
	flex-direction: column;
}
</style>
