//All the javascript in main.js file which is linked to index.html file

var currentSongNumber = 1;
var willLoop = 0; // (0 = off)
var willShuffle = 0; // will use this soon

//objects for Filling in the song Album, song Artist and song Duration as well.
var songs = [{
        'name': 'Despacito',
        'artist': 'Luis Fonsi, Daddy Yankee',
        'album': 'Despacito',
        'duration': '4:41',
        'fileName': 'song1.mp3',
        'image': 'despacito.jpg'
    },
    {
        'name': 'Hawa Hawa',
        'artist': 'Mika Singh, Prakriti Kakar',
        'album': 'Mubarakan',
        'duration': '4:32',
        'fileName': 'song2.mp3',
        'image': 'hawa.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'befikre.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'breakup-song.jpg'
    }]

//Add a click event to display the name of the user.
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val(); //Select the name of the user using Javascript and store it in a variable name
        var email = $('#email-input').val();
        var pswd = $('#password-input').val();
        if (name.length > 3) { //Limit the access to the song app to users who add their name ( more than 3 characters)
            if(email=='test@acadview.com' && pswd=='JavascriptRocks') /* email should be test@acadview.com and the password should be JavascriptRocks*/
                {
                    var message = "Welcome, " + name; //To display string "Welcome" and name together.
                    $('.main .user-name').text(message);
                    $('.welcome-screen').addClass('hidden');//Hide the welcome screen on inputing a name, and display welcome message
                    $('.main').removeClass('hidden');
                }
            else { //Else show an error.
                $('#name-input').addClass('error');
                $('.input-wrapper').find('h3').text('Incorrect Email or Password');
            }
        }
        else {
            $('#name-input').addClass('error');
            $('.input-wrapper').find('h3').text('Name should have more than 3 characters');   /* to display error message if validations are not met*/
        }
    });


    // Re-factored click and keyboard events using toggleSong() function
    function toggleSong() { //toggleSong function to toggle the song
        var song = document.querySelector('audio');
        if(song.paused == true) {
            console.log('Playing');
            // The code below Change the icon when playing or pausing a song Using chaining.
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play(); //chaining of element. i.e. adding both addClass and removeClass in same line.
        }
        else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
    }
    // Click event to play or pause a song.
    $('.play-icon').on('click', function() {
        toggleSong();
    });
    //Keyboard event to play/pause the song ONLY when spacebar is pressed
    $('body').on('keypress',function(event) {
    var target = event.target;
    //this makes sure that the song doesn't pause when we press spacebar in the search box
    if (event.keyCode == 32 && target.tagName !='INPUT') ////32 is the key code of spacebar.
        //This condition first checks if the spacebar key is pressed, then it checks if the place where the event occurred had an input tag or not
    {
        toggleSong();
    }
});
    // function to get proper time format like that of a song.
    function fancyTimeFormat(time)
    {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;
    // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    function updateCurrentTime() {
        var song = document.querySelector('audio');
        var currentTime = Math.floor(song.currentTime); // to get the current time of the song
        var duration = Math.floor(song.duration); // Math.floor(number), will take out the decimal value and return integer value of the number.
        var len;
        len=currentTime/duration*100;
        $('.progress-filled').css("width", len+'%'); // to fill in the progress bar as the music plays
        currentTime = fancyTimeFormat(currentTime);
        duration = fancyTimeFormat(duration);
        $('.time-elapsed').text(currentTime); //Time Elapsed of any song- Update it every second
        $('.song-duration').text(duration); //Show song duration of any song
    }
   //Added a functionality to display a working progress bar while the song is playing
    //Play the song from point of click on progress bar
    $('.player-progress').on('click',function(event){
        var song=document.querySelector('audio');
        var point=$('.player-progress');
        var songpoint=(event.pageX-event.target.offsetLeft)/point[0].clientWidth;
        $('.progress-filled').css("width", songpoint+"%");
        song.currentTime=song.duration*songpoint;
    })
