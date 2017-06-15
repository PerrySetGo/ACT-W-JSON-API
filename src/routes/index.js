import express from 'express';
import config from '../config';
import initializeDb from '../db';
import attendee from '../controller/attendee';

let router = express();

// connect to db
initializeDb(db => {

  // api routes v1 (/v1)
  router.use('/attendee', attendee({ config, db }));
});

export default router;
