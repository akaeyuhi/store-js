"use strict";
const express = require("express");
const fs = require("fs/promises");
const router = require("./router.js");
const app = express();

app.use(express.json());
app.use('/', express.static('./client'));
app.use('/api/cart', router);

app.get('/api/products', async (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(JSON.stringify({result: 0, text: err}));
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});