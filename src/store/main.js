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
			game: {},
			isTurnEnded: false,
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
		isGameActive: (state) => {
			return !!state.game && !!state.game?.code;
		},
		activePlayers: (state) => {
			const players = state.isGameActive
				? state.game?.players.filter((player) => player.isEliminated === false)
				: null;

			return {
				count: players?.length,
				players,
				usernames: players?.length
					? players.map((player) => player.username)
					: [],
			};
		},
		eliminatedPlayers: (state) => {
			const players = state.isGameActive
				? state.game?.players.filter((player) => player.isEliminated === true)
				: null;

			return {
				count: players?.length,
				players,
				usernames: players.length
					? players.map((player) => player.username)
					: [],
			};
		},
		currentPlayer: (state) => {
			return state.isGameActive
				? state.game.players.find(
						(player) => player.username === state.username
				  )
				: null;
		},
		canPlayerTakeTurns: (state) => {
			return !state.isTurnEnded && state.currentPlayer?.isEliminated === false;
		},
		currentRound: (state) => {
			return state.isGameActive ? state.game?.currentRound : 0;
		},
		totalRounds: (state) => {
			return state.isGameActive ? state.game?.players?.length : 0;
		},
		isVotingRound: (state) => {
			return state.isGameActive
				? state.game?.playerTurns === state.activePlayers.count
				: false;
		},
	},
	actions: {
		setGameStage(value) {
			if (this.gameStage <= 9) this.gameStage = value;
		},
		clearCache() {
			localStorage.removeItem(cacheKey);
			this.code = null;
			location.reload();
		},
		setCache() {
			const cache = JSON.stringify(this.game);
			localStorage.setItem("wolves-reapers-cache", cache);
			// username is found within an array of users, to find the current user, we have it saved in local storage
			localStorage.setItem("wolves-reapers-username-cache", this.username);
		},
		getCache() {
			const rawCache = localStorage.getItem("wolves-reapers-cache");
			if (rawCache) {
				const cache = JSON.parse(rawCache);
				this.game = cache;
				this.code = cache.code;
				// username is found within an array of users, to find the current user, we have it saved in local storage
				this.username = localStorage.getItem("wolves-reapers-username-cache");
				return true;
			}
			return false;
		},
		bindEvents() {
			socket.on("game-sync", (res) => {
				console.log(res);
				if (res.isSuccessful) {
					console.log("synced", this.username);
					this.game = res.game;
					if (this.isVotingRound) {
						this.setGameStage(this.gameStages.VotingRound);
					}
					if (this.currentPlayer.isEliminated) {
						this.setGameStage(this.gameStages.PlayingRound);
					}
				} else {
					Error(res);
				}
			});
			socket.on("player-eliminated", (res) => {
				if (res.isSuccessful) {
					this.game = res.game;
					this.setGameStage(this.gameStages.PlayingRound);
					// reset players turn now that we will enter into a new round
					this.isTurnEnded = false;
				}
			});
		},
		newGame(username, code) {
			this.username = username;
			this.code = code;

			socket.emit("new-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.game = res.game;
					this.setGameStage(this.gameStages.PlayingRound);
					this.setCache();
				} else {
					Error(res.error);
				}
			});
		},
		joinGame(username, code) {
			this.username = username;
			this.code = code;

			socket.emit("join-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.game = res.game;
					this.setCache();
					if (this.isVotingRound) {
						this.setGameStage(this.gameStages.VotingRound);
					}
					if (this.currentPlayer.isEliminated) {
						this.setGameStage(this.gameStages.PlayingRound);
					}
				} else {
					Error(res.error);
				}
			});
			this.syncClients();
		},
		incrementPlayerTurns() {
			this.isTurnEnded = true;
			socket.emit("increment-turns", this.code, (res) => {
				if (res.isSuccessful) {
					this.game = res.game;
					if (this.isVotingRound) {
						this.setGameStage(this.gameStages.VotingRound);
					}
				}
			});
		},
		castVote(votedUsername) {
			socket.emit("cast-vote", this.code, votedUsername, (res) => {
				if (res.isSuccessful) {
					this.game = res.game;
				}
			});
		},
		reconnectToExistingGame() {
			const cache = this.getCache();
			if (cache) {
				this.joinGame(this.username, this.code);
			}
		},
		syncClients() {
			socket.emit("sync-clients");
		},
	},
});
