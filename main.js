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
    const getTheGenres = function(){
      //for each track, put the genres in an array:
        //first, create a for loop that returns the music genre list (which is an array) in each track
      for(let i=0; i < newList.length; i++){
      const compressedGenresList = newList[i].primary_genres.music_genre_list;

        //second, create an array that lists only the names of each genre in each track (by getting the music_genre_name from each value in the music genre list array)
      const namesOnly = [];
      compressedGenresList.forEach(function(genre){
        namesOnly.push(genre.music_genre.music_genre_name);
        return namesOnly;
      })
      console.log("namesOnly", namesOnly);
      }
    };
    getTheGenres();
    //--------------------------------------------
  })
}

$("select").on("change", function (){
  const userGenre = $(this).val();
});

$(function () {
  app.getInfo();;
});   