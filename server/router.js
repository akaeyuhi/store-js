"use strict";
const express = require('express');
const fs = require('fs/promises');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8')
        .then(data => res.send(data))
        .catch(err => res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        );
});

router.post('/', (req, res) => {
    handler(req, res, 'add', './server/db/userCart.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', './server/db/userCart.json');
});

router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', './server/db/userCart.json');
});

module.exports = router;