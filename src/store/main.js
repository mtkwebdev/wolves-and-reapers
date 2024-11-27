import { defineStore } from "pinia";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.65:8080/", { reconnect: false });

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
			hasVoted: false,
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
				WolfReaperWin: 6,
				HumansWin: 7,
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
				usernames: players?.length
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
		canPlayerTakeVote: (state) => {
			return state.isTurnEnded && state.currentPlayer?.isEliminated === false;
		},
		currentRound: (state) => {
			return state.isGameActive ? state.game?.currentRound : 0;
		},
		totalRounds: (state) => {
			return state.isGameActive ? state.game?.players?.length : 0;
		},
		hasReaperWon: (state) => {
			const playerCount = state.activePlayers.length === 2;
			const isReaperWinner = state.activePlayers.players.includes("Reaper");
			return playerCount && isReaperWinner;
		},
		hasWolfWon: (state) => {
			const playerCount = state.activePlayers.length === 2;
			const isWolfWinner = state.activePlayers.players.includes("Wolf");
			return playerCount && isReaperWinner;
		},
		hasHumansWon: (state) => {
			return !state.hasReaperWon && !state.hasWolfWon;
		},
		isPlayerReaper: (state) => {
			state.currentPlayer?.role === "Reaper";
		},
		isPlayerWolf: (state) => {
			state.currentPlayer?.role === "Wolf";
		},
		isPlayerHuman: (state) => {
			state.currentPlayer?.role === "Human";
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
			// username is found within an array of users, to find the current user, we have it saved in local storage
			const username = localStorage.getItem("wolves-reapers-username-cache");
			console.log(username);
			this.username = username;
			const rawCache = localStorage.getItem("wolves-reapers-cache");
			if (rawCache) {
				const cache = JSON.parse(rawCache) || {};
				this.game = cache;
				this.code = cache?.code || null;
			}
		},
		bindEvents() {
			socket.on("game-sync", (res) => {
				console.log(res);
				if (res.isSuccessful) {
					console.log("synced", this.username);
					this.game = res.game;
				} else {
					Error(res);
				}
			});
			socket.on("player-eliminated", (res) => {
				if (res.isSuccessful) {
					// reset players turn now that we will enter into a new round
					this.isTurnEnded = false;
					this.hasVoted = false;
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
					this.setGameStage(this.gameStages.PlayingRound);
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
			this.hasVoted = true;
			socket.emit("cast-vote", this.code, votedUsername, (res) => {
				if (res.isSuccessful) {
					console.log("voted", res);
					this.game = res.game;
					this.isTurnEnded = false;
					this.hasVoted = false;
				}
			});
		},
		reconnectToExistingGame() {
			this.getCache();
			if (this.code) {
				this.joinGame(this.username, this.code);
			}
		},
		dynamicGameStageSetter() {
			if (this.currentPlayer.isEliminated) {
				this.setGameStage(this.gameStages.PlayingRound);
			}
			if (!this.isVotingRound) {
				if (this.hasReaperWon) {
					this.setGameStage(this.gameStages.PlayingRound);
				}
				if (this.hasWolfWon) {
				}
				if (this.hasHumansWon) {
				}
				this.setGameStage(this.gameStages.PlayingRound);
			}
			if (this.isVotingRound) {
				this.setGameStage(this.gameStages.VotingRound);
			}
		},
		syncClients() {
			socket.emit("sync-clients");
		},
		quitGame() {
			this.setGameStage(this.gameStages.Home);
			this.clearCache();
		},
	},
});
