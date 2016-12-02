var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var data = [];
var fields = ['Team', 'Points', 'Matches Played', 'Wins', 'Goals', 'Appearances'];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/teams/index.html')
.find('div.alltimeranking table.table.tbl-alltimeranking tr')
.set({
    'Team': 'td.tbl-teamname.teamname-link span.t-nText',
    'Points': 'td.tbl-points span.text',
    'Matches Played': 'td.tbl-matches-num span.text',
    'Wins': 'td.tbl-win span.text',
    'Goals': 'td.tbl-goalfor span.text',
    'Appearances': 'td.tbl-appearances span.text'
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  console.log(data[1]);
  //var result = json2csv({ data: data, fields: fields });
  //console.log(result);
  /*fs.writeFile('mostVictories.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });*/
})
.log(console.log)
.error(console.log)
.debug(console.log);
