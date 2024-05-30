import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#load-btn');

let page = 1;
let query = '';

form.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    page = 1;
  const query = input.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    return;
  }

  clearGallery();
  showLoader();

  fetchImages(query, page)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again.',
        });
      }
        renderGallery(data.hits);
        if (data.hits.length === 15) {
            loadMoreBtn.classList.remove('.hidden')
        }
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: 'Error',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

loadMoreBtn.addEventListener('click', onLoadMore);
async function onLoadMore() {
  page += 1;
//   showLoader();

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('hidden');
    //   hideLoader();
      return;
    }

    renderGallery(data.hits);
    if (data.hits.length < 15) {
      loadMoreBtn.classList.add('hidden');
    }
    window.scrollBy({
      top: 720,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Error',
    });
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
