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
			code: null,
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
				PlayingRound: 4,
				VotingRound: 5,
				ReaperWolf: 6,
				Escape: 7,
				HumanWin: 8,
				WolfWin: 9,
				ReaperWin: 10,
			};
		},
		activePlayers: () => {
			const players =
				this.currentGame.players.filter(
					(player) => player.isEliminated === false
				)?.length || 0;

			return {
				count: players?.length,
				players,
				usernames: players.map((player) => player?.username),
			};
		},
		eliminatedPlayers: () => {
			const players =
				this.currentGame.players.filter(
					(player) => player.isEliminated === true
				)?.length || 0;

			return {
				count: players?.length,
				players,
				usernames: players.map((player) => player?.username),
			};
		},
		currentRound: () => {
			return this.currentGame.currentRound;
		},
		totalRounds: () => {
			return this.currentGame.players?.length || 0;
		},
		isVotingRound: () => {
			return this.currentGame.playerTurns === this.activePlayers.count;
		},
		isGameFinished: () => {
			return currentRound === this.totalRounds && this.gameStage > 7;
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
			// username is found within an array of users, to find the current user, we have it saved in local storage
			localStorage.setItem("wolves-reapers-username-cache", this.username);
		},
		getCache() {
			const rawCache = localStorage.getItem("wolves-reapers-cache");
			if (rawCache) {
				const cache = JSON.parse(rawCache);
				this.currentGame = cache;
				this.code = cache.code;
				// username is found within an array of users, to find the current user, we have it saved in local storage
				this.username = localStorage.getItem("wolves-reapers-username-cache");
				return true;
			}
			return false;
		},
		newGame(username, code) {
			this.username = username;
			this.code = code;

			socket.emit("new-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.currentGame = res.game;
					this.setGameStage(this.gameStages.PlayingRound);
					this.setCache();
				} else {
					Error(res.error);
				}
			});
			this.updateClientState();
		},
		joinGame(username, code) {
			this.username = username;
			this.code = code;

			socket.emit("join-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.currentGame = res.game;
					this.setGameStage(this.gameStages.PlayingRound);
					this.setCache();
				} else {
					Error(res.error);
				}
			});
			this.updateClientState();
		},
		incrementPlayerTurns() {
			socket.emit("increment-turns", this.code, (res) => {
				if (res.isSuccessful) {
					this.currentGame = res.data;
				}
			});

			if (this.isVotingRound) {
				this.setGameStage(this.gameStages.VotingRound);
			}
		},
		castVote(votedUsername) {
			socket.emit("cast-vote", this.code, votedUsername, (res) => {
				if (res.isSuccessful) {
					this.currentGame = res.data;
				}
			});
			socket.on("player-eliminated", (res) => {
				if (res.isSuccessful) {
					this.currentGame = res.data;
					this.setGameStage(this.gameStages.PlayingRound);
				}
			});
		},
		reconnectToExistingGame() {
			const cache = this.getCache();
			if (cache) {
				this.joinGame(this.username, this.code);
			}
		},
		updateClientState() {
			// runs "update-client" listener
			socket.on("update-client", (res) => {
				this.currentGame = res.data;
			});
		},
		endCurrentGame() {
			if (this.isGameFinished) {
				socket.emit("end-game", this.code);
				this.setGameStage(this.gameStages.Home);
			}
		},
	},
});
