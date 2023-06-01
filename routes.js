const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createPool({
    host: 'localhost',
    user: 'brabo',
    password: 'tacaro',
    database: 'BANCO_TACARO'
});

app.get('/appquery/:ean', function (req, res) {
    connection.getConnection(function (err, connection) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        connection.query('SELECT * FROM tb_product WHERE product_ean=' + req.params.ean + ' ;', (error, results) => {
            if (error) {
                console.log("Error is: " + error);
            } else {
                if (results.length > 0) {
                    console.log(results[0]);
                    res.send(results);
                }
            }
        });
    });
});

// Iniciando o servidor.
app.listen(2000, () => {
    console.log('http://localhost:2000/appquery/7891000110874');
});