// console.log(data[22]);
$(document).ready(loadPage);

var $filterInput = $('#searh-input');

function loadPage() { // función que centraliza al resto de las funciones
  loadSplashView();
  loadMainView();
  getRestaurantInformation(data);
  $filterInput.keyup(filterRestaurants)
}

function loadSplashView() { // función para mostrar la vista splash por tres segundos
  setTimeout(function() {
      $(".splash").fadeOut(1500);
  },3000);
}

function loadMainView() { // función que muestra la vista principal pasado la vista splash
  setTimeout(function() {
      $("main").fadeIn(1500);
  },3000);
}

function getRestaurantInformation(data){ // funcion para acceder a la data
  for( var index = 0; index < data.length; index++) {
    var restaurant = getRestaurantInHtml(data[index], index);
    $('#restaurants-container').append(restaurant);
  }
}

function getRestaurantInHtml(restaurant, index){ // función para mostrar los restaurantes "más cercanos" en el html

  var nameRestaurant = restaurant.nombre;
  var imagenRestaurant = restaurant.imagen;
  var $nearbyRestaurant = $('<section />');
  var $nameNearbyRestaurant = $('<h5 />');
  var $imagenNearbyRestaurant = $('<img />');

  $nearbyRestaurant.addClass('col-md-3 col-xs-3');
  $nearbyRestaurant.attr('data-toggle','modal');
  $nearbyRestaurant.attr('data-target', '#modal-restaurant');
  $nearbyRestaurant.attr('data-nombre', nameRestaurant);
  $imagenNearbyRestaurant.addClass('img-responsive');
  $imagenNearbyRestaurant.attr('src', imagenRestaurant);
  $imagenNearbyRestaurant.attr('alt', nameRestaurant + '-restaurant');

  $nameNearbyRestaurant.text(nameRestaurant);
  $nearbyRestaurant.append($nameNearbyRestaurant);
  $nearbyRestaurant.append($imagenNearbyRestaurant);

  return $nearbyRestaurant;
}

$('#modal-restaurant').on('show.bs.modal', function (event) { // función para cambiar el modal según el restaurante al que se le de clic
  var section = $(event.relatedTarget);
  var restaurant = data.find(function(restaurant){
    return restaurant.nombre === section.data('nombre')
  })

  var modal = $(this);
  modal.find('.nombre').text(restaurant.nombre);
  modal.find('.imagen').attr('src', restaurant.imagen);
  modal.find('.direccion').text(restaurant.direccion);
  modal.find('.calificacion').text(restaurant.calificacion);
  modal.find('.cocinas').text(restaurant.cocinas);
  modal.find('.precios').text(restaurant.precios);
})

function filterRestaurants(){
    var searchRestaurant = $filterInput.val().toLowerCase();
    if($filterInput.val().trim().length > 0) {
      var filteredRestaurants = data.filter(function(restaurant) {
        var nombreMatches = restaurant.nombre.toLowerCase().indexOf(searchRestaurant) >= 0
        var cocinasMatches = restaurant.cocinas.join(',').toLowerCase().indexOf(searchRestaurant) >= 0
        var calificacionMatches = restaurant.calificacion.toLowerCase().indexOf(searchRestaurant) >= 0
        var zonaMatches = restaurant.zona.toLowerCase().indexOf(searchRestaurant) >= 0
        var preciosMatches = restaurant.precios.toLowerCase().indexOf(searchRestaurant) >= 0
        return nombreMatches || cocinasMatches
      }
    )
    $('#restaurants-container').empty();
    filteredRestaurants.forEach(function(restaurant,index){
      $('#restaurants-container').append(getRestaurantInHtml(restaurant,index));
      // getRestaurantInformation(data);
    })
  } else {
    $('#restaurants-container').empty();
    $('#restaurants-container').append(data.map(getRestaurantInHtml));
    console.log(filteredRestaurants);
  }
}
