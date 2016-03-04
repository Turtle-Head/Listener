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

      var track_url = track || 'http://soundcloud.com/forss/flickermood';
      SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
      });
    };

    var sc_search = function() {
      SC.initialize({
        client_id: CLIENT_ID
      });

      // find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
      SC.get('/tracks', {
        genres: 'punk', bpm: { from: 120 }
      }).then(function(tracks) {
        console.log(tracks);
      });
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
