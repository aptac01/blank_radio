window.onload = (function (){
    $('#player').load('player_svg', function() {
        init_click_events();
        init_volume_events();
    });
    var our_audio;
});