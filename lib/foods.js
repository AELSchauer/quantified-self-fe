var $ = require('jquery')
var host = "http://localhost:3000"

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    $(this).closest("tr").remove();
  })
})

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    console.log(foods)
    console.log("name:", foods[0].name)
    console.log("calories:", foods[0].calories)
    foods.forEach(function(food){
      $("#foods-dir").append(
        `<tr>
          <td class="food-name">${food.name}</td>
          <td>${food.calories}</td>
          <td><button class='remove'>-</button>
          </tr>`
      )
    })
  })
  .fail(function(error){
    console.log(error)
  })
}

getFoods()

function findNonMatchingFoods(foodSearchInput) {
  return $(".food-name").filter(function(){
    var counter = 0;
    for (var i = 0; i < foodSearchInput.length; i++) {
      if (foodSearchInput[i] === $(this).text()[i]) {
        counter += 1
      }
    }
    return counter != foodSearchInput.length
  })
}

$(".filter-input").keyup(function(){
  var foodSearchInput = $(this).val().toLowerCase()
  var nonMatchingFoods = findNonMatchingFoods(foodSearchInput);
  nonMatchingFoods.parent().hide()
})

module.exports = {
  addFood: function(){
    $("table").append(
      `<tr>
        <td>${foods}</td>
        <td>35</td>
        <td><button class='remove'>-</button>
        </tr>`
    )
  }
}
