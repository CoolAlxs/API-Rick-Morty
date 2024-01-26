const txtCharacter = document.getElementById('find-Character');
const containerCards = document.getElementById('cards-Container');
const pageSelect = document.getElementById('page');
let data = [];
const itemsPerPage = 20;
let currentPage = 1;

const getApiUrl = (page) => {
    if (txtCharacter.value.trim() !== "") {
        return `https://rickandmortyapi.com/api/character?name=${txtCharacter.value}&page=${page}`;
    }
    return `https://rickandmortyapi.com/api/character?page=${page}`;
}

const Api = async (page) => {
    const url = getApiUrl(page);
    const response = await fetch(url);
    const result = await response.json();
    data = result.results;
    return result.results;
}

const createCards = (character) => {
    const cards = document.createElement('div');
    cards.classList.add('card-Character');
    cards.id = "character-" + character.id;

    const imgCards = document.createElement('img');
    imgCards.src = character.image;
    imgCards.alt = character.name;

    const containerDescription = document.createElement('div');
    containerDescription.classList.add('description-Card');     
    
    containerDescription.innerHTML =`
    <h3>${character.name}</h3>
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Gender:</strong> ${character.gender}</p>
    <p><strong>Specie:</strong> ${character.species}</p>
    `

    

    cards.appendChild(imgCards);
    cards.appendChild(containerDescription);

    containerCards.appendChild(cards);

}

const generateCharacters = async () => {
    const result = await Api(currentPage);
    containerCards.innerHTML = "";
    result.map(character => createCards(character));
    addCardsEvent();
}

const getCharacterByName = async () => {
    currentPage = 1;
    await generateCharacters();
}

const changePage = async () => {
    currentPage = parseInt(pageSelect.value);
    await generateCharacters();
}

function showDetail(characterid) {
    const id = characterid.toString().replace('character-', '');
    const character = data.find(mc => mc.id == id);
    const infoContainer = document.getElementById('info-Container');
    infoContainer.innerHTML = "";

    const titleName = document.getElementById('title-name');
    titleName.innerText = character.name;

    const detail = document.createElement("div");
    detail.classList.add("detail");    
    detail.innerHTML = `

        <img src=${character.image} class="rounded">
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Specie:</strong> ${character.species}</p>
        <p><strong>Origin:</strong> ${character.origin.name}</p>
        <p><strong>Location:</strong> ${character.location.name}</p>
        <p><strong>Número de episodios:</strong> ${character.episode.length}</p>
    `;
    infoContainer.appendChild(detail);
    infoContainer.classList.remove("hidden");   

    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
}


function addCardsEvent() {
    const cards = document.querySelectorAll('div[id^="character-"]');
    cards.forEach(card => {
        card.addEventListener("click", function () {
            showDetail(card.id);
        });
    });
}

window.addEventListener('DOMContentLoaded', generateCharacters);
txtCharacter.addEventListener('keyup', getCharacterByName);
pageSelect.addEventListener('change', changePage);