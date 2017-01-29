var fs = require('fs')
var level = require('level')
var hyperlog = require('hyperlog')
var airpaste = require('airpaste')
var $ = document.querySelector.bind(document)

var db = level('test')
var log = hyperlog(db)

var rs = log.createReadStream({live: true})

var stream = airpaste()

stream
  .pipe(log.replicate({live: true}))
  .pipe(stream)

rs.on('data', function(data) {
  var val = JSON.parse(data.value)
  var div = document.createElement('div')
  div.innerHTML = val.message
  $('#message').appendChild(div)
})

$('button').onclick = function () {
  var val = $('textarea').value
  log.append(JSON.stringify({
    message: val
  }))
}


