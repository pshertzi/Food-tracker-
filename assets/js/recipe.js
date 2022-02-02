//variable declarations
var modalRecipe =
    document.querySelector('.modal');
var btnRecipe =
    document.querySelector('#search-food')
var closeRecipe =
    document.querySelector('.modal-close')



 

btnRecipe.addEventListener('click',function () {
    
    modalRecipe.style.display = 'block'
})

closeRecipe.addEventListener('click',function () {
    modalRecipe.style.display = 'none'
})

window.addEventListener('click',function (event) {
    if (event.target.className === 'modal-background') {
            modalRecipe.style.display = 'none'
    }
})
