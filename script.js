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
    modal.addEventListener('click', function(event) {
        // console.log(event.target); // überprüfe um welches Element es sich handelt beim click
        closeModal(event); // das click event wird der Funktion übergeben
    });
}


function renderPokedex(index) {
    let pokemon = currentPokemon[index];
    const namePokemon = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    const imagePokemon = pokemon['sprites']['front_default'];
    const heightPokemon = pokemon['height'];
    document.getElementById('modal').innerHTML = `
        <div class="pokedex-container" id="pokedex-container">
            <div class="pokedex-details" id="pokedex-content">
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


function closeModal(event) {
    let modal = document.getElementById('modal');
    let pokedexContainer = document.getElementById('pokedex-container');

    // überprüfe ob auf den Hintergrund geclickt wurde
    if (event.target === modal || event.target === pokedexContainer) { // ist das ziel des clicks dasselbe Element, auf das geclickt wurde
        modal.innerHTML = '';
        modal.style.display = 'none';
    }
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