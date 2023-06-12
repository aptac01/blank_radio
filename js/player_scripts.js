//todo разрезать файл на отдельные файлы, сшивать - в питоне
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

// todo сделать функцию с таким же параметром, но двигающую сам .volume-slider
function set_volume(volume) {
    if ((volume < 0) || (volume > 1)) {
        console.error('Звук регулируется в промежутке от 0 до 1, полученное значение - ' + volume);
        return;
    }
    if (typeof our_audio !== 'undefined') {
        our_audio.volume = volume;
    }
}

function adjust_vol_slider(element, x_coord, y_coord) {

    var parent_offset = element.offset(),
        rel_x = x_coord - parent_offset.left,
        rel_y = y_coord - parent_offset.top,
        volume_slider = $('.volume-slider'),
        vol_bar_length = volume_slider.data('cx-from') - volume_slider.data('cx-to');

    // перемещаем сам ползунок, ограничиваем его перемещение крайними значениями полоски
    if (rel_x <= volume_slider.data('cx-from')) {
        volume_slider.attr('cx', volume_slider.data('cx-from'));
    } else if (rel_x >= volume_slider.data('cx-to')) {
        volume_slider.attr('cx', volume_slider.data('cx-to'));
    } else {
        volume_slider.attr('cx', rel_x);
    }

    // выставляем соответствующий уровень громкости (от позиции ползунка)
    set_volume((volume_slider.attr('cx') - volume_slider.data('cx-from')) / volume_slider.data('cx-to'));
}

function move_volume_slider(e) {

    adjust_vol_slider($(this), e.pageX, e.pageY);
}

function move_volume_to_coords(x, y) {

    adjust_vol_slider($('#volume'), x, y);
}

function set_track_position(percentage) {
// todo сделать

//  общая длина трека в секундах
    our_audio.duration

//    присвоение этой переменной - меняет текущую позицию в треке
    our_audio.currentTime
}

window.onload = (function (){
    $('#player').load('player_svg', function() {

        // обработка одиночных кликов на бар
        $('#volume').on('mousedown touchstart', move_volume_slider);

        // todo вынести в отдельную функцию
        // ловим клики по всей странице
        $(document).on('touchstart mousedown', function(ev) {

            // но громкость меняем только если начальный клик был внутри бара,
            // т.е. если "взяли кликом" за слайдер и потянули,
            // и если при этом курсор вышел за границы бара не отпуская клик - продолжаем трекать положение
            if ($('#volume').has(ev.target).length > 0) {
                ev.preventDefault();
                $(this).on("touchmove mousemove",function(e){
                    var touch_x = 0,
                        touch_y = 0,
                        x, y;

                    if (e.changedTouches !== undefined) {
                        touch_x = e.changedTouches[0].pageX;
                        touch_y = e.changedTouches[0].pageY;
                    }

                    x = e.pageX || touch_x;
                    y = e.pageY || touch_y;

                    move_volume_to_coords(x, y);
                });
            }
        }).on('touchend mouseup', function(ev) {
            ev.preventDefault();
            $(this).off("touchmove mousemove");
        });
    });
    var our_audio;
});