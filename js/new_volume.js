// todo сделать функцию с таким же параметром, но двигающую сам .volume_slider
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

// todo абстрагировать и вынести в отдельный файл
    var parent_offset = element.offset(),
        volume_slider = $('.volume_slider'),
        cx_from = volume_slider.data('cx-from'),
        cx_to = volume_slider.data('cx-to'),
        weird_thing = (2 * parseInt(volume_slider.attr('r')) - parseInt(volume_slider.attr('stroke-width')) + 0.5),
        new_circle_coord_x, new_path_coord_x;

    new_circle_coord_x = x_coord - parent_offset.left + volume_slider.data('cx-from') - weird_thing

    // ограничиваем перемещение ползунка крайними значениями полоски
    if (new_circle_coord_x <= cx_from) {

        new_circle_coord_x = cx_from;

    } else if (new_circle_coord_x >= cx_to) {

        new_circle_coord_x = cx_to;
    }

    new_path_coord_x = new_circle_coord_x - cx_from;

    $('circle.volume_slider').attr('cx', new_circle_coord_x);
    $('path.volume_slider').attr('transform', 'translate(' + new_path_coord_x + ',0)');

    // выставляем соответствующий уровень громкости (от позиции ползунка)
    set_volume((new_circle_coord_x - cx_from) / (cx_to - cx_from));
}

function move_volume_slider(e) {

    adjust_vol_slider($(this), e.pageX, e.pageY);
}

function volume_icon_onclick() {
    console.log('volume muted ' + Math.random());
    set_volume(0);
}

function init_volume_events() {

    $('#volume_icon').on('mousedown touchend', volume_icon_onclick);

    // обработка одиночных кликов на бар
    $('#volume_thing').on('mousedown touchend', move_volume_slider);

    // ловим перетаскивания по всей странице
    $(document).on('touchstart mousedown', function(ev) {

        // но громкость меняем только если начальный клик был внутри бара,
        // т.е. если "взяли кликом" за слайдер и потянули,
        // и если при этом курсор вышел за границы бара не отпуская клик - продолжаем трекать положение
        if ($('#volume_thing').has(ev.target).length > 0) {
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

                adjust_vol_slider($('#volume_thing'), x, y);
            });
        }
    }).on('touchend mouseup', function(ev) {
        ev.preventDefault();
        $(this).off("touchmove mousemove");
    });
}