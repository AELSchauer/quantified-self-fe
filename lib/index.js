require('./index.css')
require('./foods')
var $ = require('jquery')
var dateFormat = require('dateformat')
var meals = {'daily': 2000, 'breakfast': 400, 'lunch': 600, 'dinner': 800, 'snacks': 200}
var host = "http://localhost:3000"

$(document).ready(function(){
  showDate(new Date)
  var formattedDate = dateFormat(new Date, 'yyyy-mm-dd')
  generateMealDiaries(formattedDate)
})

function showDate(selectedDate){
  $("#date").text(
    `${selectedDate.toDateString()}`
  )
}

$('#nextDay').click(function() {
  var selectedDate = new Date(new Date($("#date").text()).getTime() + (1000 * 60 * 60 * 24))
  showDate(selectedDate);
  var formattedDate = dateFormat(selectedDate, 'yyyy-mm-dd')
  generateMealDiaries(formattedDate)
})

$('#previousDay').click(function() {
  var selectedDate = new Date(new Date($("#date").text()).getTime() - (1000 * 60 * 60 * 24))
  showDate(selectedDate);
  var formattedDate = dateFormat(selectedDate, 'yyyy-mm-dd')
  generateMealDiaries(formattedDate)
})

function generateMealDiaries(date) {
  var dayTotal = 0
  Object.keys(meals).forEach(function(mealName) {
    $(`.${mealName}-foods`).remove();
  })
  $.getJSON(`${host}/api/v1/meals?date=${date}`, function(meals){
    Object.keys(meals).forEach(function(mealName) {
      var mealFoods = meals[mealName]
      mealFoods.forEach(function(mealFood) {
        $("#" + `${mealName}`).append(
          `<tr class='${mealName}-foods'>
            <td class="food-name">${mealFood.name}</td>
            <td class="calories">${mealFood.calories}</td>
            <td><button class='remove'>-</button>
          </tr>`
        )
      })
      mealTotal = mealCalTotal(mealName, mealFoods);
      displayCalTotal(mealName, mealTotal);
      dayTotal = dayTotal + mealTotal;
      displayCalTotal('daily', dayTotal);
    })
  })
  .fail(function(error){
    Object.keys(meals).forEach(function(mealName) {
      displayCalTotal(mealName, 0)
    })
  })
}

function mealCalTotal(mealName, mealFoods){
  var sum = 0;
  mealFoods.forEach(function(food) {
    sum = sum + food.calories
  })
  return sum
}

function displayCalTotal(sectionName, sum) {
  $(`.${sectionName}-totals`).text(sum)
  var remaining = meals[sectionName] - sum
  var remainingDiv = $(`.${sectionName}-remaining`)
  remainingDiv.text(remaining)
  remainingDiv.removeClass('red')
  remainingDiv.removeClass('green')
  if(remaining < 0) {
    remainingDiv.addClass('red')
  }else{
    remainingDiv.addClass('green')
  }
}


///////////////////////////////////////////////////////////////

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

getFoods();
