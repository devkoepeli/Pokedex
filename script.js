let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(pokemon) {
    let name = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    let image = pokemon['sprites']['front_default'];
    document.getElementById('pokemon-name').innerHTML = name;
    document.getElementById('pokemon-img-container').innerHTML = `<img class="pokemon-img" src="${image}" alt="Bild von Pokemon">`;
}

document.addEventListener('DOMContentLoaded', loadPokemon);