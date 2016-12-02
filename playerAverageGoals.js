var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var data = [];
var fields = ['Player', 'Average Goals'];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/players/index.html')
.find('div#goals table.table.tbl-p-best-goal-avg tr')
.set({
    'Player': 'td.tbl-playername.teamname-nolink a.text',
    'Average Goals': 'td.tbl-team-num'
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  console.log(data);
  var result = json2csv({ data: data, fields: fields });
  console.log(result);
  fs.writeFile('0playerAverageGoals.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
})
.log(console.log)
.error(console.log)
.debug(console.log);
