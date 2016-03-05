var results = [];
var play_list = [];

$(function(){
    var self = this;

    var sc_connect = function(){

      SC.initialize({
        client_id: CLIENT_ID,
        redirect_uri: 'http://turtle-head.github.io/Listener/callback.html'
      });

      // initiate auth popup
      SC.connect().then(function() {
        return SC.get('/me');
      }).then(function(me) {
        alert('Hello, ' + me.username);
      });
    };

    var sc_emb = function(track_url){
      SC.initialize({
        client_id: CLIENT_ID
      });

      //var track_url = track;
      SC.oEmbed(track_url, { auto_play: false }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
        $('.current_track').html(oEmbed.html);
      });
    };

    sc_emb('https://soundcloud.com/dubstep/elements-by-lindsey-stirling');

    var play_add = function(index) {
      play_list.push(results[index]);
      results.splice(index, 1);
      $('#results').text('');
      for(var i = 0; i < results.length; i++) {
        $('#results').append('<div class="res_li" id=' + index + '>' + results[i].title + '<div>' );
      }
      $('.res_li').on("click", function(){
        play_add(this.id);
      });
      $('#playlist').text('');
      for(i = 0; i < play_list.length; i++) {
        $('#playlist').append('<div class="play_li" id=' + i + '>' + play_list[i].title + '<div>' );
      }
      $('.play_li').on("click", function(){
        var track = play_list[this.id].permalink_url;
        console.log(play_list);
        sc_emb(track);
      });
    };

    var sc_search = function() {
      SC.initialize({
        client_id: CLIENT_ID
      });

      var search = $('#new_search').val();

      // checks for a value in the input field, if there search for the value
      if(search !== ''){
        SC.get('/tracks', {
          q: search
        }).then(function(tracks) {
          console.log(tracks);
          results = tracks;
          $('#results').text('');
          for (var index = 0; index < results.length; index++){
            $('#results').append('<div class="res_li" id=' + index + '>' + results[index].title + '<div>' );
          }
          $('.res_li').on("click", function(){
            play_add(this.id);
          });
        });
      }

      // find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
      // Removed
      /*SC.get('/tracks', {
        genres: 'punk', bpm: { from: 120 }
      }).then(function(tracks) {
        console.log(tracks);
      });*/
    };



    $(".nav_item").on("click", function(){
      switch(this.id){
        case "about":
          break;
        case "contact":
          break;
        case "search":
          sc_search();
          break;
      }
    });

    $(".sndc").on("click", function(){
      switch(this.id){
        case "connect":
          sc_connect();
          break;
        case "disconnect":
          break;
      }
    });
});
