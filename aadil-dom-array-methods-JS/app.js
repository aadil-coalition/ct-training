// make an api call to get 3 person initially. done.
    // then get one user by api and then add it to the list. done.
// add double money functionality done.
// add show only millionari funcitonality done.
// add sort by riches funcitnality done.
// add calculate entire wealth funcitonality. done.

// getting appropriate tags from dom.
const person_data_list = document.querySelector('.person-data-list');
const add_user_btn = document.querySelector('.add-user-btn');
const double_money_btn = document.querySelector('.double-money-btn'); 
const millionaires_money_btn = document.querySelector('.millionaires-money-btn'); 
const sort_btn = document.querySelector('.sort-btn'); 
const total_btn = document.querySelector('.total-btn'); 

function get_data_from_api() {

    return new Promise((resolve, reject) => {
        const result = fetch(`https://randomuser.me/api`);  
        if(result) {
            resolve(result);
        } else {
            reject(result);
        }
    });
}

function get_random_person_data_and_display() {
  get_data_from_api().
    then((result) => {
        result = result.json();
        return result;
    }).
    then((result) => {
        const user_data = {
            full_name: `${result.results[0].name.first} ${result.results[0].name.last}`,
            wealth: `$${generate_money()}.00`
        }
        append_person_in_dom(user_data);
        return result.results;
    });
}

function append_person_in_dom(person) {
    const person_data = document.createElement("LI");
    const strong = document.createElement("strong");
    const span = document.createElement("span");
    person_data.classList.add('person-data-list-item');

    const full_name = document.createTextNode(person.full_name);
    const wealth = document.createTextNode(person.wealth);

    strong.appendChild(full_name);
    span.appendChild(wealth);
    

    person_data.appendChild(strong);
    person_data.appendChild(span);

    person_data_list.appendChild(person_data);
} 

function generate_money() {
  return  formate_money(Math.floor( 1000001 * Math.random()));
}

function formate_money(data) {
return Intl.NumberFormat().format(data);
}

function remove_commas_and_$(data) {
    return parseInt(data.replace(/\,|\$/g, ""));
}

function double_money() {

    let data = Array.from(person_data_list.children);
    data.forEach((person_data, index) => {
        if(index !== 0) {
            let person_money_string = person_data.children[1].textContent; 
            person_money_string = remove_commas_and_$(person_money_string) * 2;
            person_money_string = formate_money(person_money_string);
            person_data.children[1].textContent = `$${person_money_string}.00`;    
        }
    });
}

function show_millionaires()  {

    // getting all the children of person-data-list from the dom. 
    let person_data_list_item = document.querySelectorAll('.person-data-list-item');

    person_data_list_item.forEach((person_data) => {
        let person_money_string = person_data.children[1].textContent;
        person_money_string = remove_commas_and_$(person_money_string);  
        if(person_money_string < 1000000) {
            person_data.remove();
        }
    });
}

function sort_person() {
    // getting all the children of person-data-list from the dom. 
    let person_data_list_item = document.querySelectorAll('.person-data-list-item');
    person_data_list_item = Array.from(person_data_list_item);

    // sorting the list.
    person_data_list_item = person_data_list_item.sort((person1, person2) => {
         person1 = person1.children[1].textContent;
         person1 = remove_commas_and_$(person1);  

         person2 = person2.children[1].textContent;
         person2 = remove_commas_and_$(person2);  

        if (person1 < person2) return 1;
        if (person1 > person2) return -1;
        return 0;
    });

    // removing all the items before appending new sorted list.
    document.querySelectorAll('.person-data-list-item').forEach((li) => {
        li.remove();
    });

    // appending new sorted list.
    person_data_list_item.forEach((person) => {
    const user_data = {
        full_name: person.children[0].textContent,
        wealth: person.children[1].textContent
    }
    append_person_in_dom(user_data);
    });
}

function add_wealth() {

    let person_data_list_item = document.querySelectorAll('.person-data-list-item');
    person_data_list_item = Array.from(person_data_list_item);

    let total = person_data_list_item.reduce((previous, current) => {
        current = remove_commas_and_$(current.children[1].textContent); 
        console.log(previous, current);
        return previous + current; 
    }, 0);  
    total = formate_money(total);
    person_data_list.innerHTML += `
    <li class="person-data-list-item white-background"><strong>Total Wealth:</strong> <span>$${total}.00</span></li> 
    `
}

document.addEventListener("DOMContentLoaded", () => {
    for(let i = 0; i < 3; i++) {
        get_random_person_data_and_display();
    }
});
add_user_btn.addEventListener("click", get_random_person_data_and_display);
double_money_btn.addEventListener("click", double_money);
millionaires_money_btn.addEventListener("click", show_millionaires);
sort_btn.addEventListener("click", sort_person);
total_btn.addEventListener("click", add_wealth);


