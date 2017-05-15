require('./index.css')
require('./foods')
var $ = require('jquery')
var dateFormat = require('dateformat')

$(document).ready(function(){
  showDate(new Date)
  var formattedDate = dateFormat(new Date, 'yyyy-mm-dd')
  getMealFoods("breakfast", formattedDate)
  getMealFoods("lunch", formattedDate)
  getMealFoods("dinner", formattedDate)
  getMealFoods("snacks", formattedDate)
})

var host = "http://localhost:3000"

function showDate(selectedDate){
  $("#date").text(
    `${selectedDate.toDateString()}`
  )
}

$(".date").change(function() {
  var formattedDate = dateFormat(new Date($('#date').text()), 'yyyy-mm-dd')
  getMealFoods("breakfast", formattedDate)
  getMealFoods("lunch", formattedDate)
  getMealFoods("dinner", formattedDate)
  getMealFoods("snacks", formattedDate)
})

function getMealFoods(meal, date){
  $(`.${meal}-foods`).remove();
  $.getJSON(`${host}/api/v1/meals/${meal}?date=${date}`, function(mealFoods){
    mealFoods.forEach(function(mealFood){
      $("#" + `${meal}`).append(
        `<tr class='${meal}-foods'>
          <td class="food-name">${mealFood.name}</td>
          <td class="calories">${mealFood.calories}</td>
          <td><button class='remove'>-</button>
          </tr>`
      )
    })
    mealCalTotal(meal, mealFoods)
  })
  .fail(function(error){
    $(`.${meal}-totals`).text("0")
  })
}

function mealCalTotal(mealName, mealFoods){
  var sum = 0;
  mealFoods.forEach(function(food) {
    sum = sum + food.calories
  })
  $(`.${mealName}-totals`).text(sum)
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
  var formattedDate = dateFormat(new Date($('#date').text()), 'yyyy-mm-dd')
  getMealFoods("breakfast", formattedDate)
  getMealFoods("lunch", formattedDate)
  getMealFoods("dinner", formattedDate)
  getMealFoods("snacks", formattedDate)
})

$('#previousDay').click(function() {
  var selectedDate = new Date(new Date($("#date").text()).getTime() - (1000 * 60 * 60 * 24))
  showDate(selectedDate);
  var formattedDate = dateFormat(new Date($('#date').text()), 'yyyy-mm-dd')
  getMealFoods("breakfast", formattedDate)
  getMealFoods("lunch", formattedDate)
  getMealFoods("dinner", formattedDate)
  getMealFoods("snacks", formattedDate)
})

// function deleteFood(id){
//   $.removeData(`${host}/api/v1/foods/${id}.json`,
//     function(msg){
//       console.log("name:", msg.name)
//       console.log("calories:", msg.calories)
//       console.log("active:", msg.active)
//   }
// }
