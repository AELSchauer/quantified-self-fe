var $ = require('jquery')

$(document).ready(function(){
  $('table').on('click', '.remove', function(){
    $(this).closest("tr").remove();
  })
})

module.exports = {
  addFood: function(){
    $("table").append(
      `<tr>
        <td>Banana</td>
        <td>35</td>
        <td><button class='remove'>-</button>
        </tr>`
    )
  }
}
