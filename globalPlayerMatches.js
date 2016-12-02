var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var data = [];
var fields = ['Player', 'Matches'];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/players/index.html')
.find('div#matches table.table.tbl-p-most-matches tr')
.set({
    'Player': 'td.tbl-playername.teamname-nolink a.text',
    'Matches': 'td.tbl-matches-num span.text'
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  console.log(data);
  var result = json2csv({ data: data, fields: fields });
  console.log(result);
  fs.writeFile('7gloablPlayerMatches.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
})
.log(console.log)
.error(console.log)
.debug(console.log);
