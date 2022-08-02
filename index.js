const cors = require('cors');
const express = require('express');
const client = require('./connection.js');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Hello From sazim Task")
})
app.listen(port, () => {
    console.log(`Sever is now listening at port ${port}`);
})

client.connect();

app.get('/product', (req, res) => {
    client.query(`Select * from product`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})
