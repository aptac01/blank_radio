const default_volume = 0.7;

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
    our_audio.pause();

    if (stop) {
        $('#play_indicator').removeClass('twinkle');
        $('#play_indicator').hide();
        our_audio.currentTime = 0;
        set_volume(default_volume);
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
        our_audio.play();
    } else {
        our_audio = document.createElement('audio');
        our_audio.id = 'current_track';
        our_audio.style.display = "none";
        our_audio.src = url;
        our_audio.autoplay = false;
        our_audio.onended = function() {
            // Remove when played.
            this.remove();
            $('#play_indicator').removeClass('twinkle');
            $('#play_indicator').hide();
            $('#pause_btn').hide();
            $('#play_btn').show();
        };
        set_volume(default_volume);
        document.body.appendChild(our_audio);
        our_audio.play();
    }
}

function init_click_events() {
    $('#play_btn').on('click touchend', play_onclick);
    $('#pause_btn').on('click touchend', pause_onclick);
    $('#next_btn').on('click touchend', next_onclick);
    $('#prev_btn').on('click touchend', prev_onclick);
}