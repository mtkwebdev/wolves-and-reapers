import { defineStore } from "pinia";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.65:8080/", { reconnect: true });

socket.on("connect", () => {
	console.log("client-connected");
});

const cacheKey = "wolves-reapers-cache";

export const useGameStore = defineStore("gameStore", {
	state: () => {
		return {
			username: null,
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
		clearCache() {
			localStorage.removeItem(cacheKey);
		},
		setCache() {
			const cache = JSON.stringify(this.currentGame);
			localStorage.setItem("wolves-reapers-cache", cache);
			localStorage.setItem("wolves-reapers-username-cache", this.username);
		},
		getCache() {
			const rawCache = localStorage.getItem("wolves-reapers-cache");
			if (rawCache) {
				const cache = JSON.parse(rawCache);
				this.username = localStorage.getItem("wolves-reapers-username-cache");
				return cache;
			}
			return null;
		},
		newGame(username, code) {
			this.username = username;
			// params are in the order of inputs in view
			socket.emit("new-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.currentGame = res.game;
					this.setGameStage(this.gameStages.GameRounds);
					this.setCache();
				} else {
					Error(res.error);
				}
			});
		},
		joinGame(username, code) {
			// params are in the order of inputs in view
			this.username = username;
			socket.emit("join-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.currentGame = res.game;
					this.setGameStage(this.gameStages.GameRounds);
					this.setCache();
				} else {
					Error(res.error);
				}
			});
			this.getExistingGameData();
		},
		reconnectToExistingGame() {
			const cache = this.getCache();
			console.log(cache);
			if (cache) {
				this.joinGame(this.username, cache.code);
			}
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
