//  get the random word from an api. done.
// start timer right after displaying the word. done.
   // if the  timer runs out and the word is incorrect then display game over messege. done.
   // on every correct word increment the score.  done.
// add events on every key press and check it against the original word  done.
    // if the word match, then get other random word and display it and start the timer again. done.


// add event listener to setting selector  done. 
 // decrement the total time on harder game. done.


// getting appropriate tags from dom
const game_word = document.querySelector("#game-word");
const game_time_left = document.querySelector("#game-time-left");
const game_score = document.querySelector("#game-score");
const user_word_input = document.querySelector("#user-word-input");
const game_over = document.querySelector(".game-over");
const game_playing = document.querySelector(".game-playing");
const game_play_container = document.querySelector(".game-play-container");
const game_reload_btn = document.querySelector(".game-reload-btn");
const final_score_number = document.querySelector(".final-score-number");
const difficulty = document.querySelector("#difficulty");


let random_game_word;
let timeOutId;
let intervalId;
let score = 0;
let time_for_game = 12;

// random word api.
// https://random-word-api.herokuapp.com/word?number=${number_of_word}&swear=1


// getting a random word from api.
function get_the_data_from_api() {
    return new Promise((resolve, reject) => {
        let result = fetch(` https://random-word-api.herokuapp.com/word?number=1`);
        if(result) {
            resolve(result);
        } else {
            reject(result);
        }
    });
}

function get_random_word() {
    get_the_data_from_api().
    then((result) => {
       return result = result.json();
    }).
    then((result) => {
        display_random_word(result[0]);
        empty_input();
        start_time();
        display_time();
        return result[0];
    });
}

function start_time() {
    if(timeOutId) {
        clearTimeout(timeOutId);
    } 
    timeOutId = setTimeout(() => {
        toggle_game_container(true, false);
        score = 0;
    }, time_for_game * 1000);
}

function display_time() {
    let counter = time_for_game - 2;
    if(intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
        if(counter < 1) {
            clearInterval(intervalId);
        }
        game_time_left.firstElementChild.textContent = counter;
        counter--
    }, 1000);
}

function display_score() {
    game_score.firstElementChild.textContent = score;
}

function check_the_word(typed_word) {
if(typed_word === random_game_word) {
    score = score + 1;
    display_score();
    get_random_word();
}
}

function empty_input() {
    user_word_input.value = "";
}

function display_random_word(word) {
    random_game_word = word;
    game_word.textContent = random_game_word;
}

function toggle_game_container(first, second) {
    if(first) {
        game_over.style.display = "block";
        game_playing.style.display = "none";
        final_score_number.textContent = score;
    } else if(second) {
        game_score.firstElementChild.textContent = score;   
        game_over.style.display = "none";
        game_playing.style.display = "block";        
    }
}

function make_difficult(difficulty) {
    if(difficulty == "Easy") {
        time_for_game = 12;
    } else if(difficulty == "Medium") {
        time_for_game = 10;
    } else if(difficulty == "Hard") {
        time_for_game = 8;
    }
}

// adding event listener on reaload btn.
game_reload_btn.addEventListener("click", () => {
score = 0;
toggle_game_container(false, true);
get_random_word();
});
// adding event listener on the difficult select tags.
difficulty.addEventListener('click', () => {
    make_difficult(difficulty.options[difficulty.selectedIndex].value);
    get_random_word();
});
// adding event listener on the document load
document.addEventListener("DOMContentLoaded", () => {
    get_random_word();
});
// adding event listener to input 
user_word_input.addEventListener("focus", (e) => {
document.addEventListener("keyup", () => {
    check_the_word(e.target.value);
})
});



