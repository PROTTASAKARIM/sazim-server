const cors = require('cors');
const express = require('express');
const client = require('./connection.js');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());


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
app.get('/products', (req, res) => {
    client.query(`Select * from products`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})
app.post('/products', (req, res) => {
    const user = req.body;
    console.log(user.p_title)
    let insertQuery = `insert into products(p_title, p_categories, p_description, p_price,p_rent,p_rentoption,p_user) 
                       values('${user.p_title}', '${user.p_categories}', '${user.p_description}', '${user.p_price}','${user.p_rent}','${user.p_rentoption}','${user.p_user}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else { console.log(err.message) }
    })
    client.end;
})
