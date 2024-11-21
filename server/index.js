import { Server } from "socket.io";
import { setUpNewGame, createPlayer, findGameIndexByCode } from "./gameMethods";

const games = [];

const io = new Server(3000, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	socket.on("new-game", (code, username, isSuccessful) => {
		const newGame = setUpNewGame(code, username, games);
		if (newGame.isSuccessful) {
			games.push(newGame.game);
			isSuccessful(true);
		} else {
			isSuccessful(false);
		}
	});

	socket.on("join-game", (code, username, isSuccessful) => {
		const index = findGameIndexByCode(code, games).index;
		const newPlayer = createPlayer(code, username, games);

		// add new player to game
		if (newPlayer.isSuccessful && index) {
			games[index].players.push(newPlayer.player);
			return isSuccessful(true);
		}
		isSuccessful(false);
	});

	socket.on("get-updated-game-state", (code, updatedState) => {
		const index = findGameIndexByCode(code, games).index;
		if (index) {
			updatedState(games[index]);
		} else {
			updatedState(null);
		}
	});
});

io.listen(3000);
