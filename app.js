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
    if (data.error) {
        console.log(data.error);
    } else {
        data.photos.forEach(photo => {
            createPhotoDiv(photo)
        })
    }
}

function createPhotoDiv(photo) {
    let photoDiv = document.createElement('div');
    photoDiv.classList.add('photo-div');
    photoDiv.innerHTML = `
    <img src=${photo.src.medium} alt=${photo.alt}></img>
    <p>${photo.photographer}</p>`;
    contentDiv.appendChild(photoDiv)
}

async function searchPhoto() {
    let query = searchInput.value;
    // request the photo which matches the search input
    if (query !== '') {
        let fetchData = await fetch(`https://api.pexels.com/v1/search?query=${query}+query&page=1&per_page=15?orientation=portrait`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: key
            }
        });
        let data = await fetchData.json();
        if (data.error) {
            console.log(data.error);
        } else {
            data.photos.forEach(photo => {
                createPhotoDiv(photo)
            })
        }
        searchInput.value = '';
    }
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchPhoto();
});

// loadPhotos();