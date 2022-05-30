const key = '563492ad6f917000010000012733b3afebd74beaac52d0a23dc3045a';
const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('.search-form')
const contentDiv = document.querySelector('.content');
let searchValue;

async function loadPhotos() {
    const fetchData = await fetch('https://api.pexels.com/v1/curated?page=1&per_page=15', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: key
        }
    });
    const data = await fetchData.json();
    console.log(data);
    data.photos.forEach(photo => {
        createPhotoDiv(photo)
    })
}

function createPhotoDiv(photo) {
    let photoDiv = document.createElement('div');
    photoDiv.classList.add('photo-div');
    photoDiv.innerHTML = `
    <img src=${photo.src.medium} alt=${photo.alt}></img>
    <p>${photo.photographer}</p>`;
    contentDiv.appendChild(photoDiv)
}



loadPhotos();