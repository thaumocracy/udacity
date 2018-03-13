/*
 * Create a list that holds all of your cards
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM LOADED');
    cardReset();
    tryScore.innerHTML = 0;
});

let cards = document.querySelectorAll('.card');
let compareArray = [];
let classList = [];
let winCounter = 0;
let loseCounter = 0;
let tryScore = document.querySelector('.moves');
let timeVis = document.querySelector('.timer');
let timeMin = document.querySelector('.min');
let timeSec = document.querySelector('.sec');
let timeMinutes = 0;
let timeSeconds = 0;
let start = false;
let stars = document.querySelectorAll('.stars li');
let starsCounter = 3;


function starsCheck(){
    if((loseCounter > 5)&&(loseCounter < 7)){ stars[0].style.visibility = 'hidden'; starsCounter = 2}
    else if ((loseCounter > 7)&&(loseCounter < 13)){ stars[1].style.visibility = 'hidden';starsCounter = 1}
}


function deckSearch() {
    let cards = document.querySelectorAll('.card');
        for (let card of cards) {
            card.addEventListener('click', function (event) {
                if(event.target.classList.contains('match')){}
                else{
                    event.target.classList.toggle('match');
                    compareArray.push(event.target);
                    checkout();
                }
            })
        }
}

function youWon (){

    let finStars = document.querySelector('.finStars');
    let finMoves = document.querySelector('.finMoves');
    let finTime = document.querySelector('.finTime');
    let aStar = '<i class="fa fa-star"></i>';

        if(winCounter === 8){
            document.querySelector('.pop_up').style.display = 'flex';
            finStars.innerHTML = aStar.repeat(starsCounter);
            finMoves.textContent = 'Your Moves ' + ' : '  + (loseCounter + winCounter);
            finTime.textContent = 'Your time ' + (timeMinutes + ' : ' + timeSeconds);
        }
}

function checkout(){
    /*making timer visible on first click
    then adding a picked cards to massive to compare them
    */
    start = true;
        if(compareArray.length < 2){}
        else if((compareArray[0].classList.contains('show') || (compareArray[1].classList.contains('show')))){
            compareArray[0].classList.remove('match');
            compareArray[1].classList.remove('match');
            compareArray = [];
        }
        if(compareArray.length > 2){

            for(let i = 0;i < compareArray.length;i++){
                compareArray[i].classList.remove('match');
            }

            compareArray = [];
        }
        else if(compareArray.length === 2) {

            if(compareArray[0].innerHTML === compareArray[1].innerHTML){
                winCounter = winCounter + 1 ;
                tryScore.innerHTML = loseCounter + winCounter;
                compareArray[0].classList.add('open', 'show','flip');
                compareArray[0].classList.remove('match');
                compareArray[1].classList.add('open', 'show','flip');
                compareArray[1].classList.remove('match');
                compareArray = [];


            }
            else {
            setTimeout(notEvenColor,150);
            }
        }
        //checking your stars rating and won you or not
        starsCheck();
        youWon();
}

function notEvenColor() {
    if(compareArray.length < 2){}
    else {
        loseCounter = loseCounter + 1;
        tryScore.innerHTML = loseCounter + winCounter;
        compareArray[0].classList.remove('match');
        compareArray[1].classList.remove('match');
        compareArray = [];
    }
}
function restart() {
    let restart = document.querySelector('.restart');
    let button = document.querySelector('.content_link');
    restart.addEventListener('click',function(){
        resetDeck();
    });
    button.addEventListener('click',function(){
        resetDeck();
        document.querySelector('.pop_up').style.display = 'none';
    });
    setInterval(timer,1000);
    starsCounter = 3;
}

function cardReset(){
    let cards = document.querySelectorAll('.card');
    let cardsStack  = [];
    let currentClass;
    let items = document.querySelectorAll('.card > i');
    let itemsArr = [];
    restart();
    function createDeck() {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList = 'card';
            cards[i].classList.add('animated');
            currentClass = cards[i].firstElementChild.classList;
            currentClass = currentClass[1];
            cardsStack.push(cards[i]);
            classList.push(currentClass);
        }
        deckSearch()
    }
    createDeck();
    shuffle(classList);
        for(let i = 0;i < items.length;i++){
            itemsArr.push(items[i]);
            this.classList = 'fa ' + classList[i];
        }
}

//flush everything
function resetDeck(){
    document.querySelector('.timer').style.visibility = 'visible';
    shuffle(classList);
    tryScore.innerHTML = 0;
    timeSeconds = 0;
    timeMinutes = 0;
    winCounter = 0;
    loseCounter = 0;
    start = false;
    compareArray = [];
    for(let i = 0; i < stars.length;i++){
        stars[i].style.visibility = 'visible';
    }
    let cardList = document.querySelector('.deck');
        cardList.innerHTML = '';

        for(let i = 0; i < 16;i++){
            let listItem = document.createElement('li');
            let listContent = document.createElement('i');
            listContent.classList.add('fa');
            listContent.classList.add(classList[i]);
            listItem.classList.add('card');
            listItem.classList.add('animated');
            listItem.appendChild(listContent);
            cardList.appendChild(listItem);
        }
        deckSearch();
}

function timer () {
    if (winCounter >= 8) {
    }
    else if (start === true) {
        if (timeSeconds > 60) {
            timeSeconds = 0;
            timeMinutes++;
        } else {
            timeSeconds++;
        }
}
   timeMin.textContent = timeMinutes;
   timeSec.textContent = timeSeconds;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
