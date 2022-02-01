var modal =
    document.querySelector('.modal');

var btnDetails =
    document.querySelector('#btn-details')
var close =
    document.querySelector('#modal-close')
var btnClose =
    document.querySelector('#btn-close')

var displayIngredient = function (meals, modal) {
    var strFoodDetails = "";

    modal.html('<h1>Ingredients</h1>');
    if (meals.strIngredient1) {
        strFoodDetails = '<li>' + meals.strIngredient1 + '</li>'
    }
    if (meals.strIngredient2) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient2 + '</li>'
    }
    if (meals.strIngredient3) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient3 + '</li>'
    }
    if (meals.strIngredient4) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient4 + '</li>'
    }
    if (meals.strIngredient5) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient5 + '</li>'
    }
    if (meals.strIngredient6) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient6 + '</li>'
    }
    if (meals.strIngredient7) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient7 + '</li>'
    }
    if (meals.strIngredient8) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient8 + '</li>'
    }
    if (meals.strIngredient9) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient9 + '</li>'
    }
    if (meals.strIngredient10) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient10 + '</li>'
    }
    if (meals.strIngredient11) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient11 + '</li>'
    }
    if (meals.strIngredient12) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient12 + '</li>'
    }
    if (meals.strIngredient13) {
        strFoodDetails = strFoodDetails +  '<li>' + meals.strIngredient13 + '</li>'
    }
    if (meals.strIngredient14) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient14 + '</li>'
    }
    if (meals.strIngredient15) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient15 + '</li>'
    }
    if (meals.strIngredient16) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient16 + '</li>'
    }
    if (meals.strIngredient17) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient17 + '</li>'
    }
    if (meals.strIngredient18) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient18 + '</li>'
    }
    if (meals.strIngredient19) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient19 + '</li>'
    }

    if (meals.strIngredient20) {
        strFoodDetails = strFoodDetails + '<li>' + meals.strIngredient20 + '</li>'
    }

    modal.append(strFoodDetails);
    modal.append('</ul>');

}

var displayRandomFood = function (data) {

    var description = $('#desc-food');
    var modalInstructions = $('.content');

    for (var i = 0; i < data.meals.length; i++) {
        description.html('<img  src=' + data.meals[i].strMealThumb + '>' + '<h4 class="mt-5">' + data.meals[i].strMeal + '</h4>');

        displayIngredient(data.meals[i], modalInstructions);
        modalInstructions.append('<h1>Recipe Instructions</h1>');
        modalInstructions.append(data.meals[i].strInstructions);

    }
}


//API to get a random recipe
var randomRecipe = function () {
    var apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(apiUrl)
        .then(response => {
            response.json().then(function (data) {
                console.log(data);
                displayRandomFood(data);

            });
        })
        .catch(err => {
            console.error(err);
        });
}

randomRecipe();



btnDetails.addEventListener('click',
    function () {

        //modal.style.display = 'block'
        $(".modal").addClass("is-active");
    })

close.addEventListener('click',
    function () {
        $(".modal").removeClass("is-active");
        // modal.style.display = 'none'
    })

btnClose.addEventListener('click',
    function () {
        $(".modal").removeClass("is-active");
        // modal.style.display = 'none'
    })

window.addEventListener('click',
    function (event) {
        if (event.target.className ===
            'modal-background') {
            //modal.style.display = 'none'
            $(".modal").removeClass("is-active");
        }
    })

