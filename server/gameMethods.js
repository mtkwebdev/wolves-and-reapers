const gameTemplate = {
	code: null, // uuid
	totalRounds: 1, // players.length + 1
	currentRound: 1, // initial round
	playerTurns: 1, // once playerTurns == activePlayerCount (not eliminated) then voting occurs, then turns goes back to 0
	activePlayerCount: 1, // players that aren't eliminated + 1 | if count = 2, game ends with player active player evaluation
	players: [],
};

const playerTemplate = {
	id: null,
	username: null,
	role: 0,
	isReady: false,
	isEliminated: false,
};

const playerRoles = {
	Human: 0,
	Wolf: 1,
	Reaper: 2,
};

export const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

const playerRoleKeys = Object.keys(playerRoles);

const assignAsAnyPlayerRoles = () => {
	return playerRoles[playerRoleKeys[getRandomInt(3)]];
};

const assignAsWolfOrHuman = () => {
	const roles = playerRoleKeys.filter((role) => role !== "Reaper");
	return playerRoles[playerRoleKeys[getRandomInt(2)]];
};
const assignAsReaperOrHuman = () => {
	const roles = playerRoleKeys.filter((role) => role !== "Wolf");
	return playerRoles[roles[getRandomInt(2)]];
};

export const setUpNewGame = (id, code, username, games) => {
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
		newPlayer.role = playerRoles[assignAsAnyPlayerRoles] || false;
		newPlayer.username = username;
		newPlayer.id = id;

		// update player count
		newGame.players.push(newPlayer);

		// assign game code to game state
		newGame.code = code;

		return { isSuccessful: true, game: newGame, error: "" };
	}
};

export const createPlayer = (id, code, username, games) => {
	const result = {
		isSuccessful: false,
		player: null,
		error: "Error: unable to join game, please check your game code",
	};

	const index = findGameIndexByCode(code).index;
	const newPlayer = playerTemplate;
	newPlayer.username = username;
	newPlayer.id = id;

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
		newPlayer.role = assignAsWolfOrHuman();
		result.isSuccessful = true;
	}
	if (isWolfAssigned) {
		newPlayer.role = assignAsReaperOrHuman();
		result.isSuccessful = true;
	}
	if (!isReaperAssigned || !isWolfAssigned) {
		newPlayer.role = assignAsAnyPlayerRoles();
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
	const hasGameIndex = typeof gameIndex === "number" && gameIndex > -1;

	if (hasGameIndex) {
		return { hasIndex: true, index: gameIndex };
	} else {
		return { hasIndex: false, index: gameIndex };
	}
};
