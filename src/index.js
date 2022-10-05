
// async function ArregloPokemones( callback ) {
//   let pokemones;

//   await getPokemones().then(resp => { pokemones = resp.results })
//   pokemones.forEach(async element => {
//     await getPokemonDetails(element.url).then(resp => {
//       element.id = resp.id;
//       element.type = resp.types;
//       element.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`
//     });
//     callback(element);
//   });
//   return pokemones;

// }

async function getPokemones() {
  return axios.get('https://pokeapi.co/api/v2/pokemon/')
}

async function getPokemonDetails(url) {
  return axios.get(url)
}

function ArregloPokemones() {
  getPokemones().then((resp) => {
    let _arrayPromesas = resp.data.results.map((element) => getPokemonDetails(element.url))
    Promise.all(_arrayPromesas).then((response) => cargarData(response))
  })
}


async function cargarData(pokemones) {
  // console.log(pokemones.length)
  // console.log(pokemones[0].data.sprites.other['official-artwork'].front_default)
  // console.log(pokemones[0].data.id)
  // console.log(pokemones[0].data.name)
  // console.log(pokemones[0].data.types[0].type['name'])

  for (let index1 = 0; index1 < pokemones.length; index1++){
    var getParentElement = document.getElementById('pokemones')

    const createPokeCard = document.createElement('div')
    createPokeCard.classList.add('card', 'col-md-3', 'p-2')

    const imgPokeCard = document.createElement('img');
    imgPokeCard.src = pokemones[index1].data.sprites.other['official-artwork'].front_default
    createPokeCard.appendChild(imgPokeCard)

    const bodyPokeCard = document.createElement('div')
    bodyPokeCard.classList.add('card-body')
    createPokeCard.appendChild(bodyPokeCard)

    const numIdPokeCard = document.createElement('h5')
    numIdPokeCard.classList.add('card-title')
    numIdPokeCard.textContent = `n.° ${pokemones[index1].data.id}`;
    bodyPokeCard.appendChild(numIdPokeCard)

    const namePokeCard = document.createElement('h4')
    namePokeCard.classList.add('card-title')
    namePokeCard.textContent = capitalizarPrimeraLetra(pokemones[index1].data.name);
    bodyPokeCard.appendChild(namePokeCard)

    for (let index2 = 0; index2 < pokemones[index1].data.types.length; index2++) {
      let typePokeCard = document.createElement('p')
      let type = pokemones[index1].data.types[index2].type['name']
      typePokeCard.classList.add('badge', 'm-1', type)
      typePokeCard.textContent = pokemones[index1].data.types[index2].type['name'];
      bodyPokeCard.appendChild(typePokeCard)
    }
    getParentElement.appendChild(createPokeCard)
  }

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}

// consultarPokemones().then( resp => cargarData(resp))
ArregloPokemones( );