 /*Look up (Array.from) method/prop for making an actual array from html elements.

 Array.from(document.getElementsByClassName("events")).forEach(function(item) {
   console.log(item.id);
   SOURCE = https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
});

 */
document.addEventListener('DOMContentLoaded', function(){
	newGame();
});

const allCards = document.getElementsByClassName('card');//returns an HTML collection, can't loop over this for some reason
const arrayOfCards = [...allCards];//turns HTML collection into an actual array, 'loopable'
const cardSet = document.querySelector('.deck');
const flip = function(){
	this.classList.toggle("open");
	this.classList.toggle("show");
}
function shuffle(array) {// Shuffle function from http://stackoverflow.com/a/2450976
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
function newGame() {//WHAT?! THIS ACTUALLY WORKS!! IT SHUFFLES!!!!!
	let newDeck = shuffle(arrayOfCards);
	for(let x of newDeck){
      [].forEach.call(newDeck, function(shuffled){
         cardSet.appendChild(shuffled);
  });
  }
};

for(let theCard of arrayOfCards){
	theCard.addEventListener('click', flip);//THE FREAKIN' CARDS FLIP NOW!!!!!! :'D
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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
