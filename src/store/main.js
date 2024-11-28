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
				roles: players?.length ? players.map((player) => player.role) : [],
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
				roles: players?.length ? players.map((player) => player.role) : [],
			};
		},
		currentPlayer: (state) => {
			return state.isGameActive
				? state.game.players.find(
						(player) => player.username === state.username
				  )
				: null;
		},
		hasCurrentPlayerWon: (state) => {
			if (state.isPlayerReaper && state.hasReaperWon) {
				return true;
			}
			if (state.isPlayerWolf && state.hasWolfWon) {
				return true;
			}
			if (state.isPlayerHuman && state.isHumanWon) {
				return true;
			}
			return false;
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
			return state.isGameActive ? state.game.players?.length - 1 : 0;
		},
		hasReaperWon: (state) => {
			const isReaperWinner = state.activePlayers.roles.includes("Reaper");
			return state.game.isGameEnd && isReaperWinner;
		},
		hasWolfWon: (state) => {
			const isWolfWinner = state.activePlayers.roles.includes("Wolf");
			return state.game.isGameEnd && isWolfWinner;
		},
		hasHumansWon: (state) => {
			const hasHumansWon = !state.hasReaperWon && !state.hasWolfWon;
			return state.game.isGameEnd && hasHumansWon;
		},
		isPlayerReaper: (state) => {
			return state.currentPlayer?.role === "Reaper";
		},
		isPlayerWolf: (state) => {
			return state.currentPlayer?.role === "Wolf";
		},
		isPlayerHuman: (state) => {
			return state.currentPlayer?.role === "Human";
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
					this.dynamicGameStageSetter();
				} else {
					Error(res);
				}
			});
		},
		newGame(username, code) {
			this.username = username;
			this.code = code;

			socket.emit("new-game", socket.id, code, username, (res) => {
				if (res.isSuccessful) {
					this.game = res.game;
					this.dynamicGameStageSetter();
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
					this.dynamicGameStageSetter();
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
					this.dynamicGameStageSetter();
				}
			});
		},
		resetTurn() {
			this.isTurnEnded = false;
		},
		castVote(votedUsername) {
			this.hasVoted = true;
			socket.emit("cast-vote", this.code, votedUsername, (res) => {
				if (res.isSuccessful) {
					console.log("voted", res);
					this.game = res.game;
					this.dynamicGameStageSetter();
				}
			});
		},
		resetVote() {
			this.hasVoted = false;
		},
		reconnectToExistingGame() {
			this.getCache();
			if (this.code) {
				this.joinGame(this.username, this.code);
			}
		},
		dynamicGameStageSetter() {
			if (!this.isVotingRound) {
				this.setGameStage(this.gameStages.PlayingRound);
			}
			if (this.isVotingRound) {
				this.setGameStage(this.gameStages.VotingRound);
			}
			if (this.currentPlayer.isEliminated) {
				this.setGameStage(this.gameStages.PlayingRound);
			}
			if (this.hasReaperWon || this.hasWolfWon) {
				this.setGameStage(this.gameStages.WolfReaperWin);
			}
			if (this.hasHumansWon) {
				this.setGameStage(this.gameStages.HumansWin);
			}
		},
		syncClients() {
			socket.emit("sync-clients");
		},
		quitGame() {
			socket.emit("quit-game", this.code, this.username);
			this.setGameStage(this.gameStages.Home);
			this.clearCache();
		},
	},
});
