

var displayRandomFood = function(data){

    var description = $('#desc-food');
    for(var i=0; i<data.meals.length ; i++ ){
        description.html('<img  src='+ data.meals[i].strMealThumb+'>'+'<h4 class="mt-5">' + data.meals[i].strMeal + '</h4>');
    }
}


//API to get a random recipe
var randomRecipe = function(){
    var apiUrl ="https://www.themealdb.com/api/json/v1/1/random.php";
    
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