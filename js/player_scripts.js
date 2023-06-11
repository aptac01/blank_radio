// todo все идентификаторы на всех уровнях должны быть under_score

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

function adjust_vol_slider(element, xCoord, yCoord) {

    var parentOffset = element.offset(),
        relX = xCoord - parentOffset.left,
        relY = yCoord - parentOffset.top,
        volume_slider = $('.volume-slider');

//    ограничиваем перемещение крайними значениями ползунка
    if (relX <= volume_slider.data('cx-from')) {
        volume_slider.attr('cx', volume_slider.data('cx-from'));
    } else if (relX >= volume_slider.data('cx-to')) {
        volume_slider.attr('cx', volume_slider.data('cx-to'));
    } else {
        volume_slider.attr('cx', relX);
    }

}

function move_volume_slider(e) {

    adjust_vol_slider($(this), e.pageX, e.pageY);
}

function move_volume_to_coords(x, y) {

    adjust_vol_slider($('#volume'), x, y);
}

window.onload = (function (){
    $('#player').load('player_svg', function() {

        // работает заебись, но не тянется за курсором
        $('#volume').on('mousedown touchstart', move_volume_slider);

        // работает заебись, но после mousedown если выйти на пределы элемента - останавливается
        $(".volume-slider").on('touchstart mousedown', function(ev) {
            ev.preventDefault();
            $(this).on("touchmove mousemove",function(e){
                var x = e.pageX || e.changedTouches[0].pageX;
                var y = e.pageY || e.changedTouches[0].pageY;
                var p1 = { x: x, y: y };
                var p0 = $(this).data("p0") || p1;
//                console.log("dragging from x:" + p0.x + " y:" + p0.y + " to x:" + p1.x + " y:" + p1.y);

                move_volume_to_coords(p1.x, p1.y);
            });
        }).on('touchend mouseup', function(ev) {
            ev.preventDefault();
            $(this).off("touchmove mousemove");
        });
    });
    var ourAudio;
});