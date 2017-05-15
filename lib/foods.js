var $ = require('jquery')
var host = "http://localhost:3000"

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    $(this).closest("tr").remove();
  })
})

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
