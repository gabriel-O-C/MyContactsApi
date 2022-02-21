const express = require('express');
require('express-async-errors');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);
app.listen(3001, () => console.log('Server is running at http://localhost:3001'));
