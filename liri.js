require("dotenv").config();

var keys = require("./keys.js");
var fs = require('fs');
var moment = require('moment');
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function liriDoThis(action){
  var value = process.argv.slice(3).join(" ")  || undefined;
  switch(action){
    case 'movie-this':
      if(value === undefined){
        axios.get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy").then(function(response) {
          console.log(response.data.Title);
          console.log(response.data.Year);
          console.log(response.data.imdbRating);
          JSON.stringify(response.data.Ratings);
          console.log(response.data.Country);
          console.log(response.data.Language);
          console.log(response.data.Plot);
          console.log(response.data.Actors);
        })
      }else{
        axios.get("http://www.omdbapi.com/?t="+value+"&y=&plot=short&apikey=trilogy").then(function(response) {
          console.log(response.data.Title);
          console.log(response.data.Year);
          console.log(response.data.imdbRating);
          JSON.stringify(response.data.Ratings);
          console.log(response.data.Country);
          console.log(response.data.Language);
          console.log(response.data.Plot);
          console.log(response.data.Actors);
        })
      }
      break;

    case 'spotify-this-song':
        spotify.search({ type: 'track', query: value, limit: 1 }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
         
        console.log(data.tracks.items[0].artists[0].name)
        console.log(data.tracks.items[0].name)
        console.log(data.tracks.items[0].album.name)
        console.log(data.tracks.items[0].preview_url)
 
        });

      break;

    case 'concert-this':
      axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(function(response) {

      var date=moment(response.data[0].datetime).format("MM/DD/YYYY")
     //name of the venue
     console.log(response.data[0].venue.name)
     //location of venue
     console.log(response.data[0].venue.city, response.data[0].venue.country)
     //date of concert
     console.log(date)
     })
      break;

    case 'do-what-it-says':
      fs.readFile("random.txt", "utf8", function(err,data){
        if(err){
          return err;
        }
      var bingo = data.split(",")
      process.argv[2]= bingo[0],
      process.argv[3]=bingo[1],
      liriDoThis(process.argv[2])
      })
      break;

  }

  
}
liriDoThis(process.argv[2]);
