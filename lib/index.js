require('./index.css')
require('./foods')
var $ = require('jquery')

$(document).ready(function(){
  showDate(),
  getMealFoods("breakfast")
  mealCalTotal("breakfast")
  getMealFoods("lunch")
  getMealFoods("dinner")
  getMealFoods("snacks")
})

var host = "http://localhost:3000"

function showDate(){
  var currentDate = new Date
  $("#date").append(
    `${currentDate.toDateString()}`
  )
}

function getMealFoods(meal){
  $.getJSON(`${host}/api/v1/meals/${meal}`, function(mealFoods){
    console.log(meal)
    console.log("name:", mealFoods[0].name)
    console.log("calories:", mealFoods[0].calories)
    mealFoods.forEach(function(mealFood){
      $("#" + `${meal}`).append(
        `<tr>
          <td class="food-name">${mealFood.name}</td>
          <td class="calories">${mealFood.calories}</td>
          <td><button class='remove'>-</button>
          </tr>`
      )
    })
  })
  .fail(function(error){
    console.log(error)
  })
}

function mealCalTotal(meal){
  var sum = 0;
  $("#" + `${meal}` + "-totals").append(function () {
    // debugger
     $('.calories').each(function() {
        sum += parseInt($(this).text());
     })
    return sum
  })
}

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    console.log(foods)
    console.log("name:", foods[0].name)
    console.log("calories:", foods[0].calories)
    foods.forEach(function(food){
      $(".foods-dir").append(
        `<tr>
          <td><input type="checkbox" name="${food.name}"></td>
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

$('#food_filter').keyup(function() {
    var that = this;
    $.each($('tr'),
    function(i, val) {
        if ($(val).text().toLowerCase().indexOf($(that).val()) == -1) {
            $('tr').eq(i).hide();
        } else {
            $('tr').eq(i).show();
        }
    });
});

// function deleteFood(id){
//   $.removeData(`${host}/api/v1/foods/${id}.json`,
//     function(msg){
//       console.log("name:", msg.name)
//       console.log("calories:", msg.calories)
//       console.log("active:", msg.active)
//   }
// }
