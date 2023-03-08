const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Obtener los elementos del DOM
const form = document.getElementById("form");
const search = document.getElementById("search");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonType = document.getElementById("pokemon-type");
const pokemonImage = document.getElementById("pokemon-image");

// Función para obtener los datos de un pokemon
async function getPokemonData(nameOrId) {
  const response = await fetch(`${pokeApiUrl}${nameOrId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const pokemon = {
    name: data.name,
    id: data.id,
    type: data.types.map(type => type.type.name),
    imageUrl: data.sprites.other["official-artwork"].front_default
  };
  return pokemon;
}

// Función para actualizar la card del pokemon
async function updatePokemonCard(event) {
  // Evitar el comportamiento predeterminado del formulario
  event.preventDefault();

  try {
    const pokemon = await getPokemonData(search.value.toLowerCase());
    pokemonName.innerText = `Nombre: ${pokemon.name}`;
    pokemonId.innerText = `#${pokemon.id}`;
    pokemonType.innerText = `Tipo: ${pokemon.type.join(", ")}`;
    pokemonImage.src = pokemon.imageUrl;
  } catch (error) {
    console.error(error);
  }
}

// Llamar a updatePokemonCard() cuando la página cargue
updatePokemonCard({ preventDefault: () => { } });

// Escuchar el evento submit del formulario y llamar a updatePokemonCard()
form.addEventListener("submit", updatePokemonCard);