//CREATE APP NAMESPACE TO HOLD ALL METHODS
const app = {};

//API CONFIGURATION
app.getInfo = function () {
  app.url = 'http://api.musixmatch.com/ws/1.1/';
  app.Key = '3ab5684680f38c7ad48e5a3d9078a81c';
  $.ajax({
    url: `${app.url}track.search`, //play around with endpoint
    method: "GET",
    dataType: "jsonp",
    data: {
      apikey: app.Key,
      format: "jsonp",
      f_music_genre_id: "7",
      page_size: "100",
      // q_track_artist: `beyonce`,
      // f_has_lyrics: `happy`,
      // s_artist_rating: "ASC",
      s_track_rating: "DESC"
    }
  }).then(res => {
    //FILTER API RESULTS BASED ON USER INPUT 
    //-------------------------------------------
    //Create an organized array of tracks with their keys
    const trackList = res.message.body.track_list;
    console.log("tracklist", trackList);

    const newList = [];
    for (let i=0; i<trackList.length; i++){
      newList.push(trackList[i].track);
    }
    console.log("newlist", newList);
    //--------------------------------------------
    // GET THE GENRES
    const genres = [];
    const getTheGenres = function(){
      for(let i=0; i < newList.length; i++){
        genres.push(newList[i].primary_genres.music_genre_list);
      }
    };
    getTheGenres();
    console.log("genres", genres);
    
    const theGenres = [];
    for(let i=0; i < genres.length; i++){
      const genre = genres[i];
      const genreList = []
      for(let i=0; i < genre.length; i++){
        const name = genre[i].music_genre.music_genre_name;
        genreList.push(name);
      }
      theGenres.push(genreList);
    }

    console.log("theGenres", theGenres);
       

    //--------------------------------------------
    //GET THE TRACK NAMEs
    const trackName = [];
    const getTheTrackNames = function(){
      for(let i=0; i < newList.length; i++){
        trackName.push(newList[i].track_name);
      }
    }
    getTheTrackNames();
    console.log(trackName);
    //--------------------------------------------
    //GET THE ARTIST NAMES
    const artistName = [];
    const getTheArtist = function() {
      for (let i=0; i < newList.length; i++){
        artistName.push(newList[i].artist_name);
      }
    }
    getTheArtist();
    console.log(artistName);
  })

}

// newArray[i].push(getTheGenres[i],artistName[i],trackName[i])

//create a loop that will run for as long as the length of the array

// inside of the loop, create an empty object

//OUR EVENT LISTENER
app.listenForUserInput = function(){

  $("select").on("change", function (){
    const userGenre = $(this).val();
  });

  //Insert here the argument for the future function that will find tracks that match this genre ex: artApp.getArt(animal) 
}



$(function () {
  app.getInfo();;
});   