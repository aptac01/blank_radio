function set_track_position(percentage) {
// todo сделать

//  общая длина трека в секундах
    our_audio.duration

//    присвоение этой переменной - меняет текущую позицию в треке
    our_audio.currentTime
}

function move_track_seeker_slider(e) {

    // на мобилках нужные координаты определяются по другому
    if (isNaN(e.pageX) || isNaN(e.pageY)) {
        e.pageX = e.changedTouches[0].pageX;
        e.pageY = e.changedTouches[0].pageY;
    }

    adjust_track_slider($(this), e.pageX, e.pageY);
}

function adjust_track_slider(element, x_coord, y_coord) {

// todo абстрагировать и вынести в отдельный файл
    var parent_offset = element.offset(),
        track_seeker_slider = $('.track_seeker_slider'),
        cx_from = track_seeker_slider.data('cx-from'),
        cx_to = track_seeker_slider.data('cx-to'),
        weird_thing = (2 * parseInt(track_seeker_slider.attr('r')) - parseInt(track_seeker_slider.attr('stroke-width')) + 0.5),
        new_circle_coord_x, new_path_coord_x;

    new_circle_coord_x = x_coord - parent_offset.left + track_seeker_slider.data('cx-from') - weird_thing

    // ограничиваем перемещение ползунка крайними значениями полоски
    if (new_circle_coord_x <= cx_from) {

        new_circle_coord_x = cx_from;

    } else if (new_circle_coord_x >= cx_to) {

        new_circle_coord_x = cx_to;
    }

    new_path_coord_x = new_circle_coord_x - cx_from;

    $('circle.track_seeker_slider').attr('cx', new_circle_coord_x);
    $('path.track_seeker_slider').attr('transform', 'translate(' + new_path_coord_x + ',0)');
}

function init_track_seeker_events() {

    // обработка одиночных кликов на бар
    $('#track_seeker').on('mousedown touchend', move_track_seeker_slider);

    // ловим перетаскивания по всей странице
    $(document).on('touchstart mousedown', function(ev) {

        // но громкость меняем только если начальный клик был внутри бара,
        // т.е. если "взяли кликом" за слайдер и потянули,
        // и если при этом курсор вышел за границы бара не отпуская клик - продолжаем трекать положение
        if ($('#track_seeker').has(ev.target).length > 0) {
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

                adjust_track_slider($('#track_seeker'), x, y);
            });
        }
    }).on('touchend mouseup', function(ev) {
        ev.preventDefault();
        $(this).off("touchmove mousemove");
    });
}