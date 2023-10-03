/**
 *    ____                  __________
 *   / __ \_   _____  _____/ __/ / __ \_      __
 *  / / / / | / / _ \/ ___/ /_/ / / / / | /| / /
 * / /_/ /| |/ /  __/ /  / __/ / /_/ /| |/ |/ /
 * \____/ |___/\___/_/  /_/ /_/\____/ |__/|__/
 *
 * The copyright indication and this authorization indication shall be
 * recorded in all copies or in important parts of the Software.
 *
 * @github https://github.com/0verfl0w767
 *
 */
const express = require('express')
const fs = require('fs')
const http = require('http')

const app = express()

// app.get('/', (req, res) => {
//   res.status(200).sendFile(__dirname + '/page/index.html')
// })

app.use('/', express.static(__dirname + '/public'))

app.get('/test_login', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/test_login.html')
})

app.get('/test1', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/test1.html')
})

app.get('/test2', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/test2.html')
})

app.get('/basket', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/basket.html')
})

app.get('/closed', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/closed.html')
})

app.get('/warning', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/warning.html')
})

app.get('/api/basket', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync(__dirname + '/convert1.json', 'utf8'))
  res.status(200).json(jsonData)
})

app.get('/api/closed', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync(__dirname + '/convert3.json', 'utf8'))
  res.status(200).json(jsonData)
})

app.get('/api/warning', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync(__dirname + '/convert4.json', 'utf8'))
  res.status(200).json(jsonData)
})

app.get('*', (req, res) => {
  res.status(404).json({statusCode: 404, message: 'unknown request.'})
})

http.createServer(app).listen(4646, '0.0.0.0')
