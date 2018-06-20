 /*Look up (Array.from) method/prop for making an actual array from html elements.

 Array.from(document.getElementsByClassName("events")).forEach(function(item) {
   console.log(item.id);
   SOURCE = https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
});

 */
document.addEventListener('DOMContentLoaded', function(){
	newGame();
});

const restartButton = document.querySelector('.restart');
const againButton = document.querySelector('.again');
const noThanksButton = document.querySelector('.nope');
const modal = document.getElementById('modal');
const deck = document.querySelector('.deck');
let allCards = document.getElementsByClassName('card');//returns an HTML collection, can't loop over this(research)
let arrayOfCards = [...allCards];//turns HTML collection into an actual array, 'loopable'
let cardSet = document.querySelector('.deck');
let selected = [];
let timer = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;
let totalMoves = document.querySelector('.moves');
let moves = 0;
let matches = 0;
let estrellas = document.querySelector('.stars');
let starCount = 3;
let elTiempo;
let timeSwitch = 0;
let stats = document.querySelector('.stats');

function startTimer() {//begins timer
		elTiempo = setInterval(function() {
		let currentTimer = `${minutes} : ${seconds}`;
		timer.textContent = currentTimer;
		seconds++;//add to second
		if(seconds === 60){
			minutes++;//changeover to a minute
			seconds = 0;
			if(minutes === 60){//shouldnt take over an hour to make 8 matches.. .
				resetTimer();
				timer.textContent = 'Really? Over an hour?!';
				}
			}
		}, 1000);
};

function removeStar() {//Removes stars depending on amount of moves made (Research a different, better way.)
	if(moves <= 13) {
		//3 stars
		console.log('3 stars');
	} else if((moves > 13) && (moves <= 18)) {
		//take away 1 star (2 stars)
		if(estrellas.childElementCount === 3) {
			console.log('2 stars');
			estrellas.firstElementChild.remove();
			starCount--;
			console.log(starCount);		
		}
	} else { // moves > 18 only 1 star
		if(estrellas.childElementCount === 2) {
			console.log('1 star');
			estrellas.firstElementChild.remove();
			starCount--;
			console.log(starCount);	
		}
	}	
};

function resetStars() {//Start with 3 stars every time
	if(estrellas.childElementCount < 3) {
		let respawn = document.createElement('li');
		respawn.innerHTML = '<i class="fa fa-star"></i>';
		estrellas.appendChild(respawn);
		resetStars();//do it again until I have 3 stars
	}
};

function numberOfMoves() {//move counter
	moves++;
	totalMoves.textContent = moves;
	removeStar();
};

function resetMoves() {//reset move counter
	moves = 0;
	totalMoves.textContent = moves;
	resetTimer();
};

function resetTimer() {//reset timer back to 0:0 along with 'moves'
	clearInterval(elTiempo);
	minutes = 0;
	seconds = 0;
	timer.textContent = '0 : 0';
};

function stopTimer() {//stops timer, clears interval
	clearInterval(elTiempo);
};

function flipCard() { //"Flips cards", adds 'open' and 'show' class. 
	if(!event.target.classList.contains("open")){ //Prevents matching card to itself
		if(selected.length < 2){//Prevents flipping over more thaan 2 cards at a time
			event.target.classList.toggle("open"); //(keyword THIS works here, research why)
			event.target.classList.toggle("show");
			timeSwitch++;
		if(timeSwitch === 1) {
			startTimer();
		};	
		addToSelected();
		}
	}
};

function shuffle(array) {// Shuffle function from http://stackoverflow.com/a/2450976
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);//Research and learn more
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    } return array;
};

function newGame() {//shuffles cards and places all 'face down' to begin new game
	let newDeck = shuffle(arrayOfCards);
	for(let eachCard of newDeck){
		eachCard.classList.remove('show', 'open', 'match');//Removes classes on each card, 'hides' faces
		[].forEach.call(newDeck, function(shuffled){//research [].forEach.call
			cardSet.appendChild(shuffled);
  		});
	}
};

function restart() {//resets everything back to 0 plus shuffles new deck of cards
	newGame();
	resetMoves();
	resetTimer()
	resetStars();
	matches = 0;
	starCount = 3;
	selected = [];
	timeSwitch = 0;
};

function matching(){//adds match class and empties 'list' for next pair of selections
	selected[0].classList.add('match');
	selected[1].classList.add('match');
	selected[0].classList.remove('open', 'show');
	selected[1].classList.remove('open', 'show');
	selected = [];
	matches++;
		if(matches === 8) {
			endGame();
		};
};

function notMatching(){//flips cards back face down and empties 'list' for next selections
	setTimeout(function(){
	selected[0].classList.remove('show','open');
	selected[1].classList.remove('show','open');
	selected = [];
	}, 1500);//Does not run untill 1.5 secs are over.
};

function addToSelected() {//Pushes selected card onto a 'list' to check for 
	selected.push(event.target);
	console.log(selected[0].innerHTML);
	if(selected.length === 2){//need at least 2 cards
		numberOfMoves();
		} if(selected[0].innerHTML === selected[1].innerHTML) {
			matching();
		} else {
			notMatching();
		}
};

function endGame() {//stops time and shows message to user
	stopTimer();
	deck.classList.add('grayBlur');
	retrieveStats();
	modal.style.visibility = 'visible';
};

function retrieveStats() {//message retrieves moves, star rating and timer for user
	stats.innerHTML = `<p>Here's how you did.</p>
	<p>You received a <b>${starCount}</b> star rating for completing the set in <b>${moves}</b> moves.</p>
	<p>You've spent <b>${minutes}</b> minutes and <b>${seconds}</b> seconds of your life matching cards today!</p>`;	
};

for(let theCard of arrayOfCards){//'flips' each card when clicked
	theCard.addEventListener('click', flipCard)
};

restartButton.addEventListener('click', restart);//starts a fresh new game when clicked

againButton.addEventListener('click', function() {
	modal.style.visibility = 'hidden';//remove from screen
	deck.classList.remove('grayBlur');
	restart();//also starts a fresh new game
});

noThanksButton.addEventListener('click', function() {//just removes modal,
	modal.style.visibility = 'hidden';
	deck.classList.remove('grayBlur');
})



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