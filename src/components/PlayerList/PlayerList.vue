<template>
	<div class="player-lists">
		<div v-if="store.activePlayers?.count">
			<label>{{ store.activePlayers?.count }} playing:</label>
			<div v-for="{ username } in store.activePlayers?.players" :key="username">
				<small class="text-center">{{ username }}</small>
			</div>
		</div>
		<div v-if="store.eliminatedPlayers?.count">
			<label>{{ store.eliminatedPlayers?.count }} eliminated:</label>
			<div
				v-for="{ username } in store.eliminatedPlayers?.players"
				:key="username"
			>
				<small class="text-center">{{ username }}</small>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useGameStore } from "../../store/main";

const store = useGameStore();
</script>

<style lang="css" scoped>
.player-lists {
	display: flex;
	justify-content: space-between;
	width: 20rem;
}
</style>
