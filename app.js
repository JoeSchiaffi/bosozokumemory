/* SELECT ITEMS */

const container = document.querySelector(".container");
const resetBtn = document.querySelector("#reset");
const messageAlert = document.querySelector(".alert");

/* DISPLAY CARDS */

displayCards();
displayCards();

/* RESET BUTTON FUNCTIONALITY */

resetBtn.addEventListener("click", function () {
  window.location.reload();
});

/* SET THE ARRAY WITH ALL CARD ITEMS */
let cards = document.querySelectorAll(".card");

/* SET CARDS FUNCIONALITY */

/* set all the flags and variables used during checks */
let clicked = false;
let secondClick = false;
let clickedId;
let firstCard;
let secondCard;
let cardElements = [];
let cardFrontSides = [];
let cardBackSides = [];
let winningCounter = 0;
for (let card of cards) {
  console.log(cards.length);
  card.addEventListener("click", function (e) {
    /* first card picked */
    if (!secondClick) {
      cardElements[0] = e.target.parentElement.parentElement;
      cardElements[0].classList.add("disabled");
      cardFrontSides[0] = e.target.parentElement;
      cardBackSides[0] = e.target.parentElement.nextElementSibling;
      firstCard = e.target.parentElement.parentElement.id;
      rotateCard(cardFrontSides[0], cardBackSides[0]);
      clicked = true;
      secondClick = true;
    } else {
      /* second card picked */

      for (let card of cards) {
        card.classList.add("disabled");
      }
      cardElements[1] = e.target.parentElement.parentElement;
      cardElements[1].classList.add("disabled");
      cardFrontSides[1] = e.target.parentElement;
      cardBackSides[1] = e.target.parentElement.nextElementSibling;
      secondCard = e.target.parentElement.parentElement.id;
      rotateCard(cardFrontSides[1], cardBackSides[1]);
      /* check card for winning */
      if (firstCard === secondCard) {
        /* if winner */
        winningCounter++;

        setTimeout(function () {
          cardElements[0].classList.add("winner", "disabled");
          cardElements[1].classList.add("winner", "disabled");
          if (winningCounter === cards.length / 2) {
            displayAlert("YOU BROKE IT ALL DUDEEEEE!!", "success");
          } else {
            displayAlert("great job, dude!!", "success");
            setTimeout(function () {
              displayAlert("great job, dude!!", "success");
            }, 1500);
          }
        }, 1000);
        disableCards();
      } else {
        /* if loser */
        setTimeout(function () {
          displayAlert("wrong choice, dude!", "failure");
          cardElements[0].classList.add("shake-horizontal");
          cardElements[1].classList.add("shake-horizontal");

          setTimeout(function () {
            cardElements[0].classList.remove("shake-horizontal");
            cardElements[1].classList.remove("shake-horizontal");
            rotateCardBack(cardFrontSides[0], cardBackSides[0]);
            rotateCardBack(cardFrontSides[1], cardBackSides[1]);
            disableCards();
            setTimeout(function () {
              displayAlert("wrong choice, dude!", "failure");
            }, 1000);
          }, 500);
        }, 1000);
      }
      /* reset the flags and arrays with couple of card elements */
      firstCard = "";
      secondCard = "";
      secondClick = false;
      clicked = false;
    }
  });
}

/* FUNCTIONS */

function displayCards() {
  let imageIndex = [];
  let randomNumber = randomizeNumber();
  let i = 0;
  /* creating the card elements */
  for (let i = 0; i < 8; i++) {
    const article = document.createElement("article");
    article.classList.add("card");
    article.setAttribute("id", randomNumber);
    if (!imageIndex.includes(randomNumber)) {
      imageIndex.push(randomNumber);
      article.innerHTML = `<!-- card front side -->
      <div class="card-side card-front">
      <img src="./imgs/backtcardcover.jpg" alt="" class="img" />
      </div>
      <!-- end of card front side -->
      <!-- card back side -->
      <div class="card-side card-back">
      <img src="./imgs/bosozoku${randomNumber}.jpg" alt="" class="img" />
      </div>
      <!-- end of card back side -->`;
      container.appendChild(article);
      randomNumber = randomizeNumber();
    } else {
      randomNumber = randomizeNumber();
      i--;
    }
  }
}

function randomizeNumber() {
  return Math.floor(Math.random() * 8 + 1);
}

function rotateCard(front, back) {
  front.style.transform = "rotateY(-180deg)";
  back.style.transform = "rotateY(0)";
  clicked = true;
  secondClick = true;
}
function rotateCardBack(front, back) {
  front.style.transform = "rotateY(0)";
  back.style.transform = "rotateY(180deg)";
}

function disableCards() {
  for (let card of cards) {
    if (!card.classList.contains("winner")) {
      card.classList.remove("disabled");
    }
  }
}

function displayAlert(message, action) {
  messageAlert.textContent = message;
  messageAlert.classList.toggle(`${action}`);
}
