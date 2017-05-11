var $ = require('jquery')
var host = "http://localhost:3000"

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    $(this).closest("tr").remove();
  })
})

$('#addFoodForm').submit(function() {
  var foodName = $("#new-food-name-field").val();
  var foodCalories = $("#new-food-calories-field").val();
  console.log(foodName, foodCalories)
  createFood(foodName, foodCalories)
})

function validateAddFoodForm(name, calories) {
}

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    console.log(foods)
    console.log("name:", foods[0].name)
    console.log("calories:", foods[0].calories)
    foods.forEach(function(food){
      $("#food-table").append(
        `<tr>
          <td>${food.name}</td>
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

function createFood(name, calories){
  $.post(`${host}/api/v1/foods`,
    { name: name, calories: calories },
    function(msg){
      // $('.fakeflash').show();
      // setTimeout(function(){
      //   $('.fakeflash').hide();
      // }, 2000)
    })
}


getFoods()

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
