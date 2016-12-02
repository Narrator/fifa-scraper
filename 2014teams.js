var osmosis = require('osmosis');
var json2csv = require('json2csv');
var fs = require('fs');

var fields = ['World Cup', 'Team', 'Goals', 'Matches Played'];
var data=[];
osmosis
.get('http://www.fifa.com/fifa-tournaments/statistics-and-records/worldcup/index.html')
.find('table.table.tbl-alleditions tr td.tbl-seasonname a.text')
.follow('@href')
.find('div.quick-facts div.qlink-wrap a')
.follow('@href')
.find('div.team-stats-container div.col-xs-12.clear-grid li.qlink-link.first a')
.follow('@href')
.find('div.header-wrap.contentheader h1.title')
.set({
  'World Cup': 'a'
})
.find('table.table.tbl-statistics.sortable tr')
.set({
    'Team': 'td.tbl-teamname.teamname-nolink div.t div.t-n span.t-nText',
    'Goals': 'td.tbl-goalfor span.text',
    'Matches Played': 'td.tbl-mp span.text'
})
.data(function(listing) {
  data.push(listing);
})
.done(function () {
  var i = 0;
  data.forEach(function (d) {
    data[i]['World Cup'] = d['World Cup'].split(' ')[0];
    i++;
  });
  var result = json2csv({ data: data, fields: fields });
  console.log(result);
  fs.appendFile('teamGoalsScored.csv', result, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
})
.log(console.log)
.error(console.log)
.debug(console.log);
