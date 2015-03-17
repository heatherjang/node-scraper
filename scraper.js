var request = require('request');
var cheerio = require('cheerio');
var url = process.argv[2];

request(url, callback);

function callback(error, response, body){
    if (!error && response.statusCode == 200) {
    console.log(body)
  }
}