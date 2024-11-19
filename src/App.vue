<script setup>
import { ref } from "vue";
import Home from "./views/Home.vue";
import Instructions from "./views/Instructions.vue";
import JoinGame from "./views/JoinGame.vue";
import GameRounds from "./views/GameRounds.vue";
import VotingRound from "./views/VotingRound.vue";

const gameStages = [
	Home,
	Instructions,
	JoinGame,
	GameRounds,
	VotingRound,
	"ReaperWolf",
	"Escape",
];

const currentStage = ref(5);
</script>

<template><component :is="gameStages[currentStage]" /></template>
