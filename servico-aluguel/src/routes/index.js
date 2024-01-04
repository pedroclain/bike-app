const databaseRouter = require("./database.router");
const trancaRouter = require("./tranca.router");
const ciclistaRouter = require("./ciclista.router");
const totemRouter = require("./totem.router");
const funcionarioRouter = require("./funcionario.router");
const cartaoCreditoRouter = require("./cartao-credito.router");
const rootRouter = require("./root.router");

module.exports = {
  databaseRouter,
  trancaRouter,
  ciclistaRouter,
  totemRouter,
  funcionarioRouter,
  cartaoCreditoRouter,
  rootRouter
}