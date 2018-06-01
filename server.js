const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
var app = express();

app.get('/scraping', (req, res) => {
  //url = 'http://127.0.0.1:8000/policies_html/1ef276fd4d6f0b2a696a5aead89b7353.html';
  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, (error, response, html) => {

    if(!error){
      console.log('ainda nao deu erro na requiscao');

      var $ = cheerio.load(html);

      var title, release, rating;

      var json = {
        title: "",
        release: "",
        rating: ""
      };

      $('.header').filter(function(){
               var data = $(this);
               title = data.children().first().text();

               release = data.children().last().children().text();

               json.title = title;
               json.release = release;
               console.log('json', json)
           })

    } else {
      console.log('deu merda');
    }
  })
})

app.listen('8081');
console.log('the fuck scraping is runing');

exports = module.exports = app;
