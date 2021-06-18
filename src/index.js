import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
