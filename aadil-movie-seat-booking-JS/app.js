// getting all the appropriate elemtns
const allSeats = document.querySelector('.seats-container');
const totalSelectedSeatsEl = document.querySelector('.total-selected-seats');
const totalSelectedSeatsPriceEl = document.querySelector('.total-selected-seats-price');
const moviePicker = document.querySelector('#moive-picker');


const moviePriceObj = {
    toystory4 : 10,
    avengerendgame : 12,
    avatar : 15,
    joker : 19,
}

// make gape between seats 
for(let i = 0; i < allSeats.children.length - 2; i++) {
    if((i + 1)%4 == 0) {
        allSeats.children[i + 2].style.marginRight = '15px';
    }
}

const allSeatsArray = Array.from(allSeats.children);
allSeatsArray.forEach((seat) => {
    if(seat.classList.contains('selected-seat') || seat.classList.contains('not-selected-seat')) {
        seat.addEventListener("click", (e) => {
            toggleSeat(e.target);
        });
    }
});

moviePicker.addEventListener('change', calculate);

function toggleSeat(seat) {
if(seat.classList.contains("selected-seat")) {
    seat.classList.remove("selected-seat");
    seat.classList.add("not-selected-seat");
} else {
    seat.classList.remove("not-selected-seat");
    seat.classList.add("selected-seat");
}
calculate();
}

function calculate() {
    const allSelectedSeats = document.querySelectorAll('.selected-seat');
    let key = document.querySelector('#moive-picker').value;
    key = key.replace(/\s/g, '');
    key = key.toLowerCase();
    let moviePrice = moviePriceObj[key];
    let total = -1; // because we wanna account for the seat in status list.
    let totalPrice = -moviePriceObj[key];
    allSelectedSeats.forEach((seat) => {
     total++;
     totalPrice += moviePrice;
    });
    updateMassage(total, totalPrice);
}

function updateMassage(seats, price) {
    totalSelectedSeatsEl.textContent = seats;
    totalSelectedSeatsPriceEl.textContent = price;
}


document.addEventListener('DOMContentLoaded', () => {
    calculate();
});