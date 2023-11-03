let pokemonNames = [
    'pikachu', 'charmander', 'ditto', 'bulbasaur', 'charmeleon',
    'squirtle', 'jigglypuff', 'snorlax', 'eevee', 'mewtwo',
    'magikarp', 'gengar', 'lapras', 'machop', 'onix',
    'vaporeon', 'psyduck', 'meowth', 'abra', 'geodude'
];


let currentPokemon = [];


async function getPokemon() {
    for (let i = 0; i < pokemonNames.length; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
        const response = await fetch(url);
        const responseAsJSON = await response.json();
        currentPokemon.push(responseAsJSON);
        renderPokemon(currentPokemon, i);
    }
}


document.addEventListener('DOMContentLoaded', getPokemon);


function renderPokemon(currentPokemon, i) {
    let name = currentPokemon[i]['name'].charAt(0).toUpperCase() + currentPokemon[i]['name'].slice(1);
    let image = currentPokemon[i]['sprites']['front_default'];
    document.getElementById('content').innerHTML += pokemonHTML(name, image, i);
}


function openModal(index) {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    renderPokedex(index);
    modal.onclick = closeModal;
}


function renderPokedex(index) {
    let pokemon = currentPokemon[index];
    const namePokemon = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    const imagePokemon = pokemon['sprites']['front_default'];
    const heightPokemon = pokemon['height'];
    document.getElementById('modal').innerHTML = `
        <div class="pokedex-container">
            <div class="pokedex-details">
                <h2 class="pokedex-title">${namePokemon}</h2>
                <div class="pokedex-img-container">
                    <img class="pokedex-img" src="${imagePokemon}" alt="">
                </div>
                <div class="pokedex-info">
                    <span class="pokedex-info-title">About</span>
                    <div class="pokedex-info-row">
                        <span>Height</span>
                        <span>${heightPokemon}</span>
                    </div>
                    <span class="pokedex-info-title">Breeding</span>
                </div>
            </div>
        </div>
    `;
}


function closeModal() {
    let modal = document.getElementById('modal');
    modal.innerHTML = '';
    modal.style.display = 'none';
}


function pokemonHTML(name, image, index) {
    return `
        <div id="pokemon" onclick="openModal(${index})">
            <h2 id="pokemon-name">${name}</h2>
            <div id="pokemon-img-container">
                <img class="pokemon-img" src="${image}" alt="Bild von Pokemon">
            </div>
        </div>  
    `;
}