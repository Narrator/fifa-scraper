var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var data = [];
var fields = ['Player', 'Goals'];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/players/index.html')
.find('table.table.tbl-p-most-goals-m tr')
.set({
    'Player': 'td.tbl-playername a.text',
    'Goals': 'td.tbl-goalfor span.text',
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  console.log(data);
  var result = json2csv({ data: data, fields: fields });
  console.log(result);
  fs.writeFile('goalsOneMatchPlayer.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
})
.log(console.log)
.error(console.log)
.debug(console.log);
