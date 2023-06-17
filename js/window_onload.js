window.onload = (function (){
    var our_audio;
    $('#player').load('player_svg', function() {
        init_click_events();
        init_volume_events();
    });
});