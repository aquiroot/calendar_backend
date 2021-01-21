const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

		jwt.sign(
			payload,
			process.env.JWT_SEED,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se logro generar el token');
				}

				resolve(token);
			}
		);
	});
};

module.exports = {
	generarJWT,
};
