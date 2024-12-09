const api_key = "fgx2M2Ul1LeOZ8OEtCGFNBzIewaQJc9kVOReI35f";
const apod = document.querySelector('.apod');
const h3 = document.createElement('h3');
const p = document.createElement('p');
const asteroids = document.querySelector('.asteroids');
const dateSearch = document.querySelector('.dateSearch');
const div = document.createElement('div');
const imgSearch = document.querySelector('.imgSearch');
const searchImage = document.querySelector('.searchImage');

// api request to take the Astronomy Picture of the day
fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
.then(function(response){
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(function(jsonData){
  const img = document.createElement('img');
  h3.innerHTML = jsonData.title;
  img.src = jsonData.url;
  p.innerHTML = jsonData.explanation;

  apod.appendChild(img);
  apod.appendChild(h3);
  apod.appendChild(p);
});


dateSearch.onclick = function() {
  const searchDate = document.querySelector('.searchDate');
  let date = searchDate.value;
  if(date){
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${api_key}`)
    .then(function(response){
      return response.json();
    })
    .then(function(jsonData){
      const asteroidsInfo = jsonData.near_earth_objects[`${date}`][0];
      appraochDate = asteroidsInfo.close_approach_data[0].close_approach_date;
      let distance = asteroidsInfo.estimated_diameter.kilometers.estimated_diameter_min;
      div.innerHTML = `Asteroid named "${asteroidsInfo.name}" was closest to earth on ${appraochDate} by ${distance} km`;
      asteroids.appendChild(div);
    })
  }
}


imgSearch.onclick = function(){
  let searchValue = document.querySelector('.searchValue');
  searchValue = 'saturn';
  if(searchValue){
    fetch(`https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`)
    .then(function(response){
      return response.json();
    })
    .then(function(jsonData){
      const imgPath = jsonData.collection.items[0].links[0].href;
      searchImage.src = imgPath;
    })
  }
}
