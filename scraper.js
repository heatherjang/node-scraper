
  var request = require('request');
  var cheerio = require('cheerio');
  var fs = require('fs');
  var url = process.argv[2];


  function callback(error, response, body){
    if (error){
      return;
    }
    var $ = cheerio.load(body);

    var absURL, permission, type;
    var jsonFile = [];
    
    $('tr').filter(function(){
      var json = { absURL: "", permission: "", type: ""};
      var row = $(this);
      var relURL = row.find('td').find('a').attr('href');
      absURL = "http://substack.net" + relURL;
      permission = row.find('td').find('code').first().text();
      var fileSplit = relURL.toString().split('.');
      var len = fileSplit.length;
      type = fileSplit[len-1];

      json.absURL = absURL;
      json.permission = permission;
      json.type = type;

      jsonFile.push(json)

    });
    fs.writeFile('webscrape.json', JSON.stringify(jsonFile, null, 4), function(err){
      console.log('Scrape successful! - Check your project directory for the webscrape.json file');
    });

  }

  request(url, callback);

// }