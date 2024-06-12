import logger from 'jet-logger';

import EnvVars from './constants/EnvVars';
import server from './server';
import {connectDB} from './database/index'
// Database Connector
connectDB();
// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
