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
  $("#" + `${meal}` + "-totals").append(function () {
    var sum = 0;
    $('.calories').each(function() {
        sum += parseInt($(this).text());
    })
    return sum
  })
}

// function deleteFood(id){
//   $.removeData(`${host}/api/v1/foods/${id}.json`,
//     function(msg){
//       console.log("name:", msg.name)
//       console.log("calories:", msg.calories)
//       console.log("active:", msg.active)
//   }
// }
