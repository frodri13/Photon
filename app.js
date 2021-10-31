// Variables
let searchValue;
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const numberOfPics = 10;
const url = `https://api.pexels.com/v1/curated?per_page=${numberOfPics}`;
const API_KEY = "563492ad6f91700001000001efd789b14aec4c9db33942e8a8dbf36e";

// Evant Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

// Functions
function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchAPI(url) {
  const dataFetch = await (url,
  {
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
    galleryImg.innerHTML = ` <img src=${photo.src.large}></img>
		<p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchAPI(url);
  generatePictures(data);
}

async function searchPhotos(query) {
  const urlSearch = `https://api.pexels.com/v1/search?query=${query}+query&per_page=${numberOfPics}`;

  const data = await fetchAPI(urlSearch);
  generatePictures(data);
}

curatedPhotos();
