const { response } = require('express');
const Evento = require('../models/Event');

const getEventos = async (req, res = response) => {
	try {
		const eventos = await Evento.find().populate('user', 'name');

		res.json({
			ok: true,
			eventos,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'error',
		});
	}
};

const crearEvento = async (req, res = response) => {
	const evento = new Evento(req.body);
	try {
		evento.user = req.uid;

		const eventoGuardado = await evento.save();

		res.json({
			ok: true,
			msg: 'Evento creado',
			eventoGuardado,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'No se pudo guardar el evento',
		});
	}
};

const actualizarEvento = async (req, res = response) => {
	const eventoId = req.params.id;

	try {
		const evento = await Evento.findById(eventoId);
		const uid = req.uid;

		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'El id de evento no existe',
			});
		}

		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No esta autorizado a realizar la accion',
			});
		}

		const nuevoEvento = {
			...req.body,
			user: uid,
		};

		const eventoActualizado = await Evento.findByIdAndUpdate(
			eventoId,
			nuevoEvento,
			{ new: true }
		);

		res.json({
			ok: true,
			evento: eventoActualizado,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'error',
		});
	}
};

const eliminarEvento = async (req, res = response) => {
	const eventoId = req.params.id;

	try {
		const evento = await Evento.findById(eventoId);
		const uid = req.uid;

		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'El id de evento no existe',
			});
		}

		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No esta autorizado a realizar la accion',
			});
		}

		await Evento.findOneAndDelete(eventoId);

		res.json({
			ok: true,
			msg: 'eliminado',
			evento,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'error',
		});
	}
};

module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
};
