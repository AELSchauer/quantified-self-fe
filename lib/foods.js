var $ = require('jquery')
var host = "http://localhost:3000"

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    console.log($(this).closest("tr").attr("data-diary-food"))
    if ($(this).closest("tr").attr("data-food") !== null){
      deleteFoods($(this).closest("tr").attr("data-food"))
    }else {
      console.log($(this).closest("tr").attr("data-diary-food"))
      // deleteMealFood($(this).closest("tr").attr("data-diary-food"))
    }
    $(this).closest("tr").remove();
  })

  $(".food-display").click(function(){
    $(this).hide().siblings(".edit").show().val($(this).text()).focus();
  });

  $(".edit").keypress(function(e){
    if(e.keyCode == 13){
      $(this).hide().siblings(".food-display").show().text($(this).val()).focus();
    }
  })

  $(".edit").focusout(function(){
    $(this).hide().siblings(".food-display").show().text($(this).val());
    var sib = $(this).siblings(".food-display")
    edit(sib)
  });
})


function deleteMealFood(id) {
  $.ajax({
    url: `${host}/api/v1/meal-foods/${id}`,
    type: 'DELETE',
    success: function(msg){
      console.log('successfully deleted')
    }
  })
  .fail(function(error) {
    console.log(error)
  })
}

function edit(sib) {
  data = {}
  data[sib.attr('name')] = sib.html()
  id = sib.closest("tr").attr("data-food")
  console.log(id, data)
  updateFoods(id, data)
}

$('#add-food-button').on('click', function() {
  var foodName = $("#new-food-name-field").val();
  var foodCalories = $("#new-food-calories-field").val();
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
    foods.forEach(function(food){
      $("#foods-dir").append(
        `<tr data-food='${food.id}'  class='food-row'>
          <td>
            <span class='food-name food-display' name='name'>${food.name}</span>
            <input type="text" class="edit" style="display:none"/>
          </td>
          <td>
            <span class='food-calories food-display' name='calories'>${food.calories}</span>
            <input type="text" class="edit" style="display:none"/>
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

getFoods()
