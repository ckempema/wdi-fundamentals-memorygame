//Back end for memory game per WDI Fundamentals prework

var numCards = 16;       //the total number of cards on the game board
var cardsInPlay = [];
var cardsFound = [];
var matchesFound = 0;
var movesMade = 0;

function Card(rank, suit, type){    //Constructor for a Card Object
    this.rank = rank;
    this.suit = suit;
    this.remaining = 2;

    if(type === "color"){                                   //determines if the card is gray or color, should be set to one of those two
        this.cardImage = "images/"+rank+"-of-"+suit+"-color.png"; //set the file path for colored cards
    }
    else {                                                  //set the file path for gray cards
        this.cardImage = "images/"+rank+"-of-"+suit+"-gray.png"
    } 
}

var cards = [                       //Create 8 different card objects
    new Card("queen", "hearts", "color"),
    new Card("queen", "diamonds", "color"),
    new Card("queen", "hearts", "gray"),
    new Card("queen", "diamonds", "gray"),
    new Card("king", "hearts", "color"),
    new Card("king", "diamonds", "color"),
    new Card("king", "hearts", "gray"),
    new Card("king", "hearts", "gray")
];


var flipCard = function(){          // Flip a card if it gets clicked on, check for matches
    cardType = this.getAttribute('type-id');

    if(this.getAttribute('flip-status') === 'back' && cardsInPlay.length < 2){ //flip the card face up
        this.setAttribute('src', cards[cardType].cardImage);
        this.setAttribute('flip-status', 'flipped')
        cardsInPlay.push(cardType);

        if(cardsInPlay.length === 2){                       //check if two cards in play match
            if(cardsInPlay[0] === cardsInPlay[1]){
                console.log("You found a match!");
            }
        }
    }
    else if (this.getAttribute('flip-status')==='flipped'){ //reverse a card and remove it from play
        this.setAttribute('src', 'images/back.png');        //reset the card image
        this.setAttribute('flip-status', 'back');           //chage cards status
        removalIndex = cardsInPlay.indexOf(cardType);         //find card to remove in cardsInPlay
        if(removalIndex >= 0){                              //ensure a valid index was found
            cardsInPlay.splice(removalIndex, 1);            //remove index of card
        }
        else{                                               //Otherwise print an error message
            console.log("Error removing cardId " + cardType + "index not found")
        }
    }
    else{
        console.log("Too many cards flipped at this time"); //Print out if more than two cards are flipped
    }    
}

var setupBoard = function(){
    for(i=0; i<numCards;i++){
        cardElement = document.getElementById("card-"+i);
        cardElement.setAttribute('type-id', selectCardType(0));
        cardElement.setAttribute('flip-status','back');
        cardElement.addEventListener('click', flipCard);
    }
}

var selectCardType = function(level){               //recursive routine to select a random but available cardtype
    seed = Math.floor(Math.random()*8)
    if(cards[seed].remaining > 0){                  //ensure there are not too many cards of that type already on board
        cards[seed].remaining -= 1;
        return seed;
    }
    else if (level >= 100){                         //Arbitrary exit limit to prevent endless recurision
        console.log('Error: Not enough cards');
        return 0;
    }
    else {                                          //find a new seed recursively 
        return selectCardType(level+1);
    }
}

var showBoard = function(){                         //Shows the faces of all cards on the game board
    for(i=0;i<numCards;i++){
        cardElement = document.getElementById("card-"+i);
        cardType = cardElement.getAttribute("type-id");
        cardElement.setAttribute("src", cards[cardType].cardImage);
        cardElement.setAttribute("flip-status","flipped");
    }
}

setupBoard();
showBoard();









