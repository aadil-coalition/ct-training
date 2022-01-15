// get specific number of apis for every scroll. done.
// on scroll get the data from the jsonplaceholder typoicode. done.
// while fetching, display loading image. and when you display that data hide that loading image. done.
// make search funcitonality, on every key down perform search and get the data. done.


// getting appropriate elements
const post_list = document.querySelector('.post-list');
const loader = document.querySelector('.loader');
const search_input = document.querySelector('#search-input');


let limit = 5;
const page = 1;
let random_post_array;

// get the data from api 
function api_call(limit) {

    return new Promise((resolve, reject) => {

    let result = fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    if(result) {
        resolve(result);
    } else {
        reject(result);
    }
    });
}



function get_random_post(limit) {
    api_call(limit).
    then((result) => {
        return result.json();
    }).then((result) => {
        display_loader(false);
        display_post(result);
        return result;
    }
    );
}

function display_post(result) {
    result =  result.slice(limit - 5);
    result.forEach((post) => {
        post_list.innerHTML += `
        <li class="post-list-item">
        <span class="post-list-index">${post.id}</span>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-discription">${post.body}</p>
        </li>
        `;
    });
}

function display_loader(display) {

if(display) {
    loader.style.visibility = "visible";
} else {
    loader.style.visibility = "hidden";
}
}

function search_posts(input) {
    for(post of post_list.children) {
        if(input) {
            if(input == post.children[1].textContent.substring(0, input.length)) {
                // console.log('found');
                // post.style.background = "green";
            } else {
                post.style.display = "none";
            }
        } else {
            empty_post_list();
            get_random_post(5);
            break;
        }
    }
}

function empty_post_list() {
    post_list.innerHTML = "";
}
search_input.addEventListener('input', (e) => {
    search_posts(e.target.value);
});

document.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight) {
        limit += 5;
        display_loader(true);
        get_random_post(limit);
    }
});

get_random_post(limit);
