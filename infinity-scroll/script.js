const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
const count = 10;
const apiKey = 'NWWD8Nj6woB7CQWm9Lk4KCTAsm_XkFkD_oJcMm-T9Qk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  console.log('image loaded');
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}

// helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos and add to dom
function displayPhotos() {
  totalImages += photosArray.length;

  photosArray.forEach(photo => {
    // create <a> to link to unsplash
    const item = document.createElement('a');

    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // create <img> for photo
    const img = document.createElement('img');

    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // put <img> inside <a> then put both inside image-container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    console.log('load more');
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
