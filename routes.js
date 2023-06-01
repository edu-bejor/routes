const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createPool({
    host: 'localhost',
    user: 'brabo',
    password: 'tacaro',
    database: 'BANCO_TACARO'
});

app.get('/queryproduct/:ean', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) {
            console.error(`MYSQL ERROR: ${err.stack}`);
            return;
        }
        connection.query(`SELECT * FROM tb_product WHERE product_ean= ${req.params.ean} ; `, (error, results) => {
            if (error) {
                console.log(`MYSQL ERROR: ${error}`);
            } else {
                if (results.length > 0) {
                    console.log(results);
                    res.send(results);
                } else {
                    console.log(`Produto com EAN ${req.params.ean} não foi encontrado.`);
                }
            }
            console.log("================================");
        });
    });
});

app.get('/queryprice/:ean', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) {
            console.error(`MYSQL ERROR: ${err.stack}`);
            return;
        }
        connection.query(`SELECT * FROM tb_price WHERE product_ean_fk=${req.params.ean} ORDER BY product_price ASC ;`, (error, results) => {
            if (error) {
                console.log(`MYSQL ERROR: ${error}`);
            } else {
                if (results.length > 0) {
                    console.log(results);
                    res.send(results);
                } else {
                    console.log(`Preço do produto com EAN ${req.params.ean} não foi encontrado.`);
                }
            }
            console.log("================================");
        });
    });
});

// Iniciando o servidor.
app.listen(2000, () => {
    let data = new Date();
    console.log(`Node started at ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}.`);
});
