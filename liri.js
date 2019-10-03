require("dotenv").config();

var keys = require("./keys.js")
var fs = require('fs');
var moment = require('moment')
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

function liriDoThis(action){
  console.log("What can I help you find?");
  switch(action){
    case 'movie-this':

      break;
    case 'spotify-this-song':
      break;
    case '':
      break;

  }
  
}