
export let wheelValues = [
    {
        image: "../../../../wheelImages/slotmachine_7.png",
        id: 1,
        name: "7",
        position: 0
    },

    {
        image: "../../../../wheelImages/slotmachine_bar.webp",
        id: 2,
        name: "BAR",
        position: 1
    },

    {
        image: "../../../../wheelImages/slotmachine_orange.png",
        id: 3,
        name: "orange",
        position: 2
    },

    {
        image: "../../../../wheelImages/slotmachine_cherry.jfif",
        id: 4,
        name: "cherry",
        position: 3
    },


    {
        image: "../../../../wheelImages/slotmachine_diamond.png",
        id: 5,
        name: "diamond",
        position: 4
    },
];

export let rotateOne = (wheelId) =>{
    let wheelValues = document.getElementById(wheelId);
    var children = wheelValues.children;
    
    for (let i = 0; i < children.length; ++i) {

        let oldpos = parseInt(children[i].getAttribute('position'), 10);
        console.log(oldpos+1);
        if (oldpos == children.length - 1) {
            oldpos = 0;
            children[i].setAttribute('position', 0);
        }
        else {
            oldpos++;
            children[i].setAttribute('position', oldpos);
        }
        let newPos = oldpos * (-100);
        children[i].style.transform = "translateY(" + newPos + "%)";
        console.log("translateY(" + newPos + "%)");
    }
}

export let spinAllWheels = (e) =>{
    //generate random N many rotations for each wheel

    let rotations1 = Math.floor(Math.random() * 20) % 20;
    console.log( "rotations1: " + rotations1); 
    let rotations2 = Math.floor(Math.random() * 20) % 20;
    console.log("rotations2: "+ rotations2); 
    let rotations3 = Math.floor(Math.random() * 20) % 20;
    console.log("rotations3:" + rotations3); 
    //spin all three wheels N many times and play music
    startSpinningMusic(e);

    //must assign proper transition-duration based on N. transition-duration = 3s / N 
    //this must happen before the rotate function is called.
    //
    let trans1, trans2, trans3;
    trans1 = 3 / rotations1;
    trans2 = 3 / rotations2;
    trans3 = 3 / rotations3;
    let maxRotations = Math.max(rotations1, rotations2, rotations3);
    //spin the wheels their number of times
    for(let i=0; i< maxRotations; i++){
        if(rotations1 > i){
            rotateOne("wheel-1");
        }
        if(rotations2 > i){
            rotateOne("wheel-2");
        }
        if(rotations3 > i){
            rotateOne("wheel-3");
        }
    }
}




//audio sound effects for slot machine game

let leverSound = new Audio("../../../../slotmachine-lever.m4a");
let spinningSound = new Audio("../../../../slotmachine-spinning.m4a");
let dispenseWinningSound = new Audio("../../../../slotmachine-win-dispensing.m4a");

export let playLever = () =>{
    leverSound.play();
}

export let playSpinning = () =>{
    spinningSound.play();
}

let disableSpinButton = (e) =>{
    e.target.disabled = true;
    e.target.style.backgroundColor = "grey";
}

let enableSpinButton = (e) =>{
    e.target.disabled = false;
    e.target.style.backgroundColor = "green";
}

export let startSpinningMusic = (e) =>{
    disableSpinButton(e);
    playLever();
    setTimeout(playSpinning, leverSound.duration * 1000 - 500);
    setTimeout(() => enableSpinButton(e), spinningSound.duration * 1000 + 500);
}

export let playDispenseWinnings = () => {
    dispenseWinningSound.play();
}


