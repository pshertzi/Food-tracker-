var foods = {

    label: "",
    calories: "",
    carb: "",
    protein: "",
    fat: "",
    num: 0,
    date: "",
}


var apiList = [];
var foodLogFile = [];
var listLogFoods = [];

var foodSearchLog = "";

//variables declarations
//modal for the search
var modal = document.querySelector('.modal');

//button click search
var btnSearch = document.querySelector('#search-food');

//to close the modal
var closeModal = document.querySelector('.modal-close');

var modalTable = document.querySelector('#modal-table');

// table
var containerTable = document.querySelector('.container-table');

//fill with the data the table with all list of foods
var fillModalTable = function (foods) {
    modalTable.style.display = 'block'
    $('#modal-line').append('<tr id=' + foods.index + '><td id=' + foods.index + '>' + foods.label + '</td>' + '<td>' + foods.calories + '</td>' + '<td>' + foods.carb + '</td>' + '<td>' +
        foods.protein + '</td>' + '<td>' + foods.fat + '</td></tr>');
}

//after search the food in the API Display into the table the list also safe into array 
var displayFoods = function (data) {

    //need to put clear rutine before

    for (var i = 0; i < data.hints.length; i++) {

        foods.index = i;
        foods.label = data.hints[i].food.label;
        foods.calories = Math.floor(data.hints[i].food.nutrients.ENERC_KCAL);
        foods.protein = Math.floor(data.hints[i].food.nutrients.PROCNT)
        foods.carb = Math.floor(data.hints[i].food.nutrients.CHOCDF);
        foods.fat = Math.floor(data.hints[i].food.nutrients.FAT);
        if (!foods.fat) {
            foods.fat = 0;
        }
        apiList.push({
            label: foods.label,
            calories: foods.calories,
            protein: foods.protein,
            carb: foods.carb,
            fat: foods.fat
        });

        //next will display inot the table
        fillModalTable(foods);

    }
}
//Search into the API the foods

var getFoodSearch = function () {

    var foodText = $('input[id=text-search]').val();

    var apiURL = "https://api.edamam.com/api/food-database/v2/parser?app_id=a80b5d41&app_key=1b9c6ac90670eca435343c5551f23112&ingr=" + foodText

    if (foodText) {
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
               
                alert("Unable to connect to API EDAMAM");
            });
    }
}



var loadFoodLog = function () {
    containerTable.style.display = 'none'
}

var clickSearchLog = function (event) {

    event.preventDefault();

    getFoodSearch();
    $('input[id=text-search]').val("");

}


btnSearch.addEventListener('click', function () {
    //avoid display header of the table
    modalTable.style.display = 'none'
    modal.style.display = 'block'

})

closeModal.addEventListener('click', function () {
    modal.style.display = 'none'
    //cleanTableModal();
    modalTable.style.display = 'none'
})
//When click the search button on search
$('#search-log').click(clickSearchLog);

loadFoodLog();