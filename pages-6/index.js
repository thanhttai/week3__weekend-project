let url = "http://localhost:3000/foods";



// function start() {
//     getFoods(renderFoods);

// }
// start()

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


function renderFoods(foods) {


    const foodPage = document.querySelector('.content__list');
    let newData = foods[6]
    console.log(newData);
    let htmls = () => {
        return `
        <h1 class="content__heading">${newData.title}</h1>
        <div class="sub__heading">By <a href="">Thanhttai</a></div>
        <div class="content__yield"><span>YIELD</span>4 servings</div>
        <div class="content__yield"><span>TIME</span>1 hour</div>
        <div class="flex-row">
            <div class="col l-6">
                <p class="content__description">
                   ${newData.description}
                </p>
            </div>
            <div class="col l-6">

                <img src="${newData.imgUrl}"
                    alt="" width="600px">
                <p class="description__img">Thanhttai students at coderschool</p>
            </div>
        </div>
        `;
    };
    foodPage.innerHTML = htmls()

}