//('#totalSongs').text(" "+ " Total songs :  "+songs.length);
      //Created a playlist of songs using an array.
        window.onload = function() { //onload function help to perform an activity as soon as the website has been loaded.
            changeCurrentSongDetails(songs[0]); //To display first song's info when we open the app
            //Loop to Fill in song Album, song Artist and song Duration Using objects.
            for(var i =0; i < songs.length;i++) {
                var obj = songs[i]; //Save the song object in variable 'obj'
                var name = '#song' + (i+1);
                var song = $(name);
                song.find('.song-name').text(obj.name); //Pick the relevant object property and show it in the website
                song.find('.song-artist').text(obj.artist);
                song.find('.song-album').text(obj.album);
                song.find('.song-length').text(obj.duration);
                addSongNameClickEvent(obj,i+1) // using forloop Added a click event on each song
            }
            updateCurrentTime();
            setInterval(function() { //setInterval as per mentioned milliseconds,ke baad, baar baar jo function ke andar code hai usko run karta rehta hai
                updateCurrentTime();
            },1000);
            $('#songs').DataTable({
                paging: false // object to turn off the page count
            });
         }
        //Added the ability to play any of the songs and  pause the current playing song
        function addSongNameClickEvent(songObj,position) { // function to play/pause song when clicked
            var songName = songObj.fileName; // New Variable
            var id = '#song' + position; // to get the song-id
            $(id).click(function() {
                var audio = document.querySelector('audio');
                var currentSong = audio.src;  //to get the source of the audio
                if(currentSong.search(songName) != -1)
                {
                    toggleSong();
                }
                else {
                    audio.src = songName;
                    toggleSong();
                    changeCurrentSongDetails(songObj); //  To make sure currently playing song name, album and image in our app changes when we change the song
                }
            });
        }

    $('#totalSongs').text(" "+ " Total songs :  "+songs.length);

        //Function below Show the currently playing song name, album and image in our app.
    function changeCurrentSongDetails(songObj) {
        $('.current-song-image').attr('src','img/' + songObj.image);
        $('.current-song-name').text(songObj.name);
        $('.current-song-artist').text("Artist : "+songObj.artist);
        $('.current-song-album').text("Album : "+songObj.album);
    }
   //Adding a click event on the icon (repeat) that does toggles the Class 'disabled'
    $('.fa-repeat').on('click',function() {
        $('.fa-repeat').toggleClass('disabled')
        willLoop = 1 - willLoop; //change the value of 0 to 1 and from 1 to 0 (0 = off, 1 = on)
    });
   //added a click event for shuffle icon
    $('.fa-random').on('click',function() {
        $('.fa-random').toggleClass('disabled')
        willShuffle = 1 - willShuffle;
    });
    //to jump to the last left 5 d=sec of the song
    function timeJump() {
       var song = document.querySelector('audio')
        song.currentTime = song.duration - 5;
    }

    $('audio').on('ended',function() { //this event is fired automatically whenever the song stops playing
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        //Here, we want the StackOverflow function to give us a number between 1 and 4 (since we have 4 songs), but excluding the current Song number that is playing
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) { //4 is the number of songs in our playlist
        // Play the next song
        var nextSongObj=songs[currentSongNumber];
        audio.src=nextSongObj.fileName; //change source
        toggleSong(); //Play next song
        changeCurrentSongDetails(nextSongObj); //Update Image
        currentSongNumber=currentSongNumber+1; //change state
    }
    else if (willLoop==1) { //else condition runs if we are on the last song.
        //Play first song now
        var nextSongObj = songs[0];
        audio.src=nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = 1;
    }
    else{
        // Stop Playing
        $('.play-icon').removeClass('fa-pausefa').addClass('fa-play');
        audio.currentTime=0;
    }
})
    //to get songs played randomly...
    //functionality to randomly pick the next song to play
    function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
//Icon to mute and unmute the currently playing song
$('.volume').on('click',function(){
    var song=document.querySelector('audio');
    $(this).toggleClass('fa-volume-up fa-volume-off')
    var point= $(this).hasClass('fa-volume-up');
    if(point==true){
        song.volume=1;
        $('#volume-filled').css("width", 100+"%");
    }
    else{
        song.volume=0;
        $('#volume-filled').css("width", 0+"%");
    }
})
//Functionality to change the volume of the app using a slider
var vol_pt=document.querySelector('audio');
    vol_pt.volume=1;
    $('#volume-filled').css("width",vol_pt.volume*100+"%");
    $('#volume-slider').on('click',function(event){
        var song=document.querySelector('audio');
        var song_pt=(event.pageX-event.target.offsetLeft)/event.currentTarget.clientWidth;
        $('#volume-filled').css("width", song_pt*100+"%");
        song.volume=song_pt;
    })

// To move to the next song in the playlist.
$('.fa-step-forward').on('click', function(){
    var audio = document.querySelector('audio');
    var currentTime = Math.floor(audio.currentTime); // to get the current time of the song
    var duration = Math.floor(audio.duration); // Math.floor(number), will take out the decimal value and return integer value of the number.
    var lefttime= duration - currentTime;
    setTimeout(function () {
                 audio.currentTime += lefttime;
                  }, 200);
})

//to start the song from beginning.
 $('.fa-step-backward').on('click', function() {
                var audio = document.querySelector('audio');
                var currentTime = Math.floor(audio.currentTime); // to get the current time of the song
                setTimeout(function () {
                audio.currentTime -= currentTime;
                }, 200);               // this is use to skip the duration of the song
        });

//visualization code

$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.querySelector('audio'); //added the song here
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser(); //to create an analyser

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
  //analyser.connect(distortion);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(200);

  var svgHeight = '300'; //height of the bar
  var svgWidth = '1350';//width the bar
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);
     //console.log(frequencyData);
     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
           return 'rgb(0, 0, ' + d + ')';
        });
  }

  // Run the loop
  renderChart();

});
