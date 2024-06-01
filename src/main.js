import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');
const loadBtn = document.querySelector('.load-btn');

let page = 1;
let totalPage = 1;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = form.elements.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please fill out this field',
      position: 'topRight',
    });
    return;
  }
  if (loadBtn.classList.contains('is-active')) {
    loadBtn.classList.remove('is-active');
  }
  gallery.innerHTML = '';
  loader.classList.add('is-active');
  page = 1;

  try {
    const { data } = await fetchImages(query, page);
    if (!data.total) {
      loader.classList.remove('is-active');
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      form.reset();
      return;
    }

    gallery.innerHTML = `${renderGallery(data.hits)}`;
    loader.classList.remove('is-active');
    loadBtn.classList.add('is-active');

    if (data.totalHits < 15) {
      loadBtn.classList.remove('is-active');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Error fetching images. Please try again later.'
    });
  }
});

loadBtn.addEventListener('click', async () => {
  loaderMore.classList.add('is-active-more');
  loadBtn.classList.remove('is-active');

  try {
    const { data } = await fetchImages(query, ++page);
    gallery.insertAdjacentHTML('beforeend', `${renderGallery(data.hits)}`);

    loaderMore.classList.remove('is-active-more');
    loadBtn.classList.add('is-active');
    lightbox.refresh();

    window.scrollBy({
      top: 720,
      behavior: 'smooth',
    });

    totalPage = Math.ceil(data.totalHits / 15);
    if (totalPage === page) {
      loadBtn.classList.remove('is-active');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Error fetching images. Please try again later.',
    });
  }
});

const lightbox = new SimpleLightbox('.gallery a', {
  navText: ['&#5176;', '&#5171;'],
  captionsData: 'alt',
  captionDelay: 250,
});
