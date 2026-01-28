// У файлі main.js напиши всю логіку роботи додатка.
// Виклики нотифікацій iziToast, усі перевірки на довжину масиву
// в отриманій відповіді робимо саме в цьому файлі. Імпортуй в
// нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  lightbox,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', searchButtonHandler);

let imagesArray = [];

function searchButtonHandler(e) {
  e.preventDefault();
  const searchQuery = e.target.elements['search-text'].value.trim();
  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }
  clearGallery();
  showLoader();

  getImagesByQuery(searchQuery)
    .then(({ data }) => {
      imagesArray = data.hits;
      if (imagesArray.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      console.log(imagesArray);
      createGallery(imagesArray);
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    })
    .finally(() => hideLoader());
  form.reset();
}
