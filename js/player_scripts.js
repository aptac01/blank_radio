function prev_onclick() {
    console.log('prev!');
}

function next_onclick() {
    console.log('next!');
}

function play_onclick() {
    $('#play_btn').hide();
    $('#pause_btn').show();
    playSound('audio');
    $('#play_indicator').show();
    $('#play_indicator').removeClass('twinkle');
}

function pause_onclick() {
    $('#pause_btn').hide();
    $('#play_btn').show();
    ourAudio.pause();
//    $('#play_indicator').hide();
    $('#play_indicator').addClass('twinkle');

    // если надо остановить трек
    // ourAudio.currentTime = 0;
}

function playSound(url) {
    var is_playing = $('#current_track').length > 0;

    if (is_playing) {
        ourAudio.play();
    } else {
        ourAudio = document.createElement('audio');
        ourAudio.id = 'current_track';
        ourAudio.style.display = "none";
        ourAudio.src = url;
        ourAudio.autoplay = true;
        ourAudio.onended = function() {
            // Remove when played.
            this.remove();
        };
        document.body.appendChild(ourAudio);
    }
}

window.onload = (function (){
    $('#player').load('player_svg');
    var ourAudio;
});