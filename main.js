// Create app namespace to hold all methods
const app = {};
app.url = 'http://api.musixmatch.com/ws/1.1/';
app.Key = '3ab5684680f38c7ad48e5a3d9078a81c';

// Collect user input from a selected set of options (Pop, Rock, Hip Hop, Classical)

// app.collectInfo = function () {

// }


//API CONFIGURATION
app.getInfo = function () {
  $.ajax({
    url: `${app.url}track.search`, //play around with endpoint
    method: "GET",
    dataType: "jsonp",
    data: {
      apikey: app.Key,
      format: "jsonp",
      f_music_genre_id: "7",
      page_size: "20",
      // q_track_artist: `beyonce`,
      // f_has_lyrics: `happy`,
      // s_artist_rating: "ASC",
      s_track_rating: "DESC"
    }
  }).then(res => {
    // console.log(res);
    
    
    //FILTER API RESULTS BASED ON USER INPUT 

    //Create an organized array of tracks with their keys
    const trackList = res.message.body.track_list;
    console.log("tracklist", trackList);

    const newList = [];
    for (let i=0; i<trackList.length; i++){
      newList.push(trackList[i].track);
    }
    console.log("newlist", newList);
    
    //for each track, put the genres in an array
    for(let i=0; i < newList.length; i++){
    const compressedGenresList = newList[i].primary_genres.music_genre_list;

    const namesOnly = [];
    compressedGenresList.forEach(function(genre){
      namesOnly.push(genre.music_genre.music_genre_name);
      return namesOnly;
    })
    console.log("namesOnly", namesOnly);
    }

  })

}
$(function () {
  app.getInfo();
});   