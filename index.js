// import handleCreateFood, {
//     createFoodBtn,
//     handleDeleteFood,
// } from './page-create/index.js'
let url = "http://localhost:3000/foods";




function start() {
    getFoods(renderFoods);
    handleCreateFood()

}
start()

function getFoods(cb) {

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(cb)
        .catch(err => {
            console.error(err);
        });

}


function handleDeleteFood(id) {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(url + '/' + id, options)
        .then(response => {
            response.json()
        })
        .then(function () {
            const foodItem = document.querySelector('.food-' + id);
            if (foodItem) {
                foodItem.remove()
            }
        })
}
//render food

function renderFoods(foods) {


    const listFood = document.querySelector('.content__api');
    let htmls = foods.map(food => {
        return `
            <li class="content__item food-${food.id}">
                <div class="content__heading-text flex">
                    <span class="content__heading-num">${food.id}</span>
                    <h2 class="content__item-heading">${food.title}</h2>
                    <button onclick="handleDeleteFood(${food.id})" class="btn-delete">&times;</button>
                </div>
                <img src="${food.imgUrl}"
                    alt="${food.title}" class="content__item-img">
                <p class="content__item-desc">${food.description}</p>
            </li>
        `;
    });
    listFood.innerHTML = htmls.join("")
}

function handleCreateFood() {
    const createFood = document.querySelector('#create');
    createFood.onclick = () => {
        const imgUrl = document.querySelector('input[name="imgUrl"]').value;
        const description = document.querySelector('textarea[name="description"]').value;
        const title = document.querySelector('input[name="title"]').value;
        console.log(imgUrl);
        console.log(description);
        console.log(title);
        let formData = {
            imgUrl,
            description,
            title
        };
        createFoodBtn(formData, function () {
            getFoods(renderFoods);
        })
    }
}
function createFoodBtn(data, cb) {
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url, options)
        .then(response => {
            response.json()
        })
        .then(cb)
}

//search
const searchInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn')


const handleSearch = (e) => {
    //Using sever rendering option
    e.preventDefault();

    //capture search value
    //create a request URL
    // let url = `https://www.google.com/search?q=${titleQuery}`;
    // //async await fetch json
    // console.log("await fetch(url)", url);
    //data.map( inner HTML)

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const titleQuery = searchInput.value;
            const newData = data.filter(e => {
                return e.title === titleQuery;
            })

            const listFood = document.querySelector('.content__api');
            let htmls = newData.map(food => {
                return `
            <li class="content__item food-${food.id}">
                <div class="content__heading-text flex">
                    <span class="content__heading-num">${food.id}</span>
                    <h2 class="content__item-heading">${food.title}</h2>
                    <button onclick="handleDeleteFood(${food.id})" class="btn-delete">&times;</button>
                </div>
                <img src="${food.imgUrl}"
                    alt="${food.title}" class="content__item-img">
                <p class="content__item-desc">${food.description}</p>
            </li>
        `;
            });
            listFood.innerHTML = htmls.join("")
        })
        .catch(err => {
            console.error(err);
        });

};

searchBtn.addEventListener("click", handleSearch);