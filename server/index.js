import { Server } from "socket.io";
import { setUpNewGame, createPlayer, findGameIndexByCode } from "./gameMethods";

const games = [];

const io = new Server(3000, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	socket.on("new-game", (code, username, callback) => {
		const newGame = setUpNewGame(code, username, games);
		if (newGame.isSuccessful) {
			socket.join(code);
			games.push(newGame.game);
			// return results
			callback({ isSuccessful: true, data: newGame, error: newGame.error });
		} else {
			callback({ isSuccessful: false, data: null, error: newGame.error });
		}
	});

	socket.on("join-game", (code, username, callback) => {
		const index = findGameIndexByCode(code, games).index;
		const newPlayer = createPlayer(code, username, games);

		// add new player to game
		if (newPlayer.isSuccessful && index) {
			socket.join(code);
			games[index].players.push(newPlayer.player);

			callback({
				isSuccessful: true,
				data: games[index],
				error: newPlayer.error,
			});

			// update players list in everyone else's game
			socket.to(code).emit("get-updated-game-state", games[index]);
		} else {
			callback({
				isSuccessful: false,
				data: games[index],
				error: newPlayer.error,
			});
		}
	});

	socket.on("get-updated-game-state", (code, callback) => {
		const index = findGameIndexByCode(code, games).index;
		if (index) {
			callback({ isSuccessful: true, data: games[index], error: "" });
		} else {
			callback({
				isSuccessful: false,
				data: games[index],
				error: "Error: unable to update game, please leave and join again",
			});
		}
	});
});

io.listen(3000);
