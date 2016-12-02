var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var data = [];
var fields = ['World Cup', 'No. of Teams', 'Matches played', 'Goals', 'Average Goals', 'Attendance'];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/index.html')
.find('table.table.tbl-alleditions tr')
.set({
    'World Cup': 'td.tbl-seasonname a.text',
    'No. of Teams': 'td.tbl-team-num span.text',
    'Matches played': 'td.tbl-matches-num span.text',
    'Goals': 'td.tbl-goalfor span.text',
    'Average Goals': 'td.tbl-goalavg',
    'Attendance': 'td.tbl-attendanceavg'
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  console.log(data);
  var result = json2csv({ data: data, fields: fields });
  console.log(result);
  fs.writeFile('globalWorldCup.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
})
.log(console.log)
.error(console.log)
.debug(console.log);
