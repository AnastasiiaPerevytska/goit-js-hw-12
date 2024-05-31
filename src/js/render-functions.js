export const renderGallery = image => {
  const markup = image
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
        return `<a class="gallery-item" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        <div class="info">
           <p class="info-item"><span>Likes:</span> ${likes}</p>
           <p class="info-item"><span>Views:</span> ${views}</p>
           <p class="info-item"><span>Comments:</span> ${comments}</p>
           <p class="info-item"><span>Downloads:</span> ${downloads}</p>
         </div>
       </a>`;
      }
    )
    .join('');
  return markup;
};