// У файлі main.js напиши всю логіку роботи додатка.
// Виклики нотифікацій iziToast, усі перевірки на довжину масиву
// в отриманій відповіді робимо саме в цьому файлі. Імпортуй в
// нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  loadMoreBtn,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', searchButtonHandler);
loadMoreBtn.addEventListener('click', loadMoreButtonHandler);

let searchQuery = '';

let pageNumber = 1;

async function searchButtonHandler(e) {
  e.preventDefault();
  searchQuery = e.target.elements['search-text'].value.trim();
  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }
  hideLoadMoreButton();
  clearGallery();
  pageNumber = 1;
  showLoader();
  try {
    const { data } = await getImagesByQuery(searchQuery, pageNumber);
    const imagesArray = data.hits;
    if (imagesArray.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(imagesArray);
    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (pageNumber >= totalPages) {
      iziToast.info({
        title: 'Limit reached',
        message: "We are sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
  form.reset();
}

async function loadMoreButtonHandler(e) {
  pageNumber += 1;
  showLoader();
  try {
    const { data } = await getImagesByQuery(searchQuery, pageNumber);
    const imagesArray = data.hits;
    createGallery(imagesArray);
    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (pageNumber >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Limit reached',
        message: "We are sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}
