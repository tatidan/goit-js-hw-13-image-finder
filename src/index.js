import './sass/main.scss';
import debounce from 'lodash.debounce';
import galleryCard from './templates/galleryCard.hbs';
import ApiService from './apiService';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import BtnService from './btn-service';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

defaultModules.set(PNotifyMobile, {});

const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('.input'),
  submitBtn: document.querySelector('.submitBtn'),
  response: document.querySelector('.response'),
  gallery: document.querySelector('.gallery'),
  anchor: document.querySelector('.anchor'),
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
    apiService.searchQuery = refs.input.value;
    apiService.resetPage();
    newLoadMoreBtn.hide();
    clearPage();

    apiService
      .fetchGalleryCards(searchQuery)
      .then(cards => {
        if (!cards.length) {
          throw new Error();
        }
        renderGallery(cards);
      })
      .catch(errorHandler);
  }, 500),
);

// refs.submitBtn.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   e.preventDefault();

//   if (!refs.input.value) {
//     refs.gallery.innerHTML = '';
//     return;
//   }

//   const searchQuery = `${refs.input.value}`;
//   apiService.searchQuery = refs.input.value;
//   apiService.resetPage();
//   newLoadMoreBtn.hide();
//   clearPage();

//   apiService
//     .fetchGalleryCards(searchQuery)
//     .then(cards => {
//       if (!cards.length) {
//         throw new Error();
//       }
//       renderGallery(cards);
//     })
//     .catch(errorHandler);
// }

function renderGallery(cards) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryCard(cards));

  newLoadMoreBtn.show();
  newLoadMoreBtn.enable();
  handleButtonClick();
}

function errorHandler() {
  newLoadMoreBtn.hide();
  alert({
    text: 'Bad request. Try again.',
    delay: 500,
  });
  clearPage();
}

function clearPage() {
  refs.gallery.innerHTML = '';
}

const newLoadMoreBtn = new BtnService({
  selector: "[data-action='load-more']",
  text: 'LOAD MORE',
  hidden: true,
});

newLoadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onLoadMore(e) {
  newLoadMoreBtn.disable();
  apiService.incrementPage();
  apiService.fetchGalleryCards().then(renderGallery).catch(errorHandler);
}

//Страница должна автоматически плавно проскроливаться
//после рендера изображений, чтобы перевести пользователя
//на следующие загруженные изображения.Используй метод
//Element.scrollIntoView().

//думаю, что функция пока не работает
function handleButtonClick() {
  refs.anchor.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

document.querySelector('.gallery').onclick = e => {
  console.log(e.currentTarget);
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const largeImg = e.target.dataset.src;

  basicLightbox
    .create(
      `
		<img width="100vw" height="auto" src="${largeImg}">
	`,
    )
    .show();
};

//!!!- нужно убрать скролл pnotify-сообщений

//!!! - к largeImg можно добавить возврат по escape

//Вместо кнопки Load more можно сделать бесконечную загрузку
//при скроле используя Intersection Observer.====== не реализовано
