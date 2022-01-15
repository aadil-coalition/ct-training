// first get the random word. done.
// make the number of letter input slots dynamic. done.
// make wrong word list and display them. done.
// when right word is inserted make them appear in the input box. done.
//  show notification from the bottom if the letter is already inputed. done.
// on each wrong guess display every limb of hangman from the head, one at a time. done.
// when out of guess, display the notification saying you lost. and play again button. done.
// when play again button hits start everything. done.

// getting appropriate elements.
const dom_word = document.querySelector('.word');
const wrong_letters = document.querySelector('.wrong-letters');
const wrong_letters_container = document.querySelector('.wrong-letters-container');
const hangman_limb = document.querySelectorAll('.hangman-limb');
const try_again = document.querySelector('.try-again');
const whole_body = document.querySelector('body');
const already_typed = document.querySelector('.already-typed');

// random word api
const random_word_appi = `https://random-word-api.herokuapp.com/word?number=1`;
let THE_WORD;
let number_of_trys_left = 5;
let wrong_letters_arr = [];

function get_random_word() {
return new Promise((resolve, reject) => {
    const result = fetch(random_word_appi);
    if(result) {
        resolve(result);
    } else {
        reject(result);
    }
});
}

function make_dynamic_inputs(word) {
word.split('').forEach((letter) => {
    dom_word.innerHTML += `<span class="letter"><span>${letter}</span><hr class="under_line"></span>`;
});
}

function check_input(input) {
    let found = false;
    THE_WORD.split('').forEach((letter, index) => {
        if(input == letter) {
            found = true;
            dom_word.children[index].firstElementChild.style.visibility = "visible";
        }
    });

    if(!found) {
        wrong_letters_container.style.visibility = "visible";
        if(sotre_wrong_letters(input)) {
            display_wrong_letters(input);
            display_limb(); // this funciton should be strickly called after store_wrong_letters()
            --number_of_trys_left;
        }
    }
}

function display_limb() {
    hangman_limb[wrong_letters_arr.length - 1].style.visibility = "visible";
}


function sotre_wrong_letters(input) {
    if(!wrong_letters_arr.find((letter) => {
        return letter === input;
    })){
        wrong_letters_arr.push(input);
        return true;
    } else {
        display_already_stored_messege(input);
        return false;
    }
}

function display_already_stored_messege(input) {

    already_typed.innerHTML = `${input} is already typed`;
    already_typed.style.transform = "translateY(120px)";
    setTimeout(() => {
        already_typed.style.transform = "translateY(170px)";
    }, 2000);
}

function display_wrong_letters(input) {
    wrong_letters.innerHTML += `${input},`;
}

// adding keyboard eventlistener
function add_keyboard_events() {
    document.addEventListener('keypress', (e) => {
        if(number_of_trys_left > 0) {
            check_input(e.key);
        } else {
            game_over();
        }
    });    
}

function game_over() {
    try_again.style.visibility = "visible";
    restart_game(try_again.children[1]); // for some reason I'm not able to get the restart btn from dom with querySelector.
}

function restart_game(restart_btn) {
    restart_btn.addEventListener('click', () => {
        // tried to restart it without reloading the page.
        // try_again.style.visibility = "hidden";
        // wrong_letters_container.style.visibility = "hidden";
        // number_of_trys_left = 5;
        // wrong_letters.innerHTML = "";
        // wrong_letters_arr = [];

        // for(letter of dom_word.children) {
        //     letter.firstElementChild.innerHTML = "";
        // };

        // // hide hangman
        // hangman_limb.forEach((limb) => {
        //     limb.style.visibility = "hidden";
        // });

        location.reload();
    });

}

get_random_word().
then((result) => {
    return result.json();
}).
then((result) => {
    THE_WORD = result[0];
    make_dynamic_inputs(THE_WORD);
    add_keyboard_events();
});

console.log(document.querySelector('.restart-btn'));
