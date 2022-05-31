const key = '563492ad6f917000010000012733b3afebd74beaac52d0a23dc3045a';
const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector('.search-form')
const contentDiv = document.querySelector('.content');
const moreBtn = document.querySelector('.more')
let searchValue;
let searchCount = 2;
let randomCount = 2;

async function fetchData(url) {
    const fetchData = await fetch(url, {
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
            createPhotoDiv(photo);
        })
    }
    toggleMoreBtn()
}

async function loadPhotos() {
    await fetchData('https://api.pexels.com/v1/curated?page=1&per_page=15');

}

async function searchPhoto() {
    clear();
    if (searchValue !== '' || searchValue === undefined) {
        searchValue = searchInput.value;
        // request the photo which matches the search input
        await fetchData(`https://api.pexels.com/v1/search?query=${searchValue}+query&page=1&per_page=15?orientation=square`)
        searchInput.value = '';
    }
}

function createPhotoDiv(photo) {
    let photoDiv = document.createElement('div');
    photoDiv.classList.add('photo-div');
    photoDiv.innerHTML = `
    <img src=${photo.src.large} alt=${photo.alt}></img>
    <div class="photo-desc"><p>${photo.photographer}</p> <a target="_blank" href=${photo.src.original} >Download</a></div>`;
    contentDiv.appendChild(photoDiv);
}


// remove items from content when search for new
function clear() {
    contentDiv.innerHTML = '';
}

async function loadMore() {

    if (searchValue === '' || searchValue === undefined) {
        await fetchData(`https://api.pexels.com/v1/curated?page=${searchCount}&per_page=15`)
            ++randomCount;
    } else {
        await fetchData(`https://api.pexels.com/v1/search?query=${searchValue}+query&page=${searchCount}&per_page=15`);
        ++searchCount;
    }
}



function toggleMoreBtn() {
    if (contentDiv.innerHTML === '') {
        moreBtn.style.display = 'none';
    } else {
        moreBtn.style.display = 'block';
    }
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchPhoto();
});

moreBtn.addEventListener('click', loadMore)

loadPhotos();
toggleMoreBtn()