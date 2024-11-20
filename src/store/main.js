import { defineStore } from "pinia";

// const playerRoles = [
// 	{
// 		id: 0,
// 		name: "Human",
// 	},
// 	{
// 		id: 1,
// 		name: "Wolf",
// 	},
// 	{
// 		id: 2,
// 		name: "Reaper",
// 	},
// ];

// const playerTemplate = {
// 	name: null,
// 	group: null,
// 	role: {},
// 	isReady: false,
// 	isEliminated: false,
// };

export const useGameStore = defineStore("gameStore", {
	state: () => {
		return {
			// totalPlayerCount: 0,
			// eliminatedPlayersCount: 0,
			// players: [],
			// player: {},
			gameStage: 0,
		};
	},
	getters: {
		gameStages: () => {
			return {
				Home: 0,
				Instructions: 1,
				JoinGame: 2,
				GameRounds: 3,
				VotingRound: 4,
				ReaperWolf: 5,
				Escape: 6,
				HumanWin: 7,
				WolfWin: 8,
				ReaperWin: 9,
			};
		},
	},
	actions: {
		setGameStage(value) {
			if (this.gameStage <= 9) this.gameStage = value;
		},
	},
});
