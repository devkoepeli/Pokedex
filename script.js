async function getPokemon() {
    for (let i = 0; i < pokemonNames.length; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
        const response = await fetch(url);
        const responseAsJSON = await response.json();
        pokemonJSON.push(responseAsJSON);
        renderPokemon(i);
    }
}


document.addEventListener('DOMContentLoaded', getPokemon);


function renderPokemon(i) {
    let currentName = pokemonJSON[i]['name'].charAt(0).toUpperCase() + pokemonJSON[i]['name'].slice(1);
    let currentImage = pokemonJSON[i]['sprites']['front_default'];
    let currentType = pokemonJSON[i]['types'][0]['type']['name'];
    document.getElementById('content').innerHTML += pokemonHTML(currentName, currentImage, currentType, i);
    colorElement(i);
}


function colorElement(index) {
    let pokemonCard = document.getElementById(`pokemon${index}`);
    let pokemonType = document.getElementById(`type${index}`).innerHTML;

    for (let i = 0; i < pokemonTypes.length; i++) {
        const type = pokemonTypes[i]['type'];
        const color = pokemonTypes[i]['color'];
        if (pokemonType === type) {
            pokemonCard.style.backgroundColor = color;
            return;
        }
    }
}


function openModal(index) {
    let modal = document.getElementById('modal');
    modal.classList.add('d-block');
    document.body.classList.add('o-hidden'); // disable scroll
    renderPokedex(index);
    modal.addEventListener('click', function(event) {
        // console.log(event.target); // überprüfe um welches Element es sich handelt beim click
        closeModal(event); // das click event wird der Funktion übergeben
    });
}


function renderPokedex(index) {
    const pokemon = pokemonJSON[index];
    const namePokemon = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    const typePokemon = pokemon['types'][0]['type']['name']; // gibt den Typen des angeclickten Pokemons zurück z.B. "fire"
    const imagePokemon = pokemon['sprites']['front_default'];
    const heightPokemon = pokemon['height'];
    const weightPokemon = pokemon['weight'];
    const movePokemon = pokemon['moves'][0]['move']['name'];
    document.getElementById('modal').innerHTML = `
        <div class="pokedex-container" id="pokedex-container">
            <div class="pokedex-details ${typePokemon}" id="pokedex-content">
                <h2 class="pokedex-title">${namePokemon}</h2>
                <span class="pokedex-type">${typePokemon}</span>
                <span class="pokedex-number">#${String(index + 1).padStart(3, '0')}</span>
                <div class="pokedex-img-container">
                    <img class="pokedex-img" src="${imagePokemon}" alt="">
                </div>
                <div class="pokedex-info">
                    <table class="pokedex-info-table">
                        <tr>
                            <th class="pokedex-info-title">About</th>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>${heightPokemon} cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>${weightPokemon} g</td>
                        </tr>
                        <tr>
                            <td>Move</td>
                            <td>${movePokemon}</td>
                        </tr>
                    </table>
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
        modal.classList.remove('d-block');
        document.body.classList.remove('o-hidden');
    }
}


function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < pokemonNames.length; i++) {
        const pokemonName = pokemonNames[i]; // by checking each name in the array we make sure it renders immediately the pokemon
        if (pokemonName.includes(search)) { // if the element at the position i contains searchvalue (true) render the element
            renderPokemon(i); // passing the current i of the loop
        }
    }
}


function pokemonHTML(name, image, type, index) {
    return `
        <div id="pokemon${index}" class="pokemon" onclick="openModal(${index})">
            <h2 id="pokemon-name">${name}</h2>
            <span class="pokemon-element" id="type${index}">${type}</span>
            <div id="pokemon-img-container">
                <img class="pokemon-img" src="${image}" alt="Bild von Pokemon">
            </div>
            <span class="pokemon-number">#${String(index + 1).padStart(3, '0')}</span>
        </div>  
    `;
}