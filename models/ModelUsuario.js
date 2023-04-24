const mongoose = require("mongoose");
const usuario = mongoose.model("usuario", {
    nome: String,
    email: String,
    password: String
});
module.exports = usuario;