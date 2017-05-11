require('./index.css')
require('./foods')
var $ = require('jquery')

var host = "http://localhost:3000"

// function getFood(id){
//   $.getJSON(`${host}/api/v1/foods/${id}.json`, function(msg){
//     console.log(msg)
//     console.log("name:", msg.name)
//     console.log("calories:", msg.calories)
//   })
//   .fail(function(error){
//     console.log(error)
//   })
// }
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
