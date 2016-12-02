var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var data = [];
var fields = ['Teams', 'Wins'];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/index.html')
.find('table.table.tbl-t-most-victories tr')
.set({
    'Team': 'td.tbl-teamname div.t-n span.t-nText',
    'Wins': 'td.tbl-edition-wins span.wins'
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  console.log(data);
  var result = json2csv({ data: data, fields: fields });
  console.log(result);
  fs.writeFile('mostVictories.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
})
.log(console.log)
.error(console.log)
.debug(console.log);
