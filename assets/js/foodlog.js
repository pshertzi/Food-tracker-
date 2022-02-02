//variables declarations
//modal for the search
var modal = document.querySelector('.modal');

//button click search
var btnSearch = document.querySelector('#search-food');

//to close the modal
var closeModal = document.querySelector('.modal-close');

var modalTable = document.querySelector('#modal-table');


var clickSearchLog = function (event) {
    
    event.preventDefault();
   
    //getFoodSearch();
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