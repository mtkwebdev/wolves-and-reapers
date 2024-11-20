<script setup>
import { ref } from "vue";
import { useGameStore } from "@store/main.js";
import Home from "./views/Home.vue";
import Instructions from "./views/Instructions.vue";
import JoinGame from "./views/JoinGame.vue";
import GameRounds from "./views/GameRounds.vue";
import VotingRound from "./views/VotingRound.vue";

const store = useGameStore();

const gameStages = [
	Home,
	Instructions,
	JoinGame,
	GameRounds,
	VotingRound,
	"ReaperWolf",
	"Escape",
];
</script>

<template><component :is="gameStages[store.gameStage]" /></template>
