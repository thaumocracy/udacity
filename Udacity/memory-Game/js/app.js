/*
 * Create a list that holds all of your cards
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM LOADED');
    cardReset();
});

let cards = document.querySelectorAll('.card');
let compareArray = [];
let classList = [];

function deckSearch() {
    let cards = document.querySelectorAll('.card');
    for (let card of cards) {
        card.addEventListener('click', function (event) {
            if(event.target.classList.contains('match')){

            }
            else{
                event.target.classList.toggle('match');
                compareArray.push(event.target);
                console.log(compareArray);
                checkout();
            }

        })
    }
}

function checkout(){

        if(compareArray.length > 2){
            for(let i = 0;i < compareArray.length;i++){
                compareArray[i].classList.remove('match');
            }
            compareArray = [];
        }
        else if(compareArray.length === 2) {
            if(compareArray[0].innerHTML === compareArray[1].innerHTML){
                console.log('!EVEN!');
                compareArray[0].classList.add('open', 'show');
                compareArray[0].classList.remove('match');
                compareArray[1].classList.add('open', 'show');
                compareArray[1].classList.remove('match');
                compareArray = [];

        }
        else{
            setTimeout(notEvenColor,500);
        }
    }

}

        function notEvenColor() {
                compareArray[0].classList.remove('match');
                compareArray[1].classList.remove('match');
                compareArray = [];
                console.log('False');
        }

        function restart() {
            let restart = document.querySelector('.restart');
            restart.addEventListener('click',function(){
                resetDeck();
            })
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
    console.log(cardsStack);
    console.log(classList);
    console.log(itemsArr);
}


function resetDeck(){
    shuffle(classList);
    let cardList = document.querySelector('.deck');
        cardList.innerHTML = '';

        for(let i = 0; i < 16;i++){
            let listItem = document.createElement('li');
            let listContent = document.createElement('i');
            listContent.classList.add('fa');
            listContent.classList.add(classList[i]);
            listItem.classList.add('card');
            listItem.appendChild(listContent);
            cardList.appendChild(listItem);
        }
        deckSearch();
}





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
