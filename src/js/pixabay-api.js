// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:

// getImagesByQuery(query).Ця функція повинна приймати один параметр query(пошукове слово, яке є рядком),
//     здійснювати HTTP - запит і повертати значення властивості data з отриманої відповіді.

// https://pixabay.com/api/?key=46534617-f030fa7fdef1b59853604705d&q=yellow+flowers&image_type=photo

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

export const API_KEY = 'api/?key=46534617-f030fa7fdef1b59853604705d';

export function getImagesByQuery(query = '') {
  const editedQuery = query.trim().split(' ').join('+');
  return axios(
    `${API_KEY}&q=${editedQuery}&image_type=photo&orientation=horizontal&safesearch=true`
  );
}
