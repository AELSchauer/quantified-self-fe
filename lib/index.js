require('./index.css')
require('./foods')
var $ = require('jquery')

$(document).ready(function(){
  showDate(),
  getMealFoods("breakfast")
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
    // var totalCals = []
    // var sumCals = totalCals.reduce(
    //   function(total, num){ return total + num }, 0
    // )
    mealFoods.forEach(function(mealFood){
      $("#" + `${meal}`).append(
        `<tr>
          <td class="food-name">${mealFood.name}</td>
          <td>${mealFood.calories}</td>
          <td><button class='remove'>-</button>
          </tr>`
      )
      // totalCals.push(mealFood.calories)
      // )
      // $("#" + `${meal}` + "-totals").append(
      //   `<tr>
      //   <td class="total-meal-cals">Total Calories</td>
      //   <td class="total-meal-cals">${sumCals}</td>
      //   </tr>`
      //   console.log("SUM"sumCals)
    })
  })
  .fail(function(error){
    console.log(error)
  })
}
//
// function updateFood(id){
//   $.put(`${host}/api/v1/foods/${id}.json`,
//     { put: {name: `name`} },
//     { put: {calories: `calories`} },
//     { put: {updated_at: new Date} },
//     function(msg){
//       console.log(msg)
//       console.log("name:", msg.name)
//       console.log("calories:", msg.calories)
//       console.log("updated_at:", msg.updated_at)
//     }
// }
//
// function createFood(id){
//   $.post(`${host}/api/v1/foods.json`,
//     { post: {name: `name`} },
//     { post: {calories: `calories`} },
//     { post: {updated_at: new Date} },
//     { post: {created_at: new Date} },
//     function(msg){
//       console.log(msg)
//       console.log("name:", msg.name)
//       console.log("calories:", msg.calories)
//       console.log("updated_at:", msg.updated_at)
//       console.log("created_at:", msg.created_at)
//     }
// }
//
// function deleteFood(id){
//   $.removeData(`${host}/api/v1/foods/${id}.json`,
//     function(msg){
//       console.log("name:", msg.name)
//       console.log("calories:", msg.calories)
//       console.log("active:", msg.active)
//   }
// }
