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
    pokeCard.className = pokeInfo.type;
    info.innerHTML += newInfo;
 

};

const setPokeCard = (pokeInfo) => {
    return `
    
    <div class='details'>
    
        <h1 id='poke-name'>${pokeInfo.name}</h1>
        <p>#${pokeInfo.number >= 10 ? '0'+ pokeInfo.number.toString() : '00'+ pokeInfo.number.toString()}</p>
    </div>
    <div id='card-img'>
        <div id='type-box'>
            <ol class="types">
            ${pokeInfo.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        </div>

        <div id='images-box'>
            <img id="pokebola" src="../images/pokeball2.png" alt="um logo da pokebola">
            <img id="poke-img" src="${pokeInfo.photo}" alt="${pokeInfo.name}">
        </div>

    </div>

    `
}

const setPokeInfo = (pokeInfo) => {

    return `
    <div id='text-box'>
        <h2 class='titulo t1' >Sobre</h2>
        <p><b>Altura:</b> ${pokeInfo.altura}m</p>
        <p><b>Peso:</b> ${pokeInfo.peso}kg</p>
        <p><b>Habilidades:</b> ${pokeInfo.habilidades}</p>
    </div>
    <h3 class='titulo t2'>Status Base</h3>
    <div class='progress-bar'>
        <p><b>Vida:</b> ${pokeInfo.stats[0]}</p>
        <div class="hp-bar" style="--progress: ${pokeInfo.stats[0]}" ></div>
    </div>
    <div class='progress-bar'>
        <p><b>Ataque:</b> ${pokeInfo.stats[1]}</p>
        <div class="atk-bar"  style="--progress: ${pokeInfo.stats[1]}" ></div>
    </div>
    <div class='progress-bar'>
        <p><b>Defesa:</b> ${pokeInfo.stats[2]}</p>
        <div class="def-bar" style="--progress: ${pokeInfo.stats[2]}" ></div>
    </div>
    <div class='progress-bar'>
        <p><b>Ataque Sp:</b> ${pokeInfo.stats[3]}</p>
        <div class="atk-sp-bar" style="--progress: ${pokeInfo.stats[3]}" ></div>
    </div>
    <div class='progress-bar'>
        <p><b>Defesa Sp:</b> ${pokeInfo.stats[4]}</p>
        <div class="def-sp-bar" style="--progress: ${pokeInfo.stats[4]}" ></div>
    </div>

    <div class='progress-bar'>
        <p><b>Total:</b> ${pokeInfo.stats[0] + pokeInfo.stats[1] + pokeInfo.stats[2] + pokeInfo.stats[3] + pokeInfo.stats[4]}</p>
        <div class="total-bar" style="--progress: ${(pokeInfo.stats[0] + pokeInfo.stats[1] + pokeInfo.stats[2] + pokeInfo.stats[3] + pokeInfo.stats[4]) * 2 / 10}" ></div>
    </div>

    `
}

loadPokemonInfo(pokemon);