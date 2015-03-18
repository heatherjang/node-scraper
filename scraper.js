var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

function scraper(err, response, body){
  if (err){
    console.log("Error: ", err)
    return;
  }
  var dataToWrite = parse('tr', body);
  write(dataToWrite);
};

function parse(element, html){
  var $ = cheerio.load(html);
  var dataToWrite = [];

  $(element).each(function(){
    var imgURL, absURL, permission, fileType, record;
    var row = $(this);
    imgURL = findElemInRow(row, 'a').attr('href')
    if (validFile(imgURL)){
      fileType = validFile(imgURL)
      absURL = "http://substack.net" + imgURL;
      permission = findElemInRow(row,'code').first().text();
      record = { absURL: absURL, permission: permission, fileType: fileType };
      dataToWrite.push(record);
    }
  });
  return dataToWrite;
}

function write(data){
  fs.writeFile('webscrape.json', JSON.stringify(data, null, 4), function(err){
    console.log('Scrape successful! - Check your project directory for the webscrape.json file');
  });
}

function validFile(url){
  var split = url.toString().split('.');
  var len = split.length;
  var type = split[len-1];
  if (type.match(/[\/]/)){
    return;
  }
  return type;
}

function findElemInRow(row, element){
  return row.find('td').find(element);
}

module.exports = function(url){
  request(url, scraper);
}
