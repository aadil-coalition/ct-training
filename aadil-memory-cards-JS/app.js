// get the appropriate elements. done.
// card should filp when clicked. done.
// card should display form when clicked on the add new question button. done
// card should display the 1st page after the questionis added or the close button is clicked. done.
// card should add when added done.
// card shuld prevent adding any card if the input is empty. done.
// card should clear all cards when clear-all btn is clicked.  done.
// store it in local sotrage. done.
// somehow get the index of the card so we can display it. done.
// card should move left-right when clicked on the appropriate arrow btn and update the number below. done.
// apply animation on flipping. done.
// apply animation when switching cards. done (not perfect but done.)


//////////////////////////////////// !!! CAUTION!!! SPEGETTI CODE AHED. //////////////////////////////////////////////////

// getting the appropriate element.
const addNewCardBtn = document.querySelector('.add-more-btn');
const leftArrowMove = document.querySelector('.fa-arrow-left');
const rightArrowMove = document.querySelector('.fa-arrow-right');
const clearAllCardBtn = document.querySelector('.clear-all-btn');
const closeFormBtn = document.querySelector('.close-button');
const addCardBtn = document.querySelector('.add-card-btn');
const indexCard = document.querySelector('.index-card');
const totalIndcies = document.querySelector('.total-indcies');
const cardContainer = document.querySelector('.card-container');
const addMoreCardBtn = document.querySelector('.add-more-btn');
const page1 = document.querySelector('.page-1-container');
const page2 = document.querySelector('.page-2-container');


// store the card 
function storeCard(cardObj) {

  if(localStorage.getItem('my_list')) {
    let arrayFromLocalStorage = localStorage.getItem('my_list');
    arrayFromLocalStorage = JSON.parse(arrayFromLocalStorage);
    localStorage.setItem('my_list', JSON.stringify([...arrayFromLocalStorage, cardObj]));
  } else {
    localStorage.setItem('my_list', JSON.stringify([cardObj]));
  }

}
// clearing the card from the store
function clearFromStorage() {
  localStorage.removeItem('my_list');
}

function displayInDom(data, slideType) {

  
  cardContainer.innerHTML = `
      <div class="card-individual-container  ${slideType}-side-slide">
      <div class="card front">
      <span class="front-flip"><i class="fas fa-sync-alt"></i>flip</span>
      <p>${data.question}</p>
      </div>
      <div class="card back">
      <span class="back-flip"><i class="fas fa-sync-alt"></i>flip</span>
      <p>${data.answer}</p>
      </div>
    </div>
  `;
  addFlips();
}

function displayCard() {
    let cardList = localStorage.getItem('my_list');
    if(cardList) {
      cardList = JSON.parse(cardList);
      displayInDom(cardList[0]);
    }
}

function displayAppropriateCard(indexOfCard, slideType) {
  // get the card from the local storage.
  let cardList = localStorage.getItem('my_list');
  cardList = JSON.parse(cardList);
  const appropriateCard = cardList[indexOfCard - 1];
  displayInDom(appropriateCard, slideType);
}
function incrementIndex() {
  let cardList = localStorage.getItem('my_list');
  cardList = JSON.parse(cardList);
  if(cardList) {
    totalIndcies.textContent = cardList.length.toString();
    indexCard.textContent = `${cardList.length.toString()}/`;  
  }
} 

function updateIndex(curruntIndex, direction, reloaded = false) {
  if(reloaded) {
    if(localStorage.getItem('my_list')) {
      indexCard.textContent = '1/';
    } else {
      indexCard.textcontent = '0/';
    }
  } else {
    if(direction === "right") {
      curruntIndex < +totalIndcies.textContent ? indexCard.textContent = `${curruntIndex + 1}/`: curruntIndex;
      displayAppropriateCard(curruntIndex + 1, 'right');
     } else if(direction == "left") {
       curruntIndex > 1 ? indexCard.textContent = `${curruntIndex - 1}/`: curruntIndex;
       displayAppropriateCard(curruntIndex - 1, 'left');
     }     
  }
}

function IndexToZero() {
  indexCard.textContent = "0/";
  totalIndcies.textContent = "0";
}


document.addEventListener('DOMContentLoaded', function() {
  displayCard();
  addFlips();
  incrementIndex();
  updateIndex(null, null, true);
});

// hide-display funciton
function hideDisplay(toBeHidden, toBeDisplayed) {
  toBeHidden.style.display = "none";
  toBeDisplayed.style.display = "block";
}

// adding front-flip funcitonality
function doFrontFlip(element) {

  // element.parentElement.style.visibility = "hidden";  
  element.parentElement.parentElement.style.transform = "rotateX(-180deg)";
  element.parentElement.style.zIndex = 0;
  element.parentElement.nextElementSibling.style.zIndex = 2;
}

// adding back-flip functionality
function doBackFlip(element) {
  console.log(element);
  element.parentElement.parentElement.style.transform = "rotateX(0deg)";
  element.parentElement.style.zIndex = 0;
  element.parentElement.previousElementSibling.style.zIndex = 2;
}

// flipping funcitonality
function addFlips() {
  const frontFlipBtns = document.querySelectorAll('.front-flip');
  const backFlipBtns = document.querySelectorAll('.back-flip');

  frontFlipBtns.forEach((flipBtn) => {

    flipBtn.addEventListener('click', () => {
      doFrontFlip(flipBtn);
    });
  });
  
  backFlipBtns.forEach((flipBtn) => {
  
    flipBtn.addEventListener('click', () => {
      doBackFlip(flipBtn);
    });
  });
}

// displaying form when add btn is clicked
addMoreCardBtn.addEventListener('click', () => {
hideDisplay(page1, page2);
});

// hiding form when close btn is clicked
closeFormBtn.addEventListener('click', () => {
  hideDisplay(page2, page1);
});

// adding card 
addCardBtn.addEventListener('click', () => {
  // getting the btns
const questionTextArea = document.querySelector('.question-text-area'); 
const answerTextArea = document.querySelector('.answer-text-area');

// adding the values to array
if(questionTextArea.value && answerTextArea.value) {
  const cardDetails = {
    question: questionTextArea.value,
    answer: answerTextArea.value
  }
  storeCard(cardDetails);
  incrementIndex();
  displayInDom(cardDetails);
}
});

// adding event listener to left and rith arraow.
leftArrowMove.addEventListener('click', () => {
  let curruntIndex = indexCard.textContent;
  curruntIndex = curruntIndex.substring(0, curruntIndex.length - 1);
  updateIndex(+curruntIndex, 'left');  
});
rightArrowMove.addEventListener('click', () => {
  let curruntIndex = indexCard.textContent;
  curruntIndex = curruntIndex.substring(0, curruntIndex.length - 1);
  updateIndex(+curruntIndex, 'right');  
});

//clearing all the cards 
clearAllCardBtn.addEventListener('click', () => {

  for(card of cardContainer.children) {
    card.style.display = "none";
  }
  clearFromStorage();
  IndexToZero();
});




