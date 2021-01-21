const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
dbConnection();

app.use(cors());

// Directorio publico
app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
	console.log('Server running on port: ' + PORT);
});
