//Back end for memory game per WDI Fundamentals prework

var cards = [       //Create 4 card objects
    {
        rank: "queen",
        suit: "hearts",
        cardImage: "images/queen-of-hearts.png"
    },
    {
        rank: "queen",
        suit: "diamonds",
        cardImage: "images/queen-of-diamonds.png"
    },
    {
        rank: "king",
        suit: "hearts",
        cardImage: "images/king-of-hearts.png",
    },
    {
        rank: "king",
        suit: "diamonds",
        cardImage: "images/king-of-diamonds.png"
    }
];
var cardsInPlay = [];
var cardsFound = [];

var checkForMatch = function(){
    if(cards[cardsInPlay[0]].rank === cards[cardsInPlay[1]].rank){
        console.log("You found a match!");
    }   
    else{
        console.log("Sorry, try again");
    } 
}

var flipCard = function(){
    cardId = this.getAttribute('data-id');

    if(this.getAttribute('flip-status') === 'back' && cardsInPlay.length < 2){ //flip the card face up
        this.setAttribute('src', cards[cardId].cardImage);
        this.setAttribute('flip-status', 'flipped')
        cardsInPlay.push(cardId);

        if(cardsInPlay.length === 2){ //check if two cards in play match
            checkForMatch();
        }
    }
    else if (this.getAttribute('flip-status')==='flipped'){ //reverse a card and remove it from play
        this.setAttribute('src', 'images/back.png');        //reset the card image
        this.setAttribute('flip-status', 'back');           //chage cards status
        removalIndex = cardsInPlay.indexOf(cardId);         //find card to remove in cardsInPlay
        if(removalIndex >= 0){                              //ensure a valid index was found
            cardsInPlay.splice(removalIndex, 1);            //remove index of card
        }
        else{                                               //Otherwise print an error message
            console.log("Error removing cardId " + cardId + "index not found")
        }
    }
    else{
        console.log("Too many cards flipped at this time"); //Print out if more than two cards are flipped
    }    
}

var createBoard = function(){
    for(i = 0; i < cards.length; i++) {
        var cardElement = document.createElement('img');
        cardElement.setAttribute('src', 'images/back.png');
        cardElement.setAttribute('data-id', i);
        cardElement.setAttribute('flip-status', 'back');
        cardElement.addEventListener('click', flipCard);
        document.getElementById('game-board').appendChild(cardElement);
    }
}

createBoard();










