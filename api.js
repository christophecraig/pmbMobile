const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bibli'
})

connection.connect()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/authors', (req, res) => {
  connection.query('SELECT * FROM authors', function(error, results) {
    if (error) throw error
    let authors = []
    results.forEach(row => {
      authors.push(row)
    })
    res.header("Access-Control-Allow-Origin", "*")
    res.send(JSON.stringify(authors))
  })
})

app.get('/author/:id', (req, res) => {
  connection.query('SELECT * FROM authors WHERE author_id = ' + req.params.id, function(error, results) {
    if (error) throw error
    res.send(JSON.stringify(results[0]))
  })
})

app.get('/record/:id', (req, res) => {
  connection.query('SELECT * FROM notices WHERE notice_id = ' + req.params.id, function(error, results) {
    if (error) throw error
    res.header("Access-Control-Allow-Origin", "*")
    res.send(JSON.stringify(results[0]))
  })
})



app.listen(3000)
