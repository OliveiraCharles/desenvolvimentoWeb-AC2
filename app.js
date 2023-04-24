const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = 3010;
const hostname = "localhost";

const controllerUsuario = require("./controllers/ControllerUsuario");
const controllerTarefa = require("./controllers/ControllerTarefa");
// const router = express.Router();

app.use("/usuario", controllerUsuario);
app.use("/tarefa", controllerTarefa);

mongoose
	.connect(`${process.env.DB_URI}`)
	.then(() => {
		app.listen(port, () => {
			console.log(
				"Server app works on 'http://" + hostname + ":" + port + "'."
			);
		});
	})
	.catch((error) => {
		console.log("DB Error: " + error);
	});

// app.use("/usuario", controllerUsuario);
// // app.use("/tarefa", controllerTarefa);

// router.post('/Usuarios', (req, res) => {
//   const usuario = new Usuario({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });

//   usuario.save((err) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(usuario);
//     }
//   });
// });

// module.exports = router;

// data: {

//     $gte: dataInicio,
//     $lte: dataFim
// }