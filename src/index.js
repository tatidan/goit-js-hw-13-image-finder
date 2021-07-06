//import './sass/main.scss';
console.log('check connection');
//import config from './config.json';

const BASE_URL = 'https://pixabay.com/api/';

const options = {
webformatURL,
largeImageURL,
likes,
views,
comments,
downloads,
  // headers: {
  //   "Content-Type": "application/json",
  // }
};

function fetchPhotos() {
  return fetch(`${BASE_URL}?`).then(res => res.json()).then(console.log);
 }

 function fetchPhotosById(photoId) {
  return fetch(`config.url + / + ${id}`).then(res => res.json()).then(console.log);
 }

// import ApiService from "./apiService";

// const newApiService = new ApiService();
// const newLoadMoreBtn = new BtnService({
//   selector: "[data-action='load-more']",
//   text: "Load More",
//   hidden: true,
// });
// const newShowMoviesBtn = new BtnService({
//   selector: "[data-action='show-movies']",
//   text: "Show Movies",
// });

// const refs = {
//   result: document.querySelector(".result"),
//   errorRef: document.querySelector(".error"),
//   // loadMoreBtn: document.querySelector("#load-more"),
// };

// newLoadMoreBtn.refs.button.addEventListener("click", onLoadMore);
// newShowMoviesBtn.refs.button.addEventListener("click", onShowMovies);