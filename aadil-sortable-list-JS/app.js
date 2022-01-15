// make an array of wealth people. (done.)
// place them randomly in the array. (done.)
// then display them initially when the page loads. (done.)
// implement a function that checks if the order is correct. (done.)
    // keep their text color grey if they are not moved yet. (done.)
    // make their text color red if placed in the wrong index. (done.)
    // make their text color green if placed in the correct index. (done.)
// make them move some how when dragged. (done.)


// getting appropriate elements
const richPeopleList = document.querySelector('.rich-people-list');
const checkBtn = document.querySelector('.check-btn');


const richPeopleName = [
  ['Jeff Bezos', 1],
  ['Bill Gates', 2],
  ['Warren Buffett', 3],
  ['Bernard Arnault', 4],
  ['Carlos Slim Helu', 5],
  ['Amancio Ortega', 6],
  ['Larry Ellison', 7],
  ['Mark Zuckerberg', 8],
  ['Michael Bloomberg', 9],
  ['Larry Page', 10]
];

// const richPeopleName = [
//   ['Jeff Bezos', 'Bezos'],
//   ['Bill Gates', 'Gates'],
//   ['Warren Buffett', 'Buffett'],
//   ['Bernard Arnault', 'Arnault'],
//   ['Carlos Slim Helu', 'Helu'],
//   ['Amancio Ortega', 'Ortega'],
//   ['Larry Ellison', 'Ellison'],
//   ['Mark Zuckerberg', 'Zuckerberg'],
//   ['Michael Bloomberg', 'Bloomberg'],
//   ['Larry Page', 'Page']
// ];

function richPersonFind(person) {
  if(person[0] = 'Mark Zuckerberg') {
    console.log(person);
    return person;
  }
}

// suffules the array.
function suffle() {
  for(let i = 0;  i < 10; i++) {
    const temp = richPeopleName[i];
    const randomeIndex = Math.floor(Math.random() * richPeopleName.length);
    richPeopleName[i] = richPeopleName[randomeIndex];
    richPeopleName[randomeIndex] = temp;
  }
}

// display at random initially.
function displayRandomPeople () {
  suffle();
  displayPeople();
}

function displayPeople() {
  richPeopleName.forEach((element, index) => {
    richPeopleList.innerHTML += `
    <li draggable="true" id="id-${index + 1}" class="rich-person">
    <span class="rich-index">${index + 1}</span>
    <span class="rich-person-name">${element[0]}</span>
    <i class="fas fa-grip-lines"></i>
    </li>
    `;
  });  
doDragging();
}

function doDragging() {
  const richPeopleListDom = document.querySelectorAll('.rich-person');
  const richPeopleListDomName = document.querySelectorAll('.rich-person-name');

  let selectedIndex;
  richPeopleListDom[1].addEventListener('click', function() {
    console.log('clicking list');
    console.log(this);
  })

  richPeopleListDom.forEach((Rperson) => {
    Rperson.addEventListener('dragstart', () => {
       selectedIndex = +Rperson.firstElementChild.textContent;
    });
  });
  
  richPeopleListDom.forEach((Rperson) => {
    Rperson.addEventListener('dragover',(e) => {
      e.preventDefault();
    });
  });
  
  richPeopleListDom.forEach((Rperson) => {
    // swapping the element when dropped.
    Rperson.addEventListener('drop',(e) => {
      const dragTo = +Rperson.firstElementChild.textContent;
      const temp = richPeopleListDomName[dragTo - 1].textContent;
      richPeopleListDomName[dragTo - 1].textContent = richPeopleListDomName[selectedIndex - 1].textContent;
      richPeopleListDomName[selectedIndex - 1].textContent = temp;
    });
  });

  richPeopleListDom.forEach((Rperson) => {
    // changing the bg when entering a potantial draggable item
    Rperson.addEventListener('dragenter', () => {
      Rperson.style.background = '#eaeaea';
    });
  });

  richPeopleListDom.forEach((Rperson) => {
    // changing the bg when entering a potantial draggable item
    Rperson.addEventListener('dragleave', () => {
      Rperson.style.background = '#fff';
    });
  });
}


// checks the order.
function checkOrder() {
// get the list from DOM.
const richPeopleListDom = document.querySelectorAll('.rich-person');

richPeopleListDom.forEach((person) => {

  const personText = person.children[1].textContent;
  let personIndex;
  // getting the true index of a person by his name from the richPeopleName array.
  richPeopleName.forEach((element) => {
    if(element[0] == personText) {
      personIndex = element[1];
    }
  });
  if(person.firstElementChild.textContent == personIndex) {
    person.children[1].classList.add('green-text');
    person.children[1].classList.remove('red-text');
  } else {
    person.children[1].classList.add('red-text');
    person.children[1].classList.remove('green-text');
  }
});
}

checkBtn.addEventListener('click', checkOrder);
document.addEventListener('DOMContentLoaded', displayRandomPeople);

