const mongoose = require("mongoose");
const tarefa = mongoose.model("tarefa", {
	nome: String,
	dataIni: Date,
	dataFim: Date,
	usuarioID: String
});
module.exports = tarefa;