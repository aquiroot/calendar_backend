const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarCampos');
const isDate = require('../helpers/isDate');
const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/events');

/*
  Rutas de eventos / Events
  host + /api/events
*/

// Usa el middleware para validar el token en todas las rutas
router.use(validarJWT);

// Rutas

router.get('/', getEventos);

router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'La fecha de inicio es obligatoria').custom(isDate),
		check('end', 'La fecha de fin es obligatoria').custom(isDate),
		validarCampos,
	],
	crearEvento
);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
