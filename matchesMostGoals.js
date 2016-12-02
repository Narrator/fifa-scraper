var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var data = [];
var fields = ['Team Home', 'Score', 'Team Away', 'Goals'];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/index.html')
.find('div#matches table.table.tbl-m-most-goals tr')
.set({
    'Team Home': 'td.tbl-matchrow div.mu-m div.t.home span.t-nText',
    'Score': 'td.tbl-matchrow div.mu-m div.s span.s-scoreText',
    'Team Away': 'td.tbl-matchrow div.mu-m div.t.away span.t-nText',
    'Goals': 'td.tbl-goalfor span.text'
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  console.log(data);
  var result = json2csv({ data: data, fields: fields });
  console.log(result);
  fs.writeFile('8matchesMostGoals.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
})
.log(console.log)
.error(console.log)
.debug(console.log);
