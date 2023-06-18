// todo сделать функцию с таким же параметром, но двигающую сам .volume-slider
function _set_volume(volume) {
    if ((volume < 0) || (volume > 1)) {
        console.error('Звук регулируется в промежутке от 0 до 1, полученное значение - ' + volume);
        return;
    }
    if (typeof our_audio !== 'undefined') {
        our_audio.volume = volume;
    }
}

function _adjust_vol_slider(element, x_coord, y_coord) {

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
    _set_volume((volume_slider.attr('cx') - volume_slider.data('cx-from')) / volume_slider.data('cx-to'));
}

function _move_volume_slider(e) {

    _adjust_vol_slider($(this), e.pageX, e.pageY);
}

function _move_volume_to_coords(x, y) {

    _adjust_vol_slider($('#volume'), x, y);
}

function _set_track_position(percentage) {
// todo сделать

//  общая длина трека в секундах
    our_audio.duration

//    присвоение этой переменной - меняет текущую позицию в треке
    our_audio.currentTime
}

function _init_volume_events() {

    // обработка одиночных кликов на бар
    $('#volume').on('mousedown touchstart', _move_volume_slider);

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
                    // чтобы не было рандомных эксепшонов при яростном дрыгании слайдером по всей странице
                    touch_x = e.changedTouches[0].pageX;
                    touch_y = e.changedTouches[0].pageY;
                }

                x = e.pageX || touch_x;
                y = e.pageY || touch_y;

                _move_volume_to_coords(x, y);
            });
        }
    }).on('touchend mouseup', function(ev) {
        ev.preventDefault();
        $(this).off("touchmove mousemove");
    });
}