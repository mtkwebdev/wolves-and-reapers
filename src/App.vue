<script setup>
import { ref } from "vue";
import { useGameStore } from "@store/main.js";
import Home from "./views/Home.vue";
import Instructions from "./views/Instructions.vue";
import NewGame from "./views/NewGame.vue";
import JoinGame from "./views/JoinGame.vue";
import PlayingRound from "./views/PlayingRound.vue";
import VotingRound from "./views/VotingRound.vue";

const store = useGameStore();

const gameStages = [
	Home,
	Instructions,
	NewGame,
	JoinGame,
	PlayingRound,
	VotingRound,
	"ReaperWolf",
	"Escape",
];

store.reconnectToExistingGame();
store.updateClientState();
</script>

<template>
	<component :is="gameStages[store.gameStage]" />
</template>
