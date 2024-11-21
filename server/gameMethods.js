const gameTemplate = {
	code: null, // uuid
	totalRounds: 1, // players.length + 1
	currentRound: 1, // initial round
	playerTurns: 1, // once playerTurns == activePlayerCount (not eliminated) then voting occurs, then turns goes back to 0
	activePlayerCount: 1, // players that aren't eliminated + 1 | if count = 2, game ends with player active player evaluation
	players: [],
};

const playerTemplate = {
	username: null,
	group: null,
	role: 0,
	isReady: false,
	isEliminated: false,
};

const playerRoles = {
	Human: 0,
	Wolf: 1,
	Reaper: 2,
};

const playerRoleKeys = Object.keys(playerRoles);
const assignAsAnyPlayerRoles = playerRoles[playerRoleKeys[getRandomInt(2)]];
const assignAsWolfOrHuman = playerRoles[playerRoleKeys[getRandomInt(1)]];
const assignAsHuman = playerRoles.Human;

export const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

export const setUpNewGame = (username, code, games) => {
	const isGameAlreadyExists = findGameIndexByCode(code, games).hasIndex;

	if (isGameAlreadyExists) {
		return {
			isSuccessful: false,
			game: null,
			error: `Error: unable to create game, please refresh the page and try again`,
		};
	} else {
		// create game  and player from templates
		const newGame = gameTemplate;
		const newPlayer = playerTemplate;

		// assign initial role for new player
		newPlayer.role = playerRoles[assignAsAnyPlayerRoles];
		newPlayer.username = username;

		// update player count
		newGame.players.push(newPlayer);

		// assign game code to game state
		newGame.code = code;

		return { isSuccessful: true, game: newGame, error: "" };
	}
};

export const createPlayer = (username, code, games) => {
	const result = {
		isSuccessful: false,
		player: null,
		error: "Error: unable to join game, please check your game code",
	};

	const index = findGameIndexByCode(code).index;
	const newPlayer = playerTemplate;
	newPlayer.username = username;

	// check for reapers
	const isReaperAssigned = games[index]?.players.some((player) => {
		player.role === playerRoles.Reaper;
	});

	// check for wolves
	const isWolfAssigned = games[index]?.players.some((player) => {
		player.role === playerRoles.Wolf;
	});

	// assign player a role
	if (isReaperAssigned) {
		newPlayer.role = assignAsWolfOrHuman;
		result.isSuccessful = true;
	}
	if (isWolfAssigned) {
		newPlayer.role = assignAsHuman;
		result.isSuccessful = true;
	}
	if (!isReaperAssigned || !isWolfAssigned) {
		newPlayer.role = assignAsAnyPlayerRoles;
		result.isSuccessful = true;
	}

	result.player = newPlayer;

	if (result.player.role) {
		result.error = "";
	}
	return result;
};

export const findGameIndexByCode = (code, games) => {
	const gameIndex = games.findIndex((game) => game.code === code);

	// We check if the game index is a number because the index could be 0, which is falsy.
	const hasGameIndex = typeof gameIndex === "number";

	if (hasGameIndex) {
		return { hasIndex: true, index: gameIndex };
	} else {
		return { hasIndex: false, index: gameIndex };
	}
};
