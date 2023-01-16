import axios from "axios";

//it costs 50 cents to spin the wheel
const COST_TO_SPIN = 0.5;

//if the user gets all three of one symbol
//these are the corresponding payouts
const DIAMOND_PAYOUT = 20;
const ORANGE_PAYOUT = 5;
const CHERRY_PAYOUT = 5;
const BAR_PAYOUT = 0;
const STARTING_JACKPOT = 100;
let SEVEN_PAYOUT; //the jackpot value

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
            //loop back around the last wheel value to the beginning of the wheel
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

export let spinAllWheels = async (e) =>{
    //make user pay for spin
    const result = await payForSpin();
    if(result === -1){
        console.log("cannot afford to spin.");
        return;
    }
    else if(result === -666){
        console.log("error occurred when trying to pay to spin");
        return;
    }

    //generate random N many rotations for each wheel

    let rotations1 = Math.floor((Math.random()) * 20) % 20 + 1;
  
    let rotations2 = Math.floor(Math.random() * 20) % 20 + 1;
  
    let rotations3 = Math.floor(Math.random() * 20) % 20 + 1;
    
    //spin all three wheels N many times and play music
    startSpinningMusic(e);

    //must assign proper transition-duration based on N. transition-duration = 3s / N 
    //this must happen before the rotate function is called.
    //
    let trans1, trans2, trans3;
    trans1 = 3 / rotations1;
    trans2 = 3 / rotations2;
    trans3 = 3 / rotations3;
    let wheel1Children = document.getElementById("wheel-1").children;
    let wheel2Children = document.getElementById("wheel-2").children;
    let wheel3Children = document.getElementById("wheel-3").children;
    console.log("trans1: " + trans1 + " trans2: " + trans2 + "trans3: " + trans3);
    //set the transitiondurations of each wheel element so that all N rotation animations fit inside 3 seconds
    for(let i=0; i< wheel1Children.length; i++){
        wheel1Children[i].style.transitionDuration = `${trans1}`;
        console.log(wheel1Children[i].style.transitionDuration);
        wheel2Children[i].style.transitionDuration = `${trans2}`;
        wheel3Children[i].style.transitionDuration = `${trans3}`;
    } 

    let maxRotations = Math.max(rotations1, rotations2, rotations3);
    console.log("max rotations: : " +maxRotations);
    //spin the wheels their number of times
    for(let i=0; i< maxRotations; i++){
        // setTimeout( 3*1000 / maxRotations, () =>{
            if(rotations1 > i){
                rotateOne("wheel-1");
            }
            if(rotations2 > i){
                rotateOne("wheel-2");
            }
            if(rotations3 > i){
                rotateOne("wheel-3");
            }
        // });
    }
    // check if the user won
    const x = await validateSymbols();
    console.log(x);
    const currBalance = await getBalance();
    saveBalance(currBalance+x);
}




//audio sound effects for slot machine game

let leverSound = new Audio("../../../../slotmachine-lever.m4a");
let spinningSound = new Audio("../../../../slotmachine-spinning.m4a");
let dispenseWinningSound = new Audio("../../../../slotmachine-win-dispensing.m4a");
let backgroundMusic = new Audio("../../../../slotmachine-background-music.m4a");
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
    backgroundMusic.pause();
    setTimeout(dispenseWinningSound.duration/100, () => {dispenseWinningSound.play()})
    backgroundMusic.play();
}

export let playBackgroundMusic = () =>{
    backgroundMusic.play();
}

export let pauseBackgroundMusic = () =>{
    backgroundMusic.pause();
}

//update balance functions (send to backend and update balance after each spin)

//pay function subtracts the cost of a spin from the player
//if player has less than COST_TO_SPIN
//returns the new balance of player after paying or -1 to indicate that player cannot afford to spin
//or -666 to indicate error
let payForSpin = async () =>{
    //getBalance
    let currentBalance = await getBalance();
    if(currentBalance === -1){
        console.log("could not get the user's current balance. The spin is prohibited");
        return -666;
    }
    //if player has less than COST_TO_SPIN
    else if(currentBalance < COST_TO_SPIN){
        console.log("Player cannot afford to spin.");
        return -1;
    }
    else{
        //pay for the spin
        currentBalance -= COST_TO_SPIN;
        //save the new balance in the database
       let result = await saveBalance(currentBalance);
       if(!result){
            console.log("could not update the balance after trying to pay");
            return -666;
       }
        return currentBalance;
    }
} 

