// У файлі render-functions.js створи екземпляр SimpleLightbox для
// роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

// createGallery(images). Ця функція повинна приймати масив images,
// створювати HTML-розмітку для галереї, додавати її в контейнер галереї
// та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.

// showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати
//  клас для відображення кнопки Load more. Нічого не повертає.

// hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати
// клас для відображення кнопки Load more. Нічого не повертає.

// webformatURL — посилання на маленьке зображення для списку карток у галереї
// largeImageURL — посилання на велике зображення для модального вікна
// tags — рядок з описом зображення. Підійде для атрибута alt
// likes — кількість вподобайок
// views — кількість переглядів
// comments — кількість коментарів
// downloads — кількість завантажень

import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const imagesMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class= "gallery-item"><a href ="${largeImageURL}">
        <img src="${webformatURL}" alt = "${tags}" data-image = "${largeImageURL}"></a>
        <ul class = "item-dscr"><li class="stats"><h3>Likes</h3><p>${likes}</p></li>
        <li class="stats"><h3>Views</h3><p>${views}</p></li>
        <li class="stats"><h3>Comments</h3><p>${comments}</p></li>
        <li class="stats"><h3>Downloads</h3><p>${downloads}</p></li>
        </ul></li>`;
      }
    )
    .join(' ');
  gallery.insertAdjacentHTML('beforeend', imagesMarkup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
