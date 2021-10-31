// Variables
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let perPage = 12;
let numberOfPages = 1;
const API_KEY = "563492ad6f91700001000001efd789b14aec4c9db33942e8a8dbf36e";
let searchValue;
const more = document.querySelector(".more");
let currentSearch;
let fetchLink;
// Evant Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

// Functions
function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchAPI(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
						<img src=${photo.src.large}></img>
						<div class="gallery-info">			
								<p>${photo.photographer}</p>
								<a href=${photo.src.original}>Download</a>
						</div>
						`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${numberOfPages}`;

  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=${perPage}&page=${numberOfPages}`;
  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  numberOfPages++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=${perPage}&page=${numberOfPages}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${numberOfPages}`;
  }
  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

curatedPhotos();
