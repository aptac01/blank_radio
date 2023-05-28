function hop(name, evt) {
    console.log('!!!');
}

function prev_onclick() {
    alert('prev!');
}

function next_onclick() {
    alert('next!');
}

function play_onclick() {
    alert('play!');
    playSound('audio')
}

function playSound(url) {
    var ourAudio = document.createElement('audio'); // Create a audio element using the DOM
    ourAudio.style.display = "none"; // Hide the audio element
    ourAudio.src = url; // Set resource to our URL
    ourAudio.autoplay = true; // Automatically play sound
    ourAudio.onended = function() {
        this.remove(); // Remove when played.
    };
    document.body.appendChild(ourAudio);
}

window.onload = (function (){
    $('#player').load('player_svg');
});