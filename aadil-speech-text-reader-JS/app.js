// getting appropriate elemnts
const expressionList = document.querySelector('.expression-list');
const FormtoggleBtn = document.querySelector('.toggle-btn');
const textInputBtn = document.querySelector('.text-input-btn');
const voiceForm = document.querySelector('.text-input-for-voice');
const closeBtn = document.querySelector('.close-btn');
const textInput = document.querySelector('#speak-text-area');
const voices = document.querySelector('#voices');

// instansiate the speech synthesis object
const mySpeech = new SpeechSynthesisUtterance();
// array of expressions
const expressions = [
    'thirsty',
    'hungry',
    'tired',
    'hurt',
    'happy',
    'angry',
    'sad',
    'scared',
    'outside',
    'home',
    'school',
    'grandmas',

];
function displayExpression() {
    let prefix;
    for (let i = 0; i < expressions.length; i++) {
        if(i < 8) {
            prefix = 'I am';
        } else {
            prefix = "I want to go to";
        }
        expressionList.innerHTML += ` 
        <li class="expression-list-item">
                <img src="img/${expressions[i]}.jpg" alt="input appropriate expression">
                <span class="expression-list-item-text">${prefix} ${expressions[i]}</span>
        </li>
        `;    
    }

    // add event listener to each expression
    const expressionListItems = document.querySelectorAll('.expression-list-item'); 
    for (let i = 0; i < expressionListItems.length; i++) {
        expressionListItems[i].addEventListener('click', () => {
            // console.log();
            speakTheText(expressionListItems[i].children[1].textContent);
        });
    }
}

const speechVoices = speechSynthesis.getVoices();
function addVoices() {
    console.log('working');
    for (let i = 0; i < speechVoices.length; i++) {
        const option = document.createElement('option');
        option.value = speechVoices[i].name;
        option.textContent = speechVoices[i].name;
        voices.appendChild(option);
    }
}

function setVoice(e) {
    console.log('setting voice');
    mySpeech.voice = speechVoices.find((voice) => {
        return e.target.value === voice.name;
    }); 
}

function speakTheText(text) {
mySpeech.text = text;
speechSynthesis.speak(mySpeech);
}

FormtoggleBtn.addEventListener("click", (e) => {
   voiceForm.classList.toggle("move-up");
});
closeBtn.addEventListener("click", (e) => {
    voiceForm.classList.toggle("move-up");
 });
 textInputBtn.addEventListener("click", (e) => {
     e.preventDefault();
    speakTheText(textInput.value);
 });

// displaying all the expressions when dom content is loaded.
document.addEventListener("DOMContentLoaded", displayExpression);

// adding voices when dom content is loaded.
document.addEventListener("DOMContentLoaded", addVoices);

// adding event listener to change voice
voices.addEventListener("change", setVoice);