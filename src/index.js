console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breeds = [];

fetch(imgUrl)
    .then(data => data.json())
    .then(json => {
        const ul = document.querySelector('#dog-image-container');
        for (const imgUrl of json.message) {
            ul.innerHTML += `<img src=${imgUrl}>`;
        }
    });


window.addEventListener('load', function () {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    const breedFilter = document.getElementById('breed-dropdown');

    fetch(breedUrl)
        .then(data => data.json())
        .then(json => {
            const ul = document.querySelector('#dog-breeds');
            const liArr = [];
            breeds.push(...Object.keys(json.message));

            const filterChar = breedFilter.value;
            const breedsFiltered = breeds.filter(breed => breed[0] === filterChar);
            ul.innerHTML = '';
            for (const breed of breedsFiltered) {
                const li = document.createElement("li");
                li.innerText = breed;
                ul.appendChild(li);
                liArr.push(li);
            }
            return liArr;
        })
        .then(liElements => {
            for (const liElement of liElements) {
                liElement.addEventListener('click', function (evt) {
                    evt.target.style.color = "blue";
                });
            }
        });

    breedFilter.addEventListener('change', function (evt) {
        const filterChar = evt.target.value;
        const breedsFiltered = breeds.filter(breed => breed[0] === filterChar);
        const ul = document.querySelector('#dog-breeds');
        ul.innerHTML = '';
        for (const breed of breedsFiltered) {
            const li = document.createElement("li");
            li.innerText = breed;
            ul.appendChild(li);
        }
    });
});