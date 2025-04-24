const express = require('express');
const {httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpAddNewLaunch);
launchesRouter.delete('/launches/abort/:id', httpDeleteLaunch);

module.exports = launchesRouter;