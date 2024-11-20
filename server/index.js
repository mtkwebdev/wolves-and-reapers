import { Server } from "socket.io";

const gamesAsGroupNames = [];

const io = new Server(3000, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("connected", socket);
});

io.listen(3000);

// const playerRoles = [
// 	{
// 		id: 0,
// 		name: "Human",
// 	},
// 	{
// 		id: 1,
// 		name: "Wolf",
// 	},
// 	{
// 		id: 2,
// 		name: "Reaper",
// 	},
// ];

// const playerTemplate = {
// 	name: null,
// 	group: null,
// 	role: {},
// 	isReady: false,
// 	isEliminated: false,
// };

// totalPlayerCount: 0,
// eliminatedPlayersCount: 0,
// players: [],
// player: {},
