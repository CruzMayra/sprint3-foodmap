// console.log(data[22]);
$(document).ready(loadPage);

var $filterInput = $('#searh-input');

function loadPage() { // función que centraliza al resto de las funciones
  loadSplashView();
  loadMainView();
  $('#restaurants-container').append(data.map(getRestaurantInHtml));
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

function getRestaurantInHtml(restaurant){ // función para mostrar los restaurantes "más cercanos" en el html

  var nameRestaurant = restaurant.nombre;
  var imagenRestaurant = restaurant.imagen;
  var $nearbyRestaurant = $('<section />');
  var $nameNearbyRestaurant = $('<h5 />');
  var $imagenNearbyRestaurant = $('<img />');

  $nearbyRestaurant.addClass('col-md-3 col-xs-11');
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
  modal.find('.cocinas').text(restaurant.cocinas.join(', '));
  modal.find('.precios').text(restaurant.precios);
})

function filterRestaurants(){
    var searchRestaurant = $filterInput.val().toLowerCase();
    $('#restaurants-container').empty();
    if($filterInput.val().trim().length > 0) {
      $('#restaurants-container').append(data.filter(function(restaurant) {
        var nombreMatches = restaurant.nombre.toLowerCase().indexOf(searchRestaurant) >= 0
        var cocinasMatches = restaurant.cocinas.join(',').toLowerCase().indexOf(searchRestaurant) >= 0
        var calificacionMatches = restaurant.calificacion.toLowerCase().indexOf(searchRestaurant) >= 0
        var zonaMatches = restaurant.zona.toLowerCase().indexOf(searchRestaurant) >= 0
        var preciosMatches = restaurant.precios.toLowerCase().indexOf(searchRestaurant) >= 0
        return nombreMatches || cocinasMatches || calificacionMatches || zonaMatches || preciosMatches
      }).map(getRestaurantInHtml))
      $('#restaurants-container:empty').html('<p class="h1">Lo sentimos, no encontramos coincidencias <i class="fa fa-frown-o" aria-hidden="true"></i></p>');
  }
  else {
    $('#restaurants-container').append(data.map(getRestaurantInHtml));
  }
}
