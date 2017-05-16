var $ = require('jquery')
var host = "http://localhost:3000"

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    if ($(this).closest("tr").attr("data-food") !== null){
      deleteFoods($(this).closest("tr").attr("data-food"))
    }else {
      console.log($(this).closest("tr").attr("data-diary-food"))
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

function edit(sib) {
  data = {}
  data[sib.attr('name')] = sib.html()
  id = sib.closest("tr").attr("data-food")
  console.log(id, data)
  updateFoods(id, data)
}

function getFoods(){
  $.getJSON(`${host}/api/v1/foods`, function(foods){
    foods.forEach(function(food){
      $("#foods-dir").append(
        `<tr data-food=${food.id}>
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

getFoods()

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
