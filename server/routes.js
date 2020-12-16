const express = require('express');
/*
https://expressjs.com/en/guide/routing.html
Use the express.Router class to create modular, mountable route handlers.
A Router instance is a complete middleware and routing system;
for this reason, it is often referred to as a “mini-app”...
*/
const router = express.Router();

const db = require('../database/connection');

//Endpoints
router.get('/encounter', db.generatePokemon);
router.get('/test', db.test);

module.exports = router;