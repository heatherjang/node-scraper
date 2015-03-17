var request = require('request');
var cheerio = require('cheerio');
var url = process.argv[2];

request(url, callback);

function callback(error, response, body){
    if (!error && response.statusCode == 200) {
      // console.log(body);
      $ = cheerio.load(body);
      var absURL, permission, type;
      var json = { absURL: "", permission: "", type: ""};
      $('td').filter(function(){
        var image = $(this);
        url = "http://substack.net" + image.find('a').attr('href');
        console.log(url);
      })
  }
}