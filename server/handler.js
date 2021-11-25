"use strict";

const fs = require('fs/promises');
const cart = require('./cart.js');

const actions = {
    add: cart.add,
    change: cart.change,
};

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8')
        .then(async data => {
            const newCart = actions[action](JSON.parse(data), req);
            await fs.writeFile(file, newCart).catch(() => res.send('{"result": 0}'))
            res.send('{"result": 1}');
        })
        .catch();
};

module.exports = handler;