const AUTH_KEY = '563492ad6f9170000100000112ea80bd3b5646778fec532774e48b71'; //ADD THE AUTH KEY
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const nature = document.querySelector('.nature');
const oceans = document.querySelector('.oceans');
const animals = document.querySelector('.animals');
const people = document.querySelector('.people');
const more = document.querySelector('.more');

let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener('click', loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

nature.addEventListener('click', loadNature);
oceans.addEventListener('click', loadOceans);
animals.addEventListener('click', loadAnimals);
people.addEventListener('click', loadPeople);

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: AUTH_KEY,
    },
  });
  const data = await dataFetch.json();
  return data;
}

// FUNCTIONALITY
function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original} download>Download</a>
            </div>
            <img src=${photo.src.large}></img>
            `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function loadMore(query) {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function loadNature() {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=nature&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
async function loadOceans() {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=oceans&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
async function loadAnimals() {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=animals&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
async function loadPeople() {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=people&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

// INITIAL RENDER
curatedPhotos();
