//variable declarations
var modalRecipe = document.querySelector('.modal');
var btnRecipe = document.querySelector('#search-food')
var closeRecipe = document.querySelector('.modal-close')
var errorModal = document.querySelector('.modal-error')

//create the elements using JQUERY for the card for each recipe
var createCards = function (hits, idx) {

    $('#section-cards').append('<br>')
    $('#section-cards').append('<div class="container" id="contCard' + idx + '">');

    $('#contCard' + idx).append('<div class="card is-fullwidth" id="localFull' + idx + '">');
    $('#localFull' + idx).append('<header class="card-header" id="localHeader' + idx + '">');

    $('#localHeader' + idx).append('<p class="card-header-title has-background-grey-dark has-text-white-bis" id="idtitle' + idx + '">' + hits.label + '</p>');


    $('#localFull' + idx).append('<div class="card-content" id="localHidden' + idx + '">');;
    $('#localHidden' + idx).append('<figure class="image is-128x128" id="image' + idx + '">');
    $('#image' + idx).append('<img src="' + hits.image + '" alt="Placeholder image">');
    $('#localHidden' + idx).append('<div class="content" style="background-color: #ffffff">Ingredients: ' + hits.ingredientLines + ' ' + '<a  style="background-color: #ffffff" href="' + hits.url + '" target="_blank">Recipe Instructions<a/>');
    $('#section-cards' + idx).append('<br>')
}

//display the list of recipes found
var displayFoods = function (data, foodRecipe) {

    var listIng = "";

    //previous searchs elimanate those elements
    if ($('#section-cards div').length > 0) {
        $('#section-cards div').remove();
        $('#section-cards br').remove();

    }
    if($('#p-error').length > 0 ){
        $('#p-error').remove();
    }
    if (data.hits.length != 0) {
        for (var i = 0; i < data.hits.length; i++) {
            for (var j = 0; j < data.hits[i].recipe.ingredients; j++) {
                listIng = '<li>' + data.hits[i].recipe.ingredients[j].text + '</li>';
            }
            createCards(data.hits[i].recipe, i);
        }
    } else {

        $('#section-cards').append('<p class="title is-2" id="p-error"> No data found for: ' + foodRecipe);

    }

}
//show error
var showError = function (error) {
    $("#error-msg").append('<p>' + error)
    $("#error-message").addClass("is-active");
}

//Call the API for the recipes
var getRecipe = function () {

    var foodRecipe = $('input[id=text-search]').val();

    var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + foodRecipe + "&app_id=c988c18a&app_key=4ebf480e76f8a089151060d52078a783";

    if (foodRecipe) {
        fetch(apiURL).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayFoods(data, foodRecipe);
                });
            } else {
                showError("Error to get data in API edamam");
            }
        })
            .catch(function (error) {

                showError(error);
            });
    }
}

var clickSearchLog = function (event) {

    event.preventDefault();

    getRecipe();
    $('input[id=text-search]').val("");
    modalRecipe.style.display = 'none'

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

var closeError = function (event) {

    $("#error-message").removeClass("is-active");
}

errorModal.addEventListener("click", closeError);