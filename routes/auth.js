const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validarCampos');
const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../controllers/auth');

/*
  Rutas de usuarios / Auth
  host + /api/auth
*/

router.post(
	'/new',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email debe ser valido').isEmail(),
		check('password', 'El password debe tener mas de 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	crearUsuario
);

router.post(
	'/',
	[
		check('email', 'El email debe ser valido').isEmail(),
		check('password', 'El password debe tener mas de 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	loginUsuario
);

router.get('/renew', revalidarToken);

module.exports = router;
