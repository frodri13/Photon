const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
let searchValue;
const url = `https://api.pexels.com/v1/curated?per_page=10`;
const API_KEY = "563492ad6f91700001000001efd789b14aec4c9db33942e8a8dbf36e";

async function curatedPhotos() {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const data = await dataFetch.json();
  console.log(data.photos);
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = ` <img src=${photo.src.large}></img>
		<p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
