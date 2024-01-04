const app = require("./app");
const { database } = require("./utils");

// const HelloWorld = require('./routes/helloWorld');
// const BicicletaRoutes = require('./routes/bicicletaRoutes');
// const TotemRoute = require('./routes/TotemRoute');
// const TrancaRoute = require('./routes/trancaRoutes');

// class Server{
//     constructor(app = express()) {
//         this.middleWare(app);
//         this.database();
//         this.allRoutes(app);
//         this.startServer(app);
//     }

//     async middleWare(app) {
//         app.use(express.json());
//     }

//     async database() {
//         try {
//           await sqConfig.authenticate();
//           console.log("Conexao bem sucedida!");
//         } catch (error) {
//           console.error("Nao foi possivel se conectar", error);
//         }
//     }

//     /**
//      * @description Todas as routes devem ser inicializadas aqui
//     */
//     async allRoutes(app){

//         const prefix = process.env.NODE_ENV === 'production' ? '/equipamento-grupo-1/' : '';
//         const helloWorld = new HelloWorld();
//         const bicicletaRoutes = new BicicletaRoutes();
//         const totemRoute = new TotemRoute();
//         const trancaRoute = new TrancaRoute();

//         app.use(prefix, helloWorld.getRouter());
//         app.use(prefix, bicicletaRoutes.getRouter());
//         app.use(prefix, totemRoute.getRouter());
//         app.use(prefix, trancaRoute.getRouter());
//     }

//     async startServer(app) {
//         const PORT = process.env.PORT || 3002;
//         app.listen(PORT, () => {
//             console.log(`Server is listening to http:${process.env.DB_HOST}:${PORT}`);
//         });
//     }
// }

// let s1 = new Server();

(async function () {
	try {
		await database.authenticate(); 
		// await database.synchronize();   
		app.start(8001);
	} catch (err) { 
		console.error("Erro ao iniciar o servidor: ", err);
	}
})();
