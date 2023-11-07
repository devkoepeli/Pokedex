async function getPokemon() {
    const cardsPerPage = 20;
    for (let i = 0; i < pokemonNames.length; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
        const response = await fetch(url);
        const responseAsJSON = await response.json();
        pokemonJSON.push(responseAsJSON);

        if(i < cardsPerPage) { // sicherstellen, dass nur die ersten 20 pokemon geladen werden.
            renderPokemon(i);
        }
    }
}


document.addEventListener('DOMContentLoaded', async function() {
    await getPokemon();
    initAmountOfPokemons(); // nachdem rendern die Anzahl an gerenderten Pokemons speichern für searchPokemon()
    initSearchInput(); // warten bis getPokemon abgeschlossen ist, bevor die Suche begonnen werden kann
});


function renderPokemon(i) {
    let currentName = pokemonJSON[i]['name'].charAt(0).toUpperCase() + pokemonJSON[i]['name'].slice(1);
    let currentImage = pokemonJSON[i]['sprites']['other']['official-artwork']['front_default'];
    let currentType = pokemonJSON[i]['types'][0]['type']['name'];

    document.getElementById('content').innerHTML += pokemonHTML(currentName, currentImage, currentType, i);
    colorElement(i);
}


function colorElement(index) {
    let pokemonCard = document.getElementById(`pokemon${index}`);
    let pokemonType = document.getElementById(`type${index}`).innerHTML;

    for (let i = 0; i < pokemonTypes.length; i++) {
        const type = pokemonTypes[i]['type'];
        if (pokemonType === type) {
            pokemonCard.classList.add(`${type}`);
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
    document.getElementById('modal').innerHTML = pokedexHTML(index);
    initChangePokedexInfo();
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


function initSearchInput() {
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input', searchPokemon); // event listener wird aktiviert und bleibt aktiv
}


function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < amountOfRenderedPokemons; i++) { 
        // amountOfRenderedPokemons, damit genau die aktuell Anzahl an gerenderten Pokemons und nicht immer die Gesamtzahl (60) genommen wird
        const pokemonName = pokemonNames[i]; // by checking each name in the array we make sure it renders immediately the pokemon
        if (pokemonName.includes(search)) { // if the element at the position i contains searchvalue (true) render the element
            renderPokemon(i); // passing the current i of the loop
        }
    }
}


function initAmountOfPokemons() {
    amountOfRenderedPokemons = document.querySelectorAll('.pokemon').length;
}


function loadMore(pageIndex) {
    const cardIncrease = 20;
    const cardLimit = 60;
    const pageCount = cardLimit / cardIncrease; // wie viele Seiten haben wir maximal? --> 3
    currentPage += pageIndex; // wir sind bei Beginn bei der Seite 1 und mit jedem Click wird die 1 addiert für jede weitere "seite"

    disableButton(pageCount, currentPage);

    const startRange = (currentPage - 1) * cardIncrease; // onclick: 1 * 20
    const endRange = currentPage === pageCount ? cardLimit : currentPage * cardIncrease; // prüfen ob currentPage gleich pageCount ist, endrange auf 60 begrenzen, weil max 60 Karten

    for (let i = startRange; i < endRange; i++) {
        renderPokemon(i);
    }
    initAmountOfPokemons() // nachdem mehr gerendert wurde, muss die Anzahl an Pokemons erneut gespeichert werden
}


function disableButton(pageCount, currentPage) {
    if (pageCount === currentPage) {
        document.getElementById('button').disabled = true;
        document.getElementById('button').classList.add('d-none');
    }
}


function switchPokedex(index, n) {
    index += n;
    navigatePokedex(index);
}


function navigatePokedex(index) {
    if (index >= amountOfRenderedPokemons) {
        index = 0;
    }
    if (index < 0) { // das letzte pokedex des arrays anzeigen
        index = amountOfRenderedPokemons - 1;
    }
    renderPokedex(index);
}


function changePokedexInfo(element) {
    const pokedexStats = document.getElementById(`pokedex-stats`);
    const pokedexAbout = document.getElementById(`pokedex-about`);
    const statsTitle = document.getElementById('stats-title');
    const aboutTitle =  document.getElementById('about-title');

    if (element === statsTitle && statsTitle.classList.contains('c-grey')) {
        pokedexStats.classList.remove('d-none');
        pokedexAbout.classList.add('d-none');
        statsTitle.classList.add('c-black');
        statsTitle.classList.remove('c-grey');
        aboutTitle.classList.remove('c-black');
        aboutTitle.classList.add('c-grey');
    } else if (element === aboutTitle && aboutTitle.classList.contains('c-grey')) {
        pokedexStats.classList.add('d-none');
        pokedexAbout.classList.remove('d-none');
        statsTitle.classList.remove('c-black');
        statsTitle.classList.add('c-grey');
        aboutTitle.classList.add('c-black');
        aboutTitle.classList.remove('c-grey');
    }
}


function initChangePokedexInfo() {
    document.getElementById('stats-title').addEventListener('click', function() {
        changePokedexInfo(this);
    });

    document.getElementById('about-title').addEventListener('click', function() {
        changePokedexInfo(this);
    });
}