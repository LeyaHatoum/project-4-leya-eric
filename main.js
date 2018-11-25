//CREATE APP NAMESPACE TO HOLD ALL METHODS
const app = {};

//CREATE VARIABLES TO USE IN METHODS
const theGenres = [];
const trackName = [];
const artistName = [];
const sortedList = [];

//API CONFIGURATION
app.getInfo = function (number) {
  app.url = 'http://api.musixmatch.com/ws/1.1/';
  app.Key = '3ab5684680f38c7ad48e5a3d9078a81c';
  return $.ajax({
    url: `${app.url}track.search`,
    method: "GET",
    dataType: "jsonp",
    data: {
      apikey: app.Key,
      format: "jsonp",
      f_music_genre_id: "7",
      page_size: "100",
      page: number,
      s_track_rating: "DESC",
    },
  })
};

//CREATE A MEGALIST TO HOLD MORE THAN 100 SONGS
//The api only allows 100 results per page, but we can have as many pages as we want. So to work around that we want to compile the results of 10 pages into one page, in order to display them all on the screen at once.
const pageNumber = [1,2,3,4,5,6,7,8,9,10];
const ajaxPromises = pageNumber.map(app.getInfo);

$.when(...ajaxPromises).then((...res) => {
  app.megaList = res.map((track)=> {
    return track[0].message.body.track_list;
  });
  app.callMegaList(app.megaList);
});


app.callMegaList = tracks => {
  const megaList = tracks.flat();
  console.log("this is my list", megaList);
  app.trackList(megaList);
}

//CREATE AN ORGANIZED ARRAY OF TRACKS TO WORK WITH
app.trackList = function (megaList) {
  console.log("app.tracklist", megaList);
  //Navigate through the nesting of API database
  const newList = [];
  for (let i=0; i<megaList.length; i++){
    newList.push(megaList[i].track);
  }
  console.log("app.trackList newList", newList);
  //Get the three arrays of track info
  app.getTheGenres(newList);
  app.getTheArtist(newList);
  app.getTheTrackNames(newList);

  //Combine the three arrays into one new array

  for (let i = 0; i < newList.length; i++) {
    const track = { genre: theGenres[i], artist: artistName[i], track: trackName[i] };
    sortedList.push(track);
  }
  console.log("All sorted", sortedList);
}   

// GET THE GENRES --- DO NOT TOUCH THIS SACRED CODE
app.getTheGenres = function(newList){
  //This function takes us into the first nested array (Music Genre List)
  const genreGroup = [];
  const getGenreGroup = function(newList){
    for(let i=0; i < newList.length; i++){
      genreGroup.push(newList[i].primary_genres.music_genre_list);
    }
  }
  getGenreGroup(newList);
  
  //This function takes us into the Genres array
  const getEachGenre = function (genreGroup){
    for(let i=0; i < genreGroup.length; i++){
      const genre = genreGroup[i];
      const genreList = [];

      //This takes only the name of the genre
      const getEachGenreName = function (genre){
        for(let i=0; i < genre.length; i++){
          const name = genre[i].music_genre.music_genre_name;
          genreList.push(name);
        }
      }
      //Push the genre names into an array (genre list)
      getEachGenreName(genre);

      //put all the genre lists into one array
      theGenres.push(genreList);
    }
  }
  getEachGenre(genreGroup)
};

//GET THE TRACK NAMES
app.getTheTrackNames = function(newList){
  //Get the track name of each track and push it into new array
  for(let i=0; i < newList.length; i++){
    trackName.push(newList[i].track_name);
  }
}

//GET THE ARTIST NAMES
app.getTheArtist = function(newList) {
  //Get the artist name of each track and push it into new array
  for (let i=0; i < newList.length; i++){
    artistName.push(newList[i].artist_name);
  }
}

//OUR EVENT LISTENER
app.listenForUserInput = function(){

  $("select").on("change", function (){
    const userGenre = $(this).val();
    console.log(userGenre);

    app.matchGenre(userGenre);
  });
}

//CREATE LIST OF TRACKS THAT MATCHES USER INPUT GENRE 
app.matchGenre = function (userGenre){
  const userPlaylist = [];

  sortedList.forEach(function(track){
    for (let i=0; i <track.genre.length; i++){
      if (userGenre === track.genre[i]){
        userPlaylist.push(track);
      }
    }
  })
  console.log(userPlaylist);
}

//KICK OFF APPLICATION 
app.init = function () {
  // app.megaList();
  app.getInfo();
  app.listenForUserInput();
}

//DOCUMENT READY
$(function () {
  app.init();
});   
