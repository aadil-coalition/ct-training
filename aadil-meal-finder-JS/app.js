// get the result based on search term from api done.
// when the input is emty show alert. done
// display that in browser done
// display search term in the p tag. done
// on shuffle button click show random fodd with single page tamplet. done

// for making random calls
// https://www.themealdb.com/api/json/v1/1/random.php
// for specific calls
// https://www.themealdb.com/api/json/v1/1/search.php?s=${term}


// getting appropriate elements
const multiple_food_container = document.querySelector('.multiple-food-container');
const search_messege = document.querySelector('.search-messege');
const search_form = document.querySelector('#search-form');
const random_food_btn = document.querySelector('.random-food-btn');
const search_btn = document.querySelector('.search-btn');
const single_food_container = document.querySelector('.single-food-container');
// for single food
const food_heading = document.querySelector('.food-heading');
const single_food_image = document.querySelector('.single-food-image');
const food_type = document.querySelector('.food-type');
const food_detail = document.querySelector('.food-detail');
const Ingredients_list = document.querySelector('.Ingredients-list');


function get_data_from_api(term) {
return new Promise((resolve, reject) => {
let result;   
if(term) {
    result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
} else  {
    result = fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
}

if(result) {
    resolve(result);
} else {
     reject(result);
}
});
}

function display_multiple_foods(foods, input) {
    search_messege.style.visibility = "visible";
    single_food_container.style.display = "none";
    multiple_food_container.style.display = "flex";
    
    search_messege.innerHTML = `Search results for <span id="search-term">${input}</span>:`;
    multiple_food_container.innerHTML = '';
    foods.forEach((food) => {
        multiple_food_container.innerHTML += `
        <div class="food-image-container">
        <img src="${food.strMealThumb}" alt="${food.strMeal}">
        <p class="food-name">${food.strMeal}</p>
        </div>
        `;
    });
}

function display_single_food(food) {
    search_messege.style.visibility = "hidden";
    single_food_container.style.display = "block";
    multiple_food_container.style.display = "none";

    food_heading.textContent = food[0].strMeal;
    single_food_image.setAttribute('src', food[0].strMealThumb);
    food_type.children[0].textContent = food[0].strCategory;
    food_type.children[1].textContent = food[0].strArea;
    food_detail.textContent = food[0].strInstructions;
    
    // displaying ingridents
    for(let i = 0; i < 20; i++) {
        let ingredient = food[0][`strIngredient${i}`];
        let massure = food[0][`strMeasure${i}`];
        if(ingredient && massure) {
            Ingredients_list.innerHTML += `
            <li>${ingredient} - ${massure}</li>
            `;
        }
    }
}

function no_result(input) {
    search_messege.innerHTML = `There are no search results with "${input}". Try again!`;
}

function get_food_data(input) {
    get_data_from_api(input).
    then((result) => {
        return result = result.json();
    }).
    then((result) => {
        if(input === "") {
            display_single_food(result.meals);
        } else {
            display_multiple_foods(result.meals, input);
        }
    }).
    catch((error) => {
        no_result(input);
    });
}

search_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(e.target.children[1].value === "") {
        alert('type search term in input box');
    } else {
        get_food_data(e.target.children[1].value);
    }
});
search_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.parentElement.parentElement.children[1].value === "") {
        alert('type search term in input box');
    } else {
        get_food_data(e.target.parentElement.parentElement.children[1].value);
    }
});

random_food_btn.addEventListener("click", (e) => {
    get_food_data("");
});