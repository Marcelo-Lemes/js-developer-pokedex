
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

async function createPokemonDetails(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = await pokeDetail.id;
    pokemon.name = await pokeDetail.name;
    pokemon.altura = (pokeDetail.height / 10);
    pokemon.peso = (pokeDetail.weight / 10);
    pokemon.habilidades = pokeDetail.abilities.map((skill) => skill.ability.name)
    pokemon.stats = pokeDetail.stats.map((attr) => attr.base_stat)

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => Promise.resolve(jsonBody))
        .then((pokemon) => createPokemonDetails(pokemon))
}

