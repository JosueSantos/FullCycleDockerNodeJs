const express = require('express');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const peoples = []
connection.connect(function(err) {
    if (err) throw err;
    
    const sql = `INSERT INTO people(name) values('FullCycle')`
    connection.query(sql)

    connection.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err;
        result.forEach(element => {
            peoples.push(element.name)
        })
    });
});

app.get('/', (req, res) => {

    let html = '<h1>Full Cycle Rocks!</h1>'
    html += '<ol>'

    peoples.forEach(element => {
        html += "<li>" + element + "</li>";
    })
    html += "</ol>"

    res.send(html)
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
})