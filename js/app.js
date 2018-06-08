 /*Look up (Array.from) method/prop for making an actual array from html elements.

 Array.from(document.getElementsByClassName("events")).forEach(function(item) {
   console.log(item.id);
   SOURCE = https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
});

 */
document.addEventListener('DOMContentLoaded', function(){
	newGame();
});

let allCards = document.getElementsByClassName('card');//returns an HTML collection, can't loop over this for some reason
let arrayOfCards = [...allCards];//turns HTML collection into an actual array, 'loopable'
let cardSet = document.querySelector('.deck');
let selected = [];//CHANGES
let timer = document.querySelector('.timer');
let second = 0;
let minute = 0;
let totalMoves = document.querySelector('.moves');
let moves = 0;

function numberOfMoves() {
	moves++;
	totalMoves.textContent = moves;
};

function startTimer() {
	if(timer.textContent === '0 : 0'){ //prevents addToSelected function from running timer every 2 clicks
	setInterval(function() {
		let currentTimer = `${minute} : ${second}`;
		timer.textContent = currentTimer;
		second++;//add to second
		if(second === 60){
			minute++;//changeover to a minute
			second = 0;
			/*if(minute === 60){//shouldnt take over an hour to make 8 matches.. .
				timer.textContent = 'Really? Over an hour?!';
			}*///Learn about 'clearInterval' to stop timer and display message
		}
	}, 1000);//runs every 1 second
};
};

function flipCard() { //CHANGES
	if(!event.target.classList.contains("open")){ //Prevents matching card to itself
		if(selected.length < 2){//Prevents flipping over more thaan 2 cards at a time
		event.target.classList.toggle("open"); //keyword THIS works here.
		event.target.classList.toggle("show");
		addToSelected();
	}
	}
};

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
};

function newGame() {//WHAT?! THIS ACTUALLY WORKS!! IT SHUFFLES!!!!!
	let newDeck = shuffle(arrayOfCards);
	for(let eachCard of newDeck){
		eachCard.classList.remove('show', 'open', 'match');//Removes classes on each card, 'hides' faces
      [].forEach.call(newDeck, function(shuffled){
         cardSet.appendChild(shuffled);
  });
  }
};

function matching(){//adds match class and empties 'list' for next pair of selections
	selected[0].classList.add('match');
	selected[1].classList.add('match');
	selected[0].classList.remove('open', 'show');
	selected[1].classList.remove('open', 'show');
	selected = [];
};

function notMatching(){//flips cards back face down and empties 'list' for next selections
	setTimeout(function(){
	selected[0].classList.remove('show','open');
	selected[1].classList.remove('show','open');
	selected = [];
}, 1500);//Does not run untill 1.500 secs are over.
};

function addToSelected() {//Pushes selected card onto a 'list' to check for matching
	selected.push(event.target);
	console.log(selected[0].innerHTML);
	if(selected.length === 2){//need at least 2 cards
		startTimer();
		numberOfMoves();
		if(selected[0].innerHTML === selected[1].innerHTML){
			matching();
		} else {
			notMatching();
		}
	}
};

for(let theCard of arrayOfCards){
	theCard.addEventListener('click', flipCard);//THE FREAKIN' CARDS FLIP NOW!!!!!! :'D
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
/*function startTimer() { //for some weird reason this timer doesnt work right, learn why.
	setInterval(addSec, 1000);//will run 'addsec' function every 1 second
	function addSec (){
		let currentTimer = `${minute} : ${second}`;
		timer.textContent = currentTimer;
		second++;//add to second
		if(second === 60){
			minute++;//changeove to a minute
			second = 0;
			if(minute === 60){//shouldnt take over an hour to make 8 matches.. .
				timer.textContent = 'Really? Over an hour?!';
			}
		}
	}
};
*/