//validateSymbols returns how much player won from the spin 
let validateSymbols = async () =>{
    //get the current symbols in the slot machine    
    let symbols = [...document.querySelectorAll('[position="0"]')]; //check what position makes th element show in the slot machine box
    let frequencyTable = 100000;
    //1s is bar, 10s is cherry, 100s is orange, 1000s is diamond, 10000 is 7
    
    for(let i=0; i<symbols.length; i++){
        //console.log(symbols[i].getAttribute("name"));
        if (symbols[i].getAttribute("name") === '7'){
            frequencyTable += 10000;
        }
        else if (symbols[i].getAttribute("name") === 'diamond'){
            frequencyTable += 1000;
        }
        else if (symbols[i].getAttribute("name") === 'orange'){
            frequencyTable += 100;
        }
        else if (symbols[i].getAttribute("name") === 'cherry'){
            frequencyTable += 10;
        }
        else if (symbols[i].getAttribute("name") === 'bar'){
            frequencyTable += 1;
        }
    }
    console.log("frequencyTable=" + frequencyTable);
    if(Math.floor((frequencyTable%100000)/10000) === 2){
        return SEVEN_PAYOUT/3;
    }
    if(Math.floor((frequencyTable%100000)/10000) === 3){
        //play the dispense Jackpot music
        //update jackpot back to STARTING_JACKPOT
        const winnings = await updateJackpot(true);
        //display winning message
        return winnings;
    }
    if(Math.floor((frequencyTable%10000)/1000) === 2){
        playDispenseWinnings();
        return DIAMOND_PAYOUT/3;
    }
    if(Math.floor((frequencyTable%10000)/1000) === 3){
        playDispenseWinnings();
        return DIAMOND_PAYOUT;
    }
    if(Math.floor((frequencyTable%1000)/100) === 2){
        playDispenseWinnings();
        return ORANGE_PAYOUT/3;
    }
    if(Math.floor((frequencyTable%1000)/100) === 3){
        playDispenseWinnings();
        return ORANGE_PAYOUT;
    }
    if(Math.floor((frequencyTable%100)/10) === 2){
        playDispenseWinnings();
        return CHERRY_PAYOUT/3;
    }
    if(Math.floor((frequencyTable%100)/10) === 3){
        playDispenseWinnings();
        return CHERRY_PAYOUT;
    }
    //if all symbols are BAR then the amount won is 0
    else {
            //update the jackpot 
            const result  = await updateJackpot(false);
            if(result == -1){
                console.log("ERROR: did not increment jackpot");
            }
            return 0;
    }
    
}

//returns the user's current balance from database
//returns -1 on failure to get balance
let getBalance = async () =>{
     //get the user email for the sql SELECT query
     let email = document.getElementById("user-email").innerText;
    if(email == undefined){
        console.log("could not get user balance");
        return -1;
    }
    //get request to grab user balance via SELECT by email
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/user/balance`, {params: {userEmail: email} });
    if(response.data.success == true){
        console.log("user balance is: "+ response.data.userBalance);
        console.log(response.data);
        return parseFloat(response.data.userBalance);
    }
    else {
        console.log("could not get user balance");
        console.log(response.data);
        return -1;
    }
}

//saveBalance function makes axios post request to put the new balance in the database
//displays the new balance in the header
//on success returns true on failure returns false
let saveBalance = async (newBalance) =>{
        
        //get the user email for the sql SELECT query
        let email = document.getElementById("user-email").innerText;
        console.log("updating balance of: " + email);

        if(email == undefined){
            return false;
        }
        //post to backend the new balance via sql UPDATE
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/user/balance/update`, {userEmail: email, userBalance: newBalance});
        if(response.data.success){
            console.log("succeeded in changing the user balance");
            // update the header to the new balance
            displayBalance(newBalance);
            return true;
        }
        else{
            console.log("error occurred! NO CHANGE TO BALANCE!!!");
            return false;
        }
}


//updateJackpot function makes axios post request to add .25 to the current jackpot if 
//didWin is false... if didWin is true then set jackpot to 300 and return the old jackpot
//returns -1 on error 
//then update the UI with the new value of the jackpot returned in the res object
let updateJackpot = async (didWin) =>{
    let jackpotElement = document.getElementById("slot-machine-jackpot");
    
    //get current jackpot
    const response1 = await axios.get(`${process.env.REACT_APP_BASEURL}/jackpot`);
    if(response1.data.success){
        let currentJackpot = parseFloat(response1.data.jackpot); 
        let oldJackpot = currentJackpot;
         //if the user won the jackpot, reset it to STARTING_JACKPOT otherwise add 1/3 the user's bet to the jackpot
        currentJackpot = (didWin) ? STARTING_JACKPOT : ( COST_TO_SPIN / 3 ) + currentJackpot;
        //request that the database should be sql UPDATEd 
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/jackpot/update`, {newJackpot: currentJackpot});
        if(response.data.success){
            //update the UI so that it shows the new jackpot
            jackpotElement.innerText = "Current Jackpot : $" + Math.floor(currentJackpot);
            
            //return the payout if the user won the jackpot
            if(didWin){
                return oldJackpot;
            }
        
            else{
                return 0;
            } 
        }

        else{
            console.log("Error in updating jackpot");
            return -1;
        }
    }
    else{
        console.log("could not get current jackpot from DB");
        return -1;
    } 
}

let displayBalance = (newBalance) =>{
    document.getElementById("user-balance").innerText = `$${newBalance}`;
    document.getElementById("slot-machine-balance").innerText = `Balance : $${newBalance}`;
}