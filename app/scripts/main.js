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

    var sc_emb = function(track){
      SC.initialize({
        client_id: CLIENT_ID
      });

      if (track !== '') {
        var track_url = track;
        SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
          console.log('oEmbed response: ', oEmbed);
          $('.current_track').html(oEmbed.html);
        });
      }
    };

    sc_emb();

    var results = [];

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
          results = [];
          $('#results').html('');
          for (var index = 0; index < tracks.length; index++){
            results.push(tracks[index]);
            $('#results').append('<div class="res_li" id=' + index + '>' + tracks[index].title + '<div><hr>' );
          }
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

    $('.res_li').on("click", function(){
      console.log(results[Number(this.id)].permalink_url);
    });

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
