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
    //Create a function that filters results by genre
    
    //---------------------------
    // const trackList = res.message.body.track_list;
    // console.log(trackList);

    // const theRealGenreList = [];
    // const theRealGenre = [];
    // const almostThere = [];
    
    // trackList.forEach(track => {
    //   theRealGenreList.push(track.track.primary_genres.music_genre_list);
    // });
    // console.log("therealGenreList", theRealGenreList);

    // theRealGenreList.forEach(genre => {
    //   theRealGenre.push(genre);
    // });
    // console.log("therealgenre", theRealGenre);

    // theRealGenre.forEach(value => {
    //   if (value.length > 0){
    //     almostThere.push(value);
    //   }
    // });
    // console.log("almostthere", almostThere);

    // console.log(almostThere[0][0].music_genre.music_genre_name);
    //-------------------------------------
    // res.message.body.track_list[0].track.primary_genres.music_genre_list[0]

    //Created an organized array of tracks with their keys
    const trackList = res.message.body.track_list
    // console.log(trackList)

    const newList = []
    // console.log(trackList[0].track)
    for (let i=0; i<trackList.length; i++){
      newList.push(trackList[i].track);
    }
    console.log("newlist", newList)

    
    // newList[0].primary_genres.music_genre_list[0].music_genre.music_genre_name

    // console.log(newList[0].primary_genres.music_genre_list[0].toString())

    // for (let i=0; i<newList.length; i++){
    //   console.log([i]artist_name);
    // }

  })

}
$(function () {
  app.getInfo();
});   