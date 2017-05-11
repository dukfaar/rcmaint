'use strict'

let fs = require('fs')
let express = require('express')
let https = require('https')
let path = require('path')

let maint_app = express()

let sslBase = '/etc/letsencrypt/live/dukfaar.com/'

let credentials = {
  key: fs.readFileSync(sslBase + 'privkey.pem'),
  cert: fs.readFileSync(sslBase + 'cert.pem'),
  ca: fs.readFileSync(sslBase + 'chain.pem')
}

let httpsServer_maint = https.createServer(credentials, maint_app)

maint_app.use('/public', express.static(path.join(__dirname, '../public')))

maint_app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../public') })
})

httpsServer_maint.listen(3002, () => {
  console.log('Secure Maintenance cat is watching')
})
