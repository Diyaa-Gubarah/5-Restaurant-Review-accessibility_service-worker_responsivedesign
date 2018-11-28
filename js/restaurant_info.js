let restaurant;
var newMap;

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initMap();
});

/**
 * Initialize leaflet map
 */
initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.newMap = L.map('map', {
        center: [restaurant.latlng.lat, restaurant.latlng.lng],
        zoom: 16,
        scrollWheelZoom: false
      });
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
        mapboxToken: 'pk.eyJ1IjoiZGl5YWEtZ3ViYXJhaCIsImEiOiJjam05MDU0b3M0OTlhM3BxdTd0aXd2YTl5In0.NZcIEzNqQfHfgTUkou8eMQ',
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(newMap);
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
}

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;
  name.setAttribute('aria-label',`name of current restaurant is ${restaurant.name} restaurant`);
  name.tabIndex = 0

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;
  address.setAttribute('aria-label',`${restaurant.name} address is ${restaurant.address}`);
  address.tabIndex = 0

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = `image of ${restaurant.name} restaurant`;
  image.tabIndex = 0;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;
  cuisine.setAttribute('aria-label',`cuisine type of ${restaurant.name} restaurant is ${restaurant.cuisine_type}`);
  cuisine.tabIndex = 0;
  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  hours.setAttribute('aria-label',`table of ${self.restaurant.name} restaurant work days and hours`);
  hours.tabIndex = 0;

  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.tabIndex = 0;
    day.innerHTML = key;
    day.setAttribute('aria-label',`current day is ${day.innerHTML}`);
    row.appendChild(day);

    const time = document.createElement('td');
    time.tabIndex = 0;
    time.innerHTML = operatingHours[key];
    time.setAttribute('aria-label',`in ${day.innerHTML} ${self.restaurant.name} restaurant open from ${time.innerHTML}`);
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  container.setAttribute('aria-label',`section represent reviews about ${self.restaurant.name} restaurant`);
  container.tabIndex = 0

  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
  title.setAttribute('aria-label',` the title of reviews section is ${title.innerHTML}`);
  title.tabIndex = 0
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    noReviews.tabIndex = 0
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  ul.tabIndex = 0
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  ul.setAttribute('aria-label',`list represent ${ul.childElementCount} reviews about ${self.restaurant.name}`);
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  li.tabIndex = 0
  li.setAttribute('aria-label',`someone reivews`);

  const name = document.createElement('p');
  name.innerHTML = review.name;
  name.tabIndex = 0
  name.setAttribute('aria-label',`this is ${review.name} reviews`);
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  date.tabIndex = 0
  date.setAttribute('aria-label',`on ${review.date} ${review.name} write`);
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  rating.tabIndex = 0
  rating.setAttribute('aria-label',`I will give this restaurant ${review.rating} stars from 5`);
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  comments.tabIndex = 0
  comments.setAttribute('aria-label',`because ${review.comments}`);
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const nav = document.getElementById('breadcrumb');
  const div = nav.firstElementChild
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.setAttribute('aria-current','page')
  a.setAttribute('href',`./restaurant.html?id=${restaurant.id}`)
  a.innerHTML = restaurant.name;
  a.tabIndex = 0
  li.appendChild(a);

  div.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
