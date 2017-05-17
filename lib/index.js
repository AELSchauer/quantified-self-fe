require('./index.css')
require('./foods')
var $ = require('jquery')
var dateFormat = require('dateformat')
var mealsReference = {'daily': 2000, 'breakfast': 400, 'lunch': 600, 'dinner': 800, 'snacks': 200}
var host = "https://aelschauer.github.io/quantified-self-fe/"

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
  showDate(selectedDate)
  var formattedDate = dateFormat(selectedDate, 'yyyy-mm-dd')
  generateMealDiaries(formattedDate)
})

$('#previousDay').click(function() {
  var selectedDate = new Date(new Date($("#date").text()).getTime() - (1000 * 60 * 60 * 24))
  showDate(selectedDate)
  var formattedDate = dateFormat(selectedDate, 'yyyy-mm-dd')
  generateMealDiaries(formattedDate)
})

function generateMealDiaries(date) {
  // Clear out existing diary food rows
  var dayTotal = 0
  Object.keys(mealsReference).forEach(function(mealName) {
    $(`.${mealName}-foods`).remove()
  })
  $("input[type=checkbox]").each(function() { this.checked=false })

  // Ajax call to get all meal-food data
  $.getJSON(`${host}/api/v1/meals?date=${date}`, function(meals){
    var referenceMealNames = Object.keys(mealsReference)
    referenceMealNames.forEach(function(referenceMealName) {
      // For any mealsReference with food, create a row for each food
      var mealFoods = meals[referenceMealName]
      addMealFoodsToPage(referenceMealName, mealFoods)

      // Put in the totals for EVERY meal (total = 0 if no food)
      mealTotal = mealCalTotal(mealFoods)
      console.log(referenceMealName, mealTotal)
      displayCalTotal(referenceMealName, mealTotal)

      // Calculate the daily total for food
      dayTotal = dayTotal + mealTotal
      displayCalTotal('daily', dayTotal)
    })
  })
}

function addMealFoodsToPage(mealName, mealFoods) {
  if( mealFoods !== undefined) {
    mealFoods.forEach(function(mealFood) {
      $("#" + `${mealName}`).append(
        `<tr class='${mealName}-foods food-row' data-diary-food=${mealFood.id}>
          <td class="food-name">${mealFood.name}</td>
          <td class="calories">${mealFood.calories}</td>
          <td><button class='remove'>-</button>
        </tr>`
      )
    })
  }
}

function mealCalTotal(mealFoods){
  var sum = 0
  if(mealFoods !== undefined) {
    mealFoods.forEach(function(food) {
      sum = sum + food.calories
    })
  }
  return sum
}

function displayCalTotal(sectionName, sum) {
  $(`.${sectionName}-totals`).text(sum)
  var remaining = mealsReference[sectionName] - sum
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

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    foods.forEach(function(food){
      $(".foods-dir").append(
        `<tr class="food">
          <td><input class="checked-food" type="checkbox" name="${food.id}"></td>
          <td class="food-name">${food.name}</td>
          <td>${food.calories}</td>
          </tr>`
      )
    })
  })
  .fail(function(error){
    console.log(error)
  })
}

$('#food_filter').keyup(function() {
  var that = this
  $.each($('.food-name').parent(),
  function(i, val) {
    if ($(val).text().toLowerCase().indexOf($(that).val()) == -1) {
      $('.food-row').eq(i).hide()
    } else {
      $('.food-row').eq(i).show()
    }
  })
})

$('.add-to-meal').click(function(){
  var meal_id = this.name
  var selectedDate = new Date(new Date($("#date").text()).getTime())
  var formattedDate = dateFormat(selectedDate, 'yyyy-mm-dd')
  $('.checked-food:checked').each(function(){
    var food_id = this.name
    $.post(`${host}/api/v1/meal-foods`,
      {meal_id: meal_id, food_id: food_id, date: formattedDate},
      function(msg){
        generateMealDiaries(formattedDate)
    })
    .fail(function(response) {
      console.log(response.responseText)
    })
  })
})

getFoods()
