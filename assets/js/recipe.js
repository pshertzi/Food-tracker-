//variable declarations
var modalRecipe = document.querySelector('.modal');
var btnRecipe = document.querySelector('#search-food')
var closeRecipe = document.querySelector('.modal-close')

//create the DOM elements using JQUERY for the card for each recipe
var createCards = function (hits, idx) {
}    

//display the list of recipes found
var displayFoods = function (data) {
}    

//Call the API for the recipes
var getRecipe = function () {

    var foodRecipe = $('input[id=text-search]').val();

    var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + foodRecipe + "&app_id=c988c18a&app_key=4ebf480e76f8a089151060d52078a783";

    if (foodRecipe) {
        fetch(apiURL).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayFoods(data);
                });
            } else {
                alert("Error");
            }
        })
            .catch(function (error) {
                // Notice this `.catch()` getting chained onto the end of the `.then()` method
                alert("Unable to connect");
            });
    }
}

var clickSearchLog = function (event) {
    
    event.preventDefault();
   
    getRecipe();
    $('input[id=text-search]').val("");

}

$('#search-log').click(clickSearchLog);

btnRecipe.addEventListener('click', function () {

    modalRecipe.style.display = 'block'
})

closeRecipe.addEventListener('click', function () {
    modalRecipe.style.display = 'none'
})

window.addEventListener('click', function (event) {
    if (event.target.className === 'modal-background') {
        modalRecipe.style.display = 'none'
    }
})
