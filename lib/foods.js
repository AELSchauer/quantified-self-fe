var $ = require('jquery')
var host = "http://localhost:3000"

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    $(this).closest("tr").remove();
  })
})

$('#add-food-button').on('click', function() {
  var foodName = $("#new-food-name-field").val();
  var foodCalories = $("#new-food-calories-field").val();
  // debugger
  if(validateAddFoodForm(foodName, foodCalories) == true) {
    createFood(foodName, foodCalories)
    location.reload();
  }
})

function validateAddFoodForm(name, calories) {
  var valid = true
  if(name == "") {
    $('#new-food-name').after("<div class='red'>Name required</div>")
    valid = false
  }
  if(calories == "") {
    $('#new-food-calories').after("<div class='red'>Calories required</div>")
    valid = false
  }
  return valid
}

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    console.log(foods)
    console.log("name:", foods[0].name)
    console.log("calories:", foods[0].calories)
    foods.forEach(function(food){
      $("#foods-dir").append(
        `<tr class='food-row'>
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

// $('#food_filter').keyup(function() {
//   var that = this;
//   $.each($('.food-name').parent(),
//   function(i, val) {
//     if ($(val).text().toLowerCase().indexOf($(that).val()) == -1) {
//       $('.food-row').eq(i).hide();
//     } else {
//       $('.food-row').eq(i).show();
//     }
//   });
// });
