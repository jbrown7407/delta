console.log("app.js connected")

// const baseURL = `http://www.omdbapi.com/?`
// const apiKey = `apikey=53aa2cd6` //backticks
// // ff05b1a8 MINE
// const queryType = `t=`
// let titleQuery = 'fight club'
// let queryURL = baseURL + apiKey + '&' + queryType

           
// $(".like button").on("click", function() {
//   var $count = $(this).parent().find('.count');
//   $count.html($count.html() * 1 + 1);
//   if ($count > 5) {('.count').css("color","green") }
  
// }); 



// const getMovie = () => {
//   $.ajax({
//     url: queryURL + titleQuery
//   }).then((movieData) => {
//     console.log(movieData)
//     $('.container').html(`
//       <h2> ${movieData.Title} </h2>
//       <h3> ${movieData.Year} </h3>
//       <h4> ${movieData.Rated} <h4>
//       <h5> ${movieData.Genre} <h5>
//       <p>  ${movieData.Plot} </p>
//       `)
//       const $img = $('<img>').attr('src', movieData.Poster).attr('alt', movieData.Title)
//       $('.container').append($img)
//   }, (error) => {
//     console.error(error)
//   })
// }




// $(()=> {
//   getMovie()

//   $('form').on('submit', (event) => {
//     event.preventDefault()
//     console.log('clicky')
//     titleQuery = $('input[type="text"]').val()
//     getMovie()
//   })

//   console.log(queryURL)
// })

// $('.btn-counter').on('click', function(event, count) {
//   event.preventDefault();
  
//   var $this = $(this),
//       count = $this.attr('data-count'),
//       active = $this.hasClass('active'),
//       multiple = $this.hasClass('multiple-count');
  
 
// });