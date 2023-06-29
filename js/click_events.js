var default_volume = 0.7;

var volume_muted = false;
var volume_before_mute = default_volume;

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

    if (typeof our_audio == 'undefined') {
        return;
    }

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

        // без удаления потрохов
//        our_audio.currentTime = 0;
//        set_volume(default_volume);

        // с удалением потрохов
        delete our_audio;
        $('#current_track').remove();

    } else {
        $('#play_indicator').addClass('twinkle');
    }
}

function pause_onclick() {

    pause_or_stop('pause');
}

function stop_onclick() {

    pause_or_stop('stop');
    mute_btn_default_state();
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

function repeat_on_onclick() {
    $('#repeat_btn_off').show();
    $('#repeat_btn_on').hide();

    console.log('repeat is now off');
}

function repeat_off_onclick() {
    $('#repeat_btn_off').hide();
    $('#repeat_btn_on').show();

    console.log('repeat is now on');
}

function init_click_events() {
    $('#play_btn').on('click touchend', play_onclick);
    $('#pause_btn').on('click touchend', pause_onclick);

    $('#stop_btn').on('click touchend', stop_onclick);

    $('#next_btn').on('click touchend', next_onclick);
    $('#prev_btn').on('click touchend', prev_onclick);

    $('#repeat_btn_off').on('click touchend', repeat_off_onclick);
    $('#repeat_btn_on').on('click touchend', repeat_on_onclick);
}