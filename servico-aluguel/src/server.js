const app = require("./app");
const { database } = require("./utils");

(async function () {
	try {
		await database.authenticate(); 
		// await database.synchronize();   
		app.start(8000);
	} catch (err) { 
		console.error("Erro ao iniciar o servidor: ", err);
	}
})();
