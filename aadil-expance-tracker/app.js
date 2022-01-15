// update total balance on the main heading. done.
// update income and expance values in the main expance-container when adding transeciton. done.
// make new income-expance list and append them to the dom's ul. done.
// give income item color of green. and expance item color of red. done.
// persist them in local sotrage. done

// add button to remove transection-item.

// getting appropriate elements.
const balance_total_text = document.querySelector('.balance-total-text');
const income = document.querySelector('.income');
const expance = document.querySelector('.expance');
const transection_add_form = document.querySelector('.transection-add-form');
const history_list = document.querySelector('.history-list');

// appending transection list-item in the ul.
function add_transection(data, transection_id) {
    
    let dynamic_background_color;
    if(data.amount < 0) {
        dynamic_background_color = "red-background";
    } else {
        dynamic_background_color = "green-background";        
    }

    const list_item = `
    <li id="history-list-item-${transection_id}" class="history-list-item">
    <span  class="history-list-time-icon">X</span>
    <span class="history-list-discription">${data.discription}</span> 
    <span class="history-list-amount"><span>${data.amount}</span> <span class="history-list-transection-color ${dynamic_background_color}"></span></span>
    </li>
    `;

    history_list.innerHTML += list_item;
}

// upating the balance on the very top.
function update_balance(data) {
 let currunt_total = balance_total_text.textContent.substring(1);
//  currunt_total = currunt_total;
 currunt_total = +currunt_total;
 currunt_total += +data.amount;
 balance_total_text.textContent = `$${currunt_total.toString()}`;
}

// updating income and expance values.
function update_income_expance(data) {
    // just be careful when useing childNodes they count empty space in your html as an array element, stupidest freature ever!!.
    if(data.amount < 0) {
        let currunt_expance = expance.childNodes[1].textContent.substring(1);
        currunt_expance = +currunt_expance;
        currunt_expance += Math.abs(+data.amount);
        expance.childNodes[1].textContent = `$${currunt_expance}`;
    } else { 
        let currunt_income = income.childNodes[1].textContent.substring(1);
        currunt_income = +currunt_income;
        currunt_income += +data.amount;
        income.childNodes[1].textContent = `$${currunt_income}`;
    }
}

// storedata to localstorage
function store_transection(data) {
    if(localStorage.getItem('my_list')) {
        let arrayFromLocalStorage = localStorage.getItem('my_list');
        arrayFromLocalStorage = JSON.parse(arrayFromLocalStorage);
        localStorage.setItem('my_list', JSON.stringify([...arrayFromLocalStorage, data]));
      } else {
        localStorage.setItem('my_list', JSON.stringify([data]));
      }
}

transection_add_form.addEventListener('submit', (e) => {
e.preventDefault();
if(e.target.children[1].value && e.target.children[3]) {

    const transection_obj = {
        discription: e.target.children[1].value,
        amount: e.target.children[3].value
    }

    let transection_id = get_latest_transection_id();
    add_transection(transection_obj, transection_id);
    update_balance(transection_obj);
    update_income_expance(transection_obj);
    store_transection(transection_obj);
}
});

function get_latest_transection_id() {
    let latest_id;
    if(history_list.lastElementChild){
        latest_id  = history_list.lastElementChild.getAttribute("id");
        return +latest_id.substring(latest_id.length - 1) + 1;
    } else {
        latest_id = 0;
        return latest_id;
    }
}
document.addEventListener('DOMContentLoaded', () =>  {
 let transection_list = localStorage.getItem('my_list');
 transection_list = JSON.parse(transection_list);
 if(transection_list) {
    transection_list.forEach((transection_item, index) => {
        update_balance(transection_item);
        update_income_expance(transection_item);
        add_transection(transection_item, index);
    });
 }
});
