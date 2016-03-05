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
      if(Number(play_list.length) === 1) {
        SC.oEmbed(track_url, { auto_play: true, show_bpm: true }).then(function(oEmbed) {
          console.log('oEmbed response: ', oEmbed);
          $('#playlist').append(oEmbed.html);
        });
      } else {
        SC.oEmbed(track_url, { auto_play: false, show_bpm: true }).then(function(oEmbed) {
          console.log('oEmbed response: ', oEmbed);
          $('#playlist').append(oEmbed.html);
        });
      }
    };

    var play_add = function(index) {
      play_list.push(results[index]);
      sc_emb(results[index].permalink_url);
      results.splice(index, 1);
      $('#results').text('');
      for(var i = 0; i < results.length; i++) {
        $('#results').append('<div class="res_li" id=' + i + '>' + results[i].title + '<div>' );
      }
      $('.res_li').on("click", function(){
        play_add(this.id);
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
