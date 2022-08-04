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

app.get('/rent', (req, res) => {
    client.query(`Select * from rent`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('products/myproducts', (req, res) => {
    const p_user = req.query.p_user;
    console.log(p_user)
    client.query(`Select * from products where p_user='${p_user}'`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.delete('/products', (req, res) => {
    let deleteQuery = `delete from products where p_id=${req.query.p_id}`

    client.query(deleteQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})


app.post('/products', (req, res) => {
    const user = req.body;
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
app.put('/products/:p_id', (req, res) => {
    let p_id = req.params.p_id
    let user = req.body;
    console.log(user)
    let updateQuery = `update products
                       set p_title = '${user.p_title}',
                       p_categories = '${user.p_categories}',
                       p_description = '${user.p_description}',
                       p_price = '${user.p_price}',
                       p_rent = '${user.p_rent}',
                       p_rentoption = '${user.p_rentoption}',
                       p_user = '${user.p_user}'
                       where p_id = ${p_id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send(result)
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.get('/products/:p_id', (req, res) => {
    client.query(`Select * from products where p_id=${req.params.p_id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/rent', (req, res) => {
    const user = req.body;
    console.log(user)
    let insertQuery = `insert into rent( p_id, r_start,r_end) 
                       values('${user.p_id}', '${user.r_start}', '${user.r_end}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.post('/order', (req, res) => {
    const user = req.body;
    console.log(user)
    let insertQuery = `INSERT INTO orders(
        p_id, o_date)
                       values('${user.p_id}', '${user.o_date}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.get('/rent', (req, res) => {
    client.query(`Select * from products where p_id=${req.params.p_id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

