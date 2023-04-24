const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Tarefa = require("../models/ModelTarefa");

// Cadastrar tarefas
router.post("/", async (req, res) => {
	const { nome, dataIni, dataFim, usuarioID } = req.body;
	const dataIni2 = new Date(dataIni);
	const dataFim2 = new Date(dataFim);
	const tarefa = { nome, dataIni2, dataFim2, usuarioID };
	try {
		await Tarefa.create(tarefa);
		res.status(201).json(tarefa);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

// Atribuir Tarefa
router.put("/:tarefaID/usuario/:usuarioID", async (req, res) => {
	const tarefaID = req.params.tarefaID;
	const usuarioID = req.params.usuarioID;
	try {
		const tarefa = await Tarefa.findOne({ _id: tarefaID });
		tarefa.usuarioID = usuarioID;
		tarefa.save();
		res.status(200).json(tarefa);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

// Finalizar Tarefa
router.put("/:tarefaID/fim", async (req, res) => {
	const tarefaID = req.params.tarefaID;
	const dataFim = new Date(req.body.dataFim);
	try {
		const tarefa = await Tarefa.findOne({ _id: tarefaID });
		tarefa.dataFim = dataFim;
		tarefa.save();
		res.status(200).json(tarefa);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

// Listar Tarefas
router.get("/", async (req, res) => {
	const id = req.params.id;
	try {
		const tarefas = await Tarefa.find();
		res.status(200).json(tarefas);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

// Listar Tarefas Por Usuário

router.get("/usuario/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const tarefas = await Tarefa.find({ usuarioID: id });
		res.status(200).json(tarefas);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

// Listar Tarefas Por Periodo

router.get("/periodo/:ini/:fim", async (req, res) => {
	const ini = new Date(req.params.ini);
	const fim = new Date(req.params.fim);
	try {
		const tarefas = await Tarefa.find({
			dataIni: {
				$gte: ini,
				$lte: fim,
			},
		});
		res.status(200).json(tarefas);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

module.exports = router;
