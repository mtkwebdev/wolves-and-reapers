import { defineStore } from "pinia";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.65:8080/", { reconnect: true });

socket.on("connect", () => {
	console.log("client-connected");
});

export const useGameStore = defineStore("gameStore", {
	state: () => {
		return {
			gameStage: 0,
			currentGame: {},
		};
	},
	getters: {
		gameStages: () => {
			return {
				Home: 0,
				Instructions: 1,
				NewGame: 2,
				JoinGame: 3,
				GameRounds: 4,
				VotingRound: 5,
				ReaperWolf: 6,
				Escape: 7,
				HumanWin: 8,
				WolfWin: 9,
				ReaperWin: 10,
			};
		},
	},
	actions: {
		setGameStage(value) {
			if (this.gameStage <= 9) this.gameStage = value;
		},
		newGame(username, code) {
			// params are in the order of inputs in view
			socket.emit("new-game", socket.id, code, username, (res) => {
				console.log(res.data.game);
				if (res.isSuccessful) {
					this.currentGame = res.data;
					this.setGameStage(this.gameStages.GameRounds);
				} else {
					Error(res.error);
				}
			});
		},
		joinGame(username, code) {
			// params are in the order of inputs in view
			socket.emit("join-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.setGameStage(this.gameStages.GameRounds);
				} else {
					Error(res.error);
				}
			});
			this.getExistingGameData();
		},
		getExistingGameData(code) {
			socket.emit("get-updated-game-state", code, (res) => {
				console.log(res);
				if (res.isSuccessful) {
					this.currentGame = res.data;
				}
			});
		},
	},
});
