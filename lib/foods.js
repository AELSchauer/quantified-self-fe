var $ = require('jquery')
var dateFormat = require('dateformat')
var mealsReference = {'daily': 2000, 'breakfast': 400, 'lunch': 600, 'dinner': 800, 'snacks': 200}
var host = 'https://immense-oasis-43144.herokuapp.com'

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    if($(this).closest("tr").attr("data-food") !== undefined) {
      deleteFoods($(this).closest("tr").attr("data-food"))
    } else {
      deleteMealFood($(this).closest("tr").attr("data-diary-food"))
    }
  })

  $(".food-display").click(function(){
    $(this).hide().siblings(".edit").show().val($(this).text()).focus()
  })

  $(".edit").keypress(function(e){
    if(e.keyCode == 13){
      $(this).hide().siblings(".food-display").show().focus()
    }
  })

  $(".edit").focusout(function(){
    $(this).hide().siblings(".food-display").show().text($(this).val())
    var sib = $(this).siblings(".food-display")
    editFood(sib)
  })
})


function deleteMealFood(id) {
  $.ajax({
    url: `${host}/api/v1/meal-foods/${id}`,
    type: 'DELETE',
    success: function(msg){
      console.log('successfully deleted')
      var selectedDate = new Date(new Date($("#date").text()).getTime())
      var formattedDate = dateFormat(selectedDate, 'yyyy-mm-dd')
      generateMealDiaries(formattedDate)
    }
  })
  .fail(function(error) {
    console.log(error)
  })
}

function editFood(sib) {
  data = {}
  data[sib.attr('name')] = sib.html()
  id = sib.closest("tr").attr("data-food")
  updateFoods(id, data)
}

$('#add-food-button').on('click', function() {
  var foodNameField = $("#new-food-name-field")
  var foodCaloriesField = $("#new-food-calories-field")
  if(validateAddFoodForm(foodNameField, foodCaloriesField) == true) {
    createFood(foodNameField.val(), foodCaloriesField.val())
    location.reload()
  }
})

function validateAddFoodForm(nameField, caloriesField) {
  var valid = true
  if(nameField.val() == "") {
    nameField.parent().after("<div class='red'>Name required</div>")
    valid = false
  }
  if(caloriesField.val() == "") {
    caloriesField.parent().after("<div class='red'>Calories required</div>")
    valid = false
  }
  return valid
}

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    foods.forEach(function(food){
      $("#foods-dir").append(
        `<tr data-food='${food.id}' class='food-row'>
          <td>
            <span class='food-name food-display' name='name'>${food.name}</span>
            <input type="text" class="edit" style="display:none" />
          </td>
          <td>
            <span class='food-calories food-display' name='calories'>${food.calories}</span>
            <input type="number" class="edit" style="display:none" min='0' step='10' />
          </td>
          <td><button class='remove'>-</button>
        </tr>`
      )
    })
  })
  .fail(function(error){
    console.log(error)
  })
}

function deleteFoods(id){
  $.ajax({
    url: `${host}/api/v1/foods/${id}`,
    type: 'DELETE',
    success: function(msg){
      console.log('successfully deleted')
      location.reload()
    }
  })
  .fail(function(error) {
    console.log(error)
  })
}

function updateFoods(id, data){
  $.ajax({
    url: `${host}/api/v1/foods/${id}`,
    type: 'PUT',
    data: data,
    success: function(msg){
      console.log('successfully updated')
    }
  })
  .fail(function(error) {
    console.log(error)
  })
}

function createFood(name, calories){
  $.post(`${host}/api/v1/foods`,
  {name: name, calories: calories},
  function(msg){
    // alert message here
  })
}

$('#food_filter').keyup(function() {
  var that = this
  $.each($('tr'),
  function(i, val) {
    if ($(val).text().toLowerCase().indexOf($(that).val()) == -1) {
      $('tr').eq(i).hide()
    } else {
      $('tr').eq(i).show()
    }
  })
})

// function generateMealDiaries(date) {
//   var dayTotal = 0
//   Object.keys(meals).forEach(function(mealName) {
//     $(`.${mealName}-foods`).remove();
//   })
//   $("input[type=checkbox]").each(function() { this.checked=false; });
//   $.getJSON(`${host}/api/v1/meals?date=${date}`, function(meals){
//     Object.keys(meals).forEach(function(mealName) {
//       var mealFoods = meals[mealName]
//       mealFoods.forEach(function(mealFood) {
//         $("#" + `${mealName}`).append(
//           `<tr class='${mealName}-foods food-row' data-diary-food=${mealFood.id}>
//             <td class="food-name">${mealFood.name}</td>
//             <td class="calories">${mealFood.calories}</td>
//             <td><button class='remove'>-</button>
//           </tr>`
//         )
//       })
//       mealTotal = mealCalTotal(mealName, mealFoods);
//       displayCalTotal(mealName, mealTotal);
//       dayTotal = dayTotal + mealTotal;
//       displayCalTotal('daily', dayTotal);
//     })
//   })
//   .fail(function(error){
//     Object.keys(meals).forEach(function(mealName) {
//       displayCalTotal(mealName, 0)
//     })
//   })
// }

// function mealCalTotal(mealName, mealFoods){
//   var sum = 0;
//   mealFoods.forEach(function(food) {
//     sum = sum + food.calories
//   })
//   return sum
// }

// function displayCalTotal(sectionName, sum) {
//   $(`.${sectionName}-totals`).text(sum)
//   var remaining = meals[sectionName] - sum
//   var remainingDiv = $(`.${sectionName}-remaining`)
//   remainingDiv.text(remaining)
//   remainingDiv.removeClass('red')
//   remainingDiv.removeClass('green')
//   if(remaining < 0) {
//     remainingDiv.addClass('red')
//   }else{
//     remainingDiv.addClass('green')
//   }
// }

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

getFoods();
