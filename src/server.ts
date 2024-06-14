/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors"
import helmet from 'helmet';

import 'express-async-errors';

import EnvVars from './constants/EnvVars';

import { NodeEnvs } from './constants/misc';
import errorHandler from './core/core.error';
import { AuthRoute, SuperRoute, BusinessRoute , OrderRoute} from './routes';

// **** Variables **** //

const app = express();


// **** Setup **** //

// Basic middleware
//Server Security Middlewre
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  //app.use(helmet());
}

app.all('/', (req, res) => {
  res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({
      success: true,
      status: 'success',
      message: `Welcome to ${process.env.NAME} Backend`,
      version: '0.0.1',
      developer: 'https://github.com/Simplystina/Pipeops-Hackathon-Backend',
      health: "Completely Set Up!, 100% We're Ready To Go",
      server_time: `${new Date()}`,
      data: { ...req.body, ...req.query }
    });
});

// Add APIs, must be after middleware
app.use('/v1/auth', AuthRoute);
app.use('/v1/super', SuperRoute);
app.use('/v1/business', BusinessRoute);
app.use('/v1/order', OrderRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    status: 'Resource Not Found',
    error: '404 Content Do Not Exist Or Has Been Deleted'
  });
});

app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.error(err);
  console.log('Node NOT Exiting...'); // Override Grace full exist [EXPERIMENTAL]
});
module.exports = app


export default app;
