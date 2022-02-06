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

var error = document.querySelector('.modal-error')

//safe data into localstorage
var saveLocalStorage = function (foods) {

    //var oldtimes to read the previous
    var oldItems = JSON.parse(localStorage.getItem("foodLogFile"));
    if (oldItems) {
        // with the old record need now append the new record
        oldItems.push(foods);
        localStorage.setItem("foodLogFile", JSON.stringify(oldItems));
        foodLogFile = oldItems;

    } else {
        //if not old data save the current score to localstorage
        foodLogFile.push(foods)
        localStorage.setItem("foodLogFile", JSON.stringify(foodLogFile));
    }
}

//clean table inside modal screen and array temporal search
var cleanTableModal = function () {
    //$('#modal-line').remove();
    var linesTr = $('#modal-line > tr ');
    if (linesTr.length > 0) {

        linesTr.remove();

    }
    if (apiList.length > 0) {
        apiList = [];
    }
}

//fill with the data the table with all list of foods
var fillModalTable = function (foods) {
    modalTable.style.display = 'block'
    $('#modal-line').append('<tr id=' + foods.index + '><td id=' + foods.index + '>' + foods.label + '</td>' + '<td>' + foods.calories + '</td>' + '<td>' + foods.carb + '</td>' + '<td>' +
        foods.protein + '</td>' + '<td>' + foods.fat + '</td></tr>');
}

//after search the food in the API Display into the table the list also safe into array 
var displayFoods = function (data) {

    cleanTableModal();

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
    $('#modal-line tr').mouseover(function (event) {
        event.target.style.color = "White"
        event.target.style.backgroundColor = "#e1f7cc";
    })
    $('#modal-line').mouseout(function (event) {
        event.target.style.color = "#eb6424"
        event.target.style.backgroundColor = "#ffffee";
    })

    $('#modal-line').one('click', function (event) {

        if (apiList.length > 0) {

            var index = parseInt(event.target.getAttribute('id'));

            var dateMoment = moment().format('MMMM Do YYYY, h:mm:ss a');

            $('#table-line').append('<tr><td>' + dateMoment + '</td>' + '<td>' + apiList[index].label + '</td>' + '<td>' + apiList[index].calories + '</td>' + '<td>' + apiList[index].carb + '</td>' + '<td>' +
                apiList[index].protein + '</td>' + '<td>' + apiList[index].fat + '</td></tr>');

            containerTable.style.display = 'block'
            // save to localstorage
            //foods.index = 0;
            foods.date = dateMoment;
            foods.label = apiList[index].label;
            foods.calories = apiList[index].calories;
            foods.protein = apiList[index].protein;
            foods.carb = apiList[index].carb;
            foods.fat = apiList[index].fat;

            saveLocalStorage(foods)

            modalTable.style.display = 'none'
            modal.style.display = 'none'
            foodSearchLog = "";
            cleanTableModal();
        }
    });
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

//load from localstorage the foodlog
var loadFoodLog = function () {

    listLogFoods = JSON.parse(localStorage.getItem("foodLogFile"));
    var lineFoods = "";
    if (listLogFoods) {
        containerTable.style.display = 'block'
        for (var i = 0; i < listLogFoods.length; i++) {

            $('#table-line').append('<tr><td>' + listLogFoods[i].date + '</td>' + '<td>' + listLogFoods[i].label + '</td>' + '<td>' + listLogFoods[i].calories + '</td>' + '<td>'
                + listLogFoods[i].carb + '</td>' + '<td>' + listLogFoods[i].protein + '</td>' + '<td>' + listLogFoods[i].fat + '</td></tr>');
        }
    } else {
        containerTable.style.display = 'none'
    }
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