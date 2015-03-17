var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = process.argv[2];

function scraper(err, response, body){
  if (err){
    console.log("Error: ", err)
    return;
  }
  var $ = cheerio.load(body);
  var objArray = [];
  
  $('tr').each(function(){
    var absURL, permission, type;
    var row = $(this);

    var relURL = row.find('td').find('a').attr('href');
    absURL = "http://substack.net" + relURL;
    permission = row.find('td').find('code').first().text();
    var fileSplit = relURL.toString().split('.');
    var len = fileSplit.length;
    type = fileSplit[len-1];

    var imgObj = makeImgObj(absURL, permission, type)

    objArray.push(imgObj)
  });

  // fs.writeFile('webscrape.json', JSON.stringify(objArray, null, 4), function(err){
  //   console.log('Scrape successful! - Check your project directory for the webscrape.json file');
  // });

}

function makeImgObj(absURL, permission, type){
  var imgObj = { absURL: absURL, permission: permission, type: type };
  return imgObj;
}

request(url, scraper);
