let homeMusic = new Audio("../home-page-music.m4a");
homeMusic.loop = true;
let selectGameMusic = new Audio("../select-game.m4a");


export let playHomeMusic = () =>{
    homeMusic.play();
}

export let pauseHomeMusic = () =>{
    homeMusic.pause();
}

export let playGameSelectEffect = () =>{
    pauseHomeMusic();
    selectGameMusic.play();
}