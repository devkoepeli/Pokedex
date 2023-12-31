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


function pokedexHTML(index) {
    const pokemon = pokemonJSON[index];
    const namePokemon = pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1);
    const typePokemon = pokemon['types'][0]['type']['name']; // gibt den Typen des angeclickten Pokemons zurück z.B. "fire"
    const imagePokemon = pokemon['sprites']['other']['official-artwork']['front_default'];
    const heightPokemon = pokemon['height'];
    const weightPokemon = pokemon['weight'];
    const movePokemon = pokemon['moves'][0]['move']['name'];

    const statsHP = pokemon['stats'][0]['base_stat']; 
    const statsAttack = pokemon['stats'][1]['base_stat']; 
    const statsDefense = pokemon['stats'][2]['base_stat']; 
    const statsSpeed = pokemon['stats'][5]['base_stat']; 
    return `
        <div class="pokedex-container" id="pokedex-container">
            <div class="pokedex-details ${typePokemon}" id="pokedex-content">
                <h2 class="pokedex-title">${namePokemon}</h2>
                <span class="pokedex-type">${typePokemon}</span>
                <span class="pokedex-number">#${String(index + 1).padStart(3, '0')}</span>
                <div class="arrow-container">
                    <span class="arrow-icon-left">
                        <svg viewBox="0 0 16 16" onclick="switchPokedex(${index}, -1)">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </span>
                    <span class="arrow-icon-right">
                        <svg viewBox="0 0 16 16" onclick="switchPokedex(${index}, +1)">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </span>
                </div>
                <div class="pokedex-img-container">
                    <img class="pokedex-img" src="${imagePokemon}" alt="">
                </div>
                <div class="pokedex-info">
                    <div class="pokedex-info-title-container">   
                        <span id="about-title" class="pokedex-info-title c-black">About</span>
                        <span id="stats-title" class="pokedex-info-title c-grey">Stats</span>
                    </div>
                    <table id="pokedex-about" class="pokedex-about-table">
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
                    <table id="pokedex-stats" class="pokedex-stats-table d-none">
                        <tr>
                            <td>HP</td>
                            <td>${statsHP}</td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td>${statsAttack}</td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td>${statsDefense}</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>${statsSpeed}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
}