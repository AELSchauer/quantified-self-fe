require('./index.css')
require('./foods')
var $ = require('jquery')

$(document).ready(function(){
  showDate(new Date)
  // getMealFoods("breakfast")
  // getMealFoods("lunch")
  // getMealFoods("dinner")
  // getMealFoods("snacks")
})

var host = "http://localhost:3000"

function showDate(selectedDate){
  $("#date").text(
    `${selectedDate.toDateString()}`
  )
}

// $(".date").change(function() {
//   getMealFoods("breakfast")
//   getMealFoods("lunch")
//   getMealFoods("dinner")
//   getMealFoods("snacks")
// })


// function getNextDay() {
//   console.log(arg, $('#date').innerHTML))
//   return new Date(new Date($('#date').innerHTML) + (1000 * 60 * 60 * 24))
// }
//
// function getPreviousDay() {
//   console.log(arg, $('#date').innerHTML))
//   return new Date(new Date($('#date').innerHTML) - (1000 * 60 * 60 * 24))
// }

function getMealFoods(meal){
  $.getJSON(`${host}/api/v1/meals/${meal}`, function(mealFoods){
    mealFoods.forEach(function(mealFood){
      $("#" + `${meal}`).append(
        `<tr>
          <td class="food-name">${mealFood.name}</td>
          <td class="calories">${mealFood.calories}</td>
          <td><button class='remove'>-</button>
          </tr>`
      )
    })
    mealCalTotal(meal, mealFoods)
  })
  .fail(function(error){
    console.log(error)
  })
}

function mealCalTotal(mealName, mealFoods){
  var sum = 0;
  mealFoods.forEach(function(food) {
    sum = sum + food.calories
  })
  $(`.${mealName}-totals`).append(sum)
}

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    foods.forEach(function(food){
      $(".foods-dir").append(
        `<tr class="food">
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
    $.each($('tr.food'),
    function(i, val) {
        if ($(val).text().toLowerCase().indexOf($(that).val()) == -1) {
            $('tr.food').eq(i).hide();
        } else {
            $('tr.food').eq(i).show();
        }
    });
});

$('#nextDay').click(function() {
  var selectedDate = new Date(new Date($("#date").text()).getTime() + (1000 * 60 * 60 * 24))
  showDate(selectedDate);
})

$('#previousDay').click(function() {
  var selectedDate = new Date(new Date($("#date").text()).getTime() - (1000 * 60 * 60 * 24))
  showDate(selectedDate);
})

// function deleteFood(id){
//   $.removeData(`${host}/api/v1/foods/${id}.json`,
//     function(msg){
//       console.log("name:", msg.name)
//       console.log("calories:", msg.calories)
//       console.log("active:", msg.active)
//   }
// }
