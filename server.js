var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
  console.log('scraping!');
  //all the web scraping magic
  url = "http://www.imdb.com/title/tt0445934/";
  request(url, function(error, response, html){
    if(!error){
      //Next, utilize cheerio library on returned html, which will essentiall give us jquery funcationality
      var $ = cheerio.load(html);
      //finally, we'll define the variables we'r egoin gto capture;
      var title, release, rating;
      var json = {title: "", release: "", rating: ""};

      //use unique header class as a starting poitn
      $('.header').filter(function(){
        //lets store the data we filter into a variable so we can easily see what's going on;
        var data = $(this);
        // in examinging the DOM, we notice that the title rests within the first child element of the header tag
        //Utilizing jQuery we can easily navigate and get the text by writing the following code:
        title = data.children().first().text();
        release = data.children().last().children().text();
        json.title = title;
        json.release = release;
      })
      $('.star-box-giga-star').filter(function(){
        var data = $(this);
        rating = data.text();
        json.rating = rating;
      })
    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - check your project directory');
    })
    res.send('check your console!');
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
