'use strict'

let express = require('express')
let http = require('http')

let redir_app = express()

redir_app.all('/*', (req, res) => {
  if(req.isSocket) return res.redirect('wss://' + req.headers.host + req.url)
  return res.redirect('https://' + req.headers.host + req.url)
})

let httpServer_redir = http.createServer(redir_app)

httpServer_redir.listen(3003, () => {
  console.log('Redirector is listening')
})
