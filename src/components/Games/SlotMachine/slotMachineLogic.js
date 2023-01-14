
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
        image: "../../../../wheelImages/slotmachine_diamond.png",
        id: 3,
        name: "diamond",
        position: 2
    },
];

export let rotateOne = (wheelId) =>{
    let wheelValues = document.getElementById(wheelId).parentElement;
    var children = wheelValues.children;
    
    for (let i = 0; i < children.length; ++i) {
        console.log(children[i].style.transform);
        let oldpos = parseInt(children[i].getAttribute('position'), 10);
        console.log(oldpos+1);
        if (oldpos == children.length - 1) {
            children[i].setAttribute('position', 0);
        }
        else {
            oldpos++;
            children[i].setAttribute('position', oldpos);
        }
        let newPos = oldpos * (-100)
        children[i].style.transform = "translateY(" + newPos + "%)";
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

export let startSpinning = (e) =>{
    disableSpinButton(e);
    playLever();
    setTimeout(playSpinning, leverSound.duration * 1000 - 500);
    setTimeout(() => enableSpinButton(e), spinningSound.duration * 1000 + 500);
}

export let playDispenseWinnings = () => {
    dispenseWinningSound.play();
}


