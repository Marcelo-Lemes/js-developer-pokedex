const params = new URLSearchParams(window.location.search);
const pokemon = params.get('pokemon');
const pokeCard = document.getElementById('poke-card');
const info = document.getElementById('poke-info');

function somaTotal(array) {
    for (let index = 0; index < array.length; index++) {
        let total = total + array[index];    
    }
}

async function loadPokemonInfo(pokemon) {
    const pokeInfo = await pokeApi.getPokemon(pokemon)
        .then((data) => data);

    const newCard = setPokeCard(pokeInfo);
    const newInfo = setPokeInfo(pokeInfo);
 
    pokeCard.innerHTML += newCard;
    info.innerHTML += newInfo;
 

};

const setPokeCard = (pokeInfo) => {
    return `
    <div>
        <h1>${pokeInfo.name}</h1>
        <p>${pokeInfo.number}</p>
    </div>
    <div>
        <ol class="types">
            ${pokeInfo.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokeInfo.photo}" alt="${pokeInfo.name}">
    </div>
    `
}

const setPokeInfo = (pokeInfo) => {
    return `
    <h2>Sobre</h2>
    <p>Altura: ${pokeInfo.altura}</p>
    <p>Peso: ${pokeInfo.peso}</p>
    <p>Habilidades: ${pokeInfo.habilidades}</p>
    <h2>Status Base</h2>
    <p>Vida: ${pokeInfo.stats[0]}</p>
    <p>Ataque: ${pokeInfo.stats[1]}</p>
    <p>Defesa: ${pokeInfo.stats[2]}</p>
    <p>Ataque Especial: ${pokeInfo.stats[3]}</p>
    <p>Defesa Especial: ${pokeInfo.stats[4]}</p>
    <p>Total: ${pokeInfo.stats[0] + pokeInfo.stats[1] + pokeInfo.stats[2] + pokeInfo.stats[3] + pokeInfo.stats[4]}</p>
    `
}

loadPokemonInfo(pokemon);