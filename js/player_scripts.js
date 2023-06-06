const defaultVolume = 0.7;

function prev_onclick() {

    console.log('prev!');
}

function next_onclick() {

    console.log('next!');
}

function play_onclick() {

    $('#play_btn').hide();
    $('#pause_btn').show();
    play_sound('audio');
    $('#play_indicator').show();
    $('#play_indicator').removeClass('twinkle');
}

function pause_or_stop(stop_or_pause) {

    if (stop_or_pause == 'stop') {
        stop = true;
    } else if (
        (stop_or_pause == undefined)
        || (stop_or_pause == 'pause')
    ) {
        stop = false;
    } else {
        console.error('Параметр stop_or_pause должен быть \'stop\' или \'pause\', по умолчанию - \'pause\'');
        return;
    }

    $('#pause_btn').hide();
    $('#play_btn').show();
    ourAudio.pause();

    if (stop) {
        $('#play_indicator').removeClass('twinkle');
        $('#play_indicator').hide();
        ourAudio.currentTime = 0;
        set_volume(defaultVolume);
    } else {
        $('#play_indicator').addClass('twinkle');
    }
}

function pause_onclick() {

    pause_or_stop('pause');
}

function stop_onclick() {

    pause_or_stop('stop');
}

function play_sound(url) {

    var isPlaying = $('#current_track').length > 0;

    if (isPlaying) {
        ourAudio.play();
    } else {
        ourAudio = document.createElement('audio');
        ourAudio.id = 'current_track';
        ourAudio.style.display = "none";
        ourAudio.src = url;
        ourAudio.autoplay = false;
        ourAudio.onended = function() {
            // Remove when played.
            this.remove();
        };
        set_volume(defaultVolume);
        document.body.appendChild(ourAudio);
        ourAudio.play();
    }
}

function set_volume(volume) {
    if ((volume < 0) || (volume > 1)) {
        console.error('Звук регулируется в промежутке от 0 до 1');
        return;
    }
    ourAudio.volume = volume;
}

window.onload = (function (){
    $('#player').load('player_svg');
    var ourAudio;
});