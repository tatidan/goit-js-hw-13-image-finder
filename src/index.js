import './sass/main.scss';
import debounce from 'lodash.debounce';
import galleryCard from './templates/galleryCard.hbs';
import ApiService from "./apiService";
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import * as basicLightbox from 'basiclightbox'

defaultModules.set(PNotifyMobile, {});

const refs = {
  searchForm: document.querySelector("#search-form"),
  input: document.querySelector(".input"),
  response: document.querySelector(".response"),
  gallery: document.querySelector(".gallery"),
  //loadMoreBtn: document.querySelector("#load-more"),
};

const apiService = new ApiService();

refs.searchForm.addEventListener(
    'input',
  debounce(() => {
    if (!refs.input.value) {
      refs.gallery.innerHTML = '';
      return;
    }   

    const searchQuery = `${refs.input.value}`;
    console.log(searchQuery);


    apiService.searchQuery = refs.input.value;
    console.log(apiService);
    apiService.resetPage();
    clearPage();

    apiService.fetchGalleryCards(searchQuery)
      .then((cards) => {
        if (!cards.length) {
          throw new Error();
         }
        renderGallery(cards);
      }
        ).catch(errorHandler);
  }, 500),
)

//тут лежит массив с объектами - 12шт 1стр

function renderGallery(cards) {  
  refs.gallery.insertAdjacentHTML('beforeend', galleryCard(cards));
}

//с ошибками не работает
function errorHandler() {
  refs.gallery.innerHTML = "что-то пошло не так";
  
  alert({
  text: 'Что-то пошло не так. Введите запрос повторно.'
  });
  clearPage();
}

function clearPage() {
  refs.gallery.innerHTML = '';
}



// const newLoadMoreBtn = new BtnService({
//   selector: "[data-action='load-more']",
//   text: "Load More",
//   hidden: true,
// });
// const newShowMoviesBtn = new BtnService({
//   selector: "[data-action='show-movies']",
//   text: "Show Movies",
// });


// newLoadMoreBtn.refs.button.addEventListener("click", onLoadMore);
// newShowMoviesBtn.refs.button.addEventListener("click", onShowMovies);


//При нажатии на кнопку Load more должна догружаться 
//следующая порция изображений и рендериться вместе 
//с предыдущими.

//Страница должна автоматически плавно проскроливаться 
//после рендера изображений, чтобы перевести пользователя 
//на следующие загруженные изображения.Используй метод 
//Element.scrollIntoView().

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });


//Можно добавить плагин нотификаций, например pnotify, и показывать 
//нотификации на результат HTTP - запросов

//largeImageURL - ссылка на большое изображение.
//Можно добавить функционал отображения большой версии изображения 
//через плагин модального окна, например basicLightbox, при клике 
//на изображение галереи

//const basicLightbox = require('basiclightbox');
// const instance = basicLightbox.create(`
// 	<h1>Dynamic Content</h1>
// 	<p>You can set the content of the lightbox with JS.</p>
// `);
// const instance = basicLightbox.create(
//   document.querySelector('.gallery')
// );

//Вместо кнопки Load more можно сделать бесконечную загрузку 
//при скроле используя Intersection Observer.