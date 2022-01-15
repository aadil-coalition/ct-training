// make deafult output input 0; done.
// add eventlistener on input-currency up button and down button done.
// display currnet rate times selected input currency number in output-currency input done.
    // and also display that in span done.

// add event listener on both select tags. when changed display appropriate rate*input-currency number in respective input feilds. done.

// https://api.exchangerate-api.com/v4/latest/${currency_one}

/// getting appropriate elements.
const input_currency_option = document.querySelector('#input-currency');
const output_currency_option = document.querySelector('#output-currency');
const input_currency_value = document.querySelector('#input-currency-number');
const output_currency_value = document.querySelector('#output-currency-number');
const swap_btn = document.querySelector('.swap-btn');
const output_details = document.querySelector('.output-detail');

const input_array = [input_currency_option, output_currency_option, input_currency_value, output_currency_value];
function api_call(curr) {
    return new Promise((resolve, reject) => {
        const result =  fetch(`https://api.exchangerate-api.com/v4/latest/${curr}`);
        if(resolve) {
            return resolve(result);
        } else {
            return reject(result);
        }
    });
}
function calculate_rate(curr) {
api_call(curr).
then((result) => {
    return result = result.json();
}).
then((result) => {
    update_dom(result.rates[output_currency_option.value]);
});
}
function update_dom(output_currency_rate) {
    output_currency_value.value = +input_currency_value.value * output_currency_rate;
    output_details.textContent = `1 ${input_currency_option.value} = ${output_currency_rate} ${output_currency_option.value}`;
}
function swap_rate() {
const temp = input_currency_option.value;
input_currency_option.value = output_currency_option.value;
output_currency_option.value = temp;
calculate_rate(input_currency_option.value);
}

document.addEventListener('DOMContentLoaded', () => {
    calculate_rate(input_currency_option.value);
});

input_array.forEach((input) => {
    input.addEventListener('change', (e) => {
        calculate_rate(input_currency_option.value);
    });
});

swap_btn.addEventListener("click", () => {  
swap_rate();
